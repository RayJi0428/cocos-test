import { _decorator, Asset, assetManager, AssetManager, CCInteger, Color, Component, instantiate, Label, Node, Prefab, Sprite, Vec2 } from 'cc';
import { RoadBase } from './RoadBase';
const { ccclass, property } = _decorator;

@ccclass('RoadMapBase')
export class RoadMapBase extends Component {

    @property({ type: CCInteger, tooltip: "所有欄數" })
    public columnCount: number = 0;

    @property({ type: CCInteger, tooltip: "所有列數" })
    public rowCount: number = 0;

    @property({ type: Prefab, tooltip: "路子" })
    private prefab: Prefab = null;

    @property({ tooltip: "是否印map資料" })
    private printMap: boolean = false;

    /**右邊保留空白欄數 */
    private blankColCount: number = 1;

    private roads: RoadBase[] = [];

    /**路子型態定義表 */
    private roadStyleMap: Map<number, RoadStyle> = new Map();

    onLoad(): void {
        let roadsNode: Node = this.node.getChildByPath('Container/roads');
        roadsNode.children.forEach((node: Node, index: number) => {
            let road: Node = instantiate(this.prefab);//生成各遊戲Prefab
            this.roads.push(road.getComponent(RoadBase));
            node.getChildByName('container').addChild(road);
        }, this);
    }

    /**
     * 註冊路子
     * @param value 路子值
     * @param style 路子表現定義
     */
    protected registerRoad(value: number, style: RoadStyle): void {
        this.roadStyleMap.set(value, style);
    }

    /**
     * 
     */
    start(): void {
        //呼叫子類別,註冊路子定義
        this.childStart();
    }

    update(deltaTime: number) {

    }

    /**
     * 
     * @param trends 
     */
    public setTrends(trends: number[]): void {
        //一維轉二維(新一筆往右排,排滿才整個向左一欄)
        let trends2D: RoadVO[][] = this.trendsTo2D(trends);
        if (this.printMap) {
            this.printMapConsole(trends2D);
        }

        //從右邊像左取最大長度(最右邊1欄保留空白欄)
        let drawColumn: number = this.columnCount - this.blankColCount;
        let slice2D: RoadVO[][] = trends2D.slice(-drawColumn);

        //依序render
        this.drawMap(slice2D);
    }

    /**
     * 
     * @param map 
     */
    private printMapConsole(map: RoadVO[][]): void {
        let log: string = '';
        let hasValue: boolean = false;
        let r: number = 0;
        while (true) {
            hasValue = false;
            for (let c: number = 0; c < map.length; ++c) {
                let vo: RoadVO = map[c][r];
                if (vo != null) {
                    log += (vo.linePt.length > 0) ? `${vo.color}*|` : `${vo.color}_|`;
                    hasValue = true;
                }
                else {
                    log += `__|`;
                }
            }

            r += 1;
            if (!hasValue || r >= this.rowCount) {
                break;
            }
            log += '\n';
        }
        console.log(log);
    }

    /**
     * 一維路單轉二維
     * @param trends 
     * @returns 
     */
    private trendsTo2D(trends: number[]): RoadVO[][] {
        let map: RoadVO[][] = [];
        let colorColumn: number = 0;//目前真正變色的column數(轉彎不計算)
        let nextCol: number = 0;//目前正在畫的欄數
        let nextRow: number = 0;//目前正在畫的列數
        let maxRow: number = this.rowCount - 1;
        let turnRight: boolean = false;//是否往右走
        let preVO: RoadVO = null;
        let preStyle: RoadStyle = null;
        let nextStyle: RoadStyle = null;
        let lastLineVO: RoadVO = null;//畫線線段最後一顆(往前追朔起點)
        let lastColor: number = -1;

        //先從頭去掉非block類型的資料
        while (trends.length > 0 && this.roadStyleMap.get(trends[0]).display != RoadDisplay.BLOCK) {
            trends.shift();
        }

        for (let ti: number = 0; ti < trends.length; ++ti) {
            let nextColor: number = trends[ti];
            let isLast: boolean = ti == trends.length - 1;//debug下斷點用
            if (isLast) {
                console
            }
            nextStyle = this.roadStyleMap.get(nextColor);
            preStyle = preVO && this.roadStyleMap.get(preVO.color);

            //第一顆(lastColor必須排除和局類型)
            if (ti == 0) {
                map[colorColumn] = [];
                lastColor = nextColor;
            }

            //換欄 = 新的是BLOCK型 && 與先前顏色不同
            let changeColumn: boolean = nextStyle.display == RoadDisplay.BLOCK && (lastColor != nextColor);

            //換列 = 同色 or 其一為PASS型
            let changeRow: boolean =
                preVO == null ||//第一顆
                (lastColor == nextColor) ||//顏色接顏色
                (lastColor != nextColor && nextStyle.display == RoadDisplay.PASS) ||//顏色接PASS
                (preStyle && preStyle.display == RoadDisplay.PASS && lastColor == nextColor);//PASS接顏色
            //換欄(新增一欄&長度歸零)------------------------------------------------------------------------
            if (changeColumn) {
                lastColor = nextColor;

                //顏色變換時,如果已經有存了畫線vo,往前遞迴標記畫線
                if (lastLineVO != null) {
                    this.markLine(lastLineVO);
                    lastLineVO = null;
                }

                colorColumn++;
                //建立新欄
                if (!map[colorColumn]) {
                    map[colorColumn] = [];
                }
                let newColumnVO: RoadVO = new RoadVO(colorColumn, 0, nextColor);
                preVO = map[colorColumn][0] = newColumnVO;

                nextRow = 1;
                nextCol = colorColumn;
                maxRow = this.rowCount - 1;
                turnRight = false;
            }
            //換列------------------------------------------------------------------------
            else if (changeRow) {
                //還沒向右:當下判斷是否需要向右,已經向右:繼續向右直到換色
                if (!turnRight) {
                    //到達邊界
                    if (nextRow > maxRow) {
                        turnRight = true;
                        nextRow = maxRow;
                    }
                    //目標點已存在資料
                    else if (map[nextCol] != null && map[nextCol][nextRow] != null) {
                        turnRight = true;
                        maxRow = nextRow - 1;//向右時,要重新調整列數上限
                        nextRow = maxRow;
                    }
                }

                //向右邏輯(已經向右:繼續向右直到換色)
                if (turnRight) {
                    //已經是第一列的向右,需要同步調整colorColumn
                    if (maxRow == 0) {
                        colorColumn++;
                    }
                    //換色距離過遠,要同步調整colorColumn,讓發生換色時能出現在畫面內
                    else if (nextCol - colorColumn >= (this.columnCount - this.blankColCount)) {
                        colorColumn++;
                    }
                    nextCol++;
                }

                //建立新欄
                if (!map[nextCol]) {
                    map[nextCol] = [];
                }
                //不能超過目前設定列上限
                nextRow = Math.min(nextRow, maxRow);
                let newRowVO: RoadVO = new RoadVO(nextCol, nextRow, nextColor);
                map[nextCol][nextRow] = newRowVO;
                nextRow++;

                //是否可與上一顆串接(同色 or 其一為PASS)
                let isConnect: boolean =
                    (preVO && newRowVO.color == preVO.color) ||
                    (preStyle && (preStyle.display == RoadDisplay.PASS || nextStyle.display == RoadDisplay.PASS));
                if (isConnect) {
                    newRowVO.preVO = preVO;
                    preVO.nextVO = newRowVO;
                }
                preVO = newRowVO;
                //轉右表示畫線,更新畫線最後一顆,準備追朔用
                if (turnRight) {
                    lastLineVO = newRowVO;
                }
            }
            //同格------------------------------------------------------------------------
            else {
                preVO.markCount++;
            }
        }

        //最後一次可能沒有變換顏色,所以要再檢查畫線vo,往前遞迴標記畫線
        if (lastLineVO != null) {
            this.markLine(lastLineVO);
            lastLineVO = null;
        }

        return map;
    }

    /**
     * 標記畫線資料
     * @param vo 
     * @returns 
     */
    private markLine(vo: RoadVO): void {
        if (vo == null) {
            return;
        }

        let pre: RoadVO = vo.preVO;
        let next: RoadVO = vo.nextVO;

        //與上一顆連接
        if (pre) {
            if (pre.row == vo.row) {
                vo.linePt.push(new Vec2(-1, 0));
            }
            else {
                vo.linePt.push(new Vec2(0, 1));
            }
        }
        //與下一顆連接
        if (next) {
            if (vo.row == next.row) {
                vo.linePt.push(new Vec2(1, 0));
            }
            else {
                vo.linePt.push(new Vec2(0, -1));
            }
        }
        this.markLine(vo.preVO);
    }

    /**
     * 繪製所有路子
     * @param slice2D 
     */
    private drawMap(slice2D: RoadVO[][]): void {
        let len: number = this.roads.length;
        //每一張都要跑
        for (let i: number = 0; i < len; ++i) {
            let road: RoadBase = this.roads[i];
            let col: number = Math.floor(i / this.columnCount);
            let row: number = i % this.columnCount;
            let vo: RoadVO = slice2D[col] && slice2D[col][row];
            if (vo != null) {
                let style: RoadStyle = this.roadStyleMap.get(vo.color);
                road.draw(vo, style);
            }
            else {
                //空值
                road.draw(null, null);
            }
        }
    }

    //override-------------------------------------------------
    protected childStart(): void {
        //override
    }
}

export class RoadVO {

    public col: number = -1;
    public row: number = -1;

    /**相連上一顆 */
    public preVO: RoadVO = null;
    /**相連下一顆 */
    public nextVO: RoadVO = null;

    /**顏色辨識(判斷是否換欄) */
    public color: number = -1;

    public linePt: Vec2[] = [];

    /**同格數量標記 */
    public markCount: number = 0;

    constructor(col: number, row: number, color: number) {
        this.col = col;
        this.row = row;
        this.color = color;
    }
}


export enum RoadDisplay {
    /**佔格、換欄 */
    BLOCK = 0,
    /**穿過、不換欄 */
    PASS = 1,
    /**不佔格、標記方式 */
    MARK = 2
}

export class RoadStyle {
    /**路子繪製類型 */
    public display: RoadDisplay;
    /**畫線顏色 */
    public lineColorHex: string;

    /**
     * 
     * @param display 路子繪製類型
     * @param lineColorHex 畫線顏色
     */
    public constructor(display: RoadDisplay, lineColorHex: string) {
        this.display = display;
        this.lineColorHex = lineColorHex;
    }
}


