import { _decorator, Component, Graphics, Node, UITransform, Vec2 } from 'cc';
import { RoadStyle, RoadVO } from './RoadMapBase';
const { ccclass, property } = _decorator;


@ccclass('RoadBase')
export class RoadBase extends Component {

    start() {

    }

    update(deltaTime: number) {

    }


    /**子類別實作繪制路子 */
    public draw(vo: RoadVO, style: RoadStyle): void {
        this.drawImage(vo, style);
        this.drawLine(vo, style);
    }

    /**畫線 */
    private drawLine(vo: RoadVO, style: RoadStyle): void {
        let g: Graphics = this.node.getChildByName("Line").getComponent(Graphics);
        g.clear();
        let transform: UITransform = this.node.getComponent(UITransform);
        if (vo) {
            vo.linePt.forEach((pt: Vec2) => {
                g.strokeColor.fromHEX(style.lineColorHex);
                let len: number = pt.x != 0 ? Math.ceil(transform.width * .5) : Math.ceil(transform.height * .5);
                g.lineWidth = 3;
                g.moveTo(0, 0);
                if (pt.x != 0) {
                    g.lineTo(len * pt.x, 0);
                }
                else {
                    g.lineTo(0, len * pt.y);
                }
                g.close();
                g.stroke();
                g.fill();
            }, this);
        }
    }

    /**子類別實作 */
    protected drawImage(vo: RoadVO, style: RoadStyle): void {
        //override
    }
}


