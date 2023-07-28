import { _decorator, Component, Node, resources, sp, SpriteAtlas, SpriteFrame } from 'cc';
import Resource from './Resource';
import { RoadMapBase } from './resources/RoadMap/Script/Base/RoadMapBase';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    private danShuang: RoadMapBase;
    private daXiao: RoadMapBase;

    protected onLoad(): void {

        this.danShuang = this.node.getChildByName("DanShuangMap").getComponent(RoadMapBase);
        this.daXiao = this.node.getChildByName("DaXiaoMap").getComponent(RoadMapBase);

        resources.loadDir('./RoadMap', null, (err: any, asset: any) => {
            for (const item of asset) {
                let itemName: string = item.name;
                switch (true) {
                    // Spine 動畫
                    case item instanceof sp.SkeletonData:
                        Resource.spine.set(itemName, item);
                        break;
                    // 靜態圖
                    case item instanceof SpriteFrame:
                        Resource.spriteFrame.set(itemName, item);
                        break;
                    // 圖集
                    case item instanceof SpriteAtlas:
                        itemName = itemName.split('.')[0];
                        const spriteFrames = item.getSpriteFrames();
                        Resource.spriteAtlas.set(itemName, spriteFrames);
                        break;
                }
            }
            console.log("resource ok")
            // this.test();
        });
    }

    start() {
        console.log("start");
    }

    private trendsDanShuang: number[] = [];
    private trendsDaXiao: number[] = [];

    public addDanShung(evt: TouchEvent, value: string): void {
        this.trendsDanShuang.push(parseInt(value));
        this.danShuang.setTrends(this.trendsDanShuang);
    }

    public addDaXiao(evt: TouchEvent, value: string): void {
        this.trendsDaXiao.push(parseInt(value));
        this.daXiao.setTrends(this.trendsDaXiao);
    }

    update(deltaTime: number) {

    }
}


