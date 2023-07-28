import { _decorator, Component, Graphics, Label, Node, Sprite, UITransform, Vec2 } from 'cc';
import { RoadBase } from './Base/RoadBase';
import { RoadDisplay, RoadStyle, RoadVO } from './Base/RoadMapBase';
import Resource from '../../../Resource';
const { ccclass, property } = _decorator;

@ccclass('DaXiaoRoad')
export class DaXiaoRoad extends RoadBase {

    private sp: Sprite;
    private label: Label;

    start() {
        this.sp = this.node.getChildByName("Sprite").getComponent(Sprite);
        this.label = this.node.getChildByName("Label").getComponent(Label);
    }

    update(deltaTime: number) {

    }

    protected drawImage(vo: RoadVO, style: RoadStyle): void {
        if (vo) {
            if (style.display == RoadDisplay.PASS) {
                this.sp.spriteFrame = Resource.spriteFrame.get(`table_daxiao_1_0`);
                this.label.string = ``;
            }
            //有計數
            else if (vo.markCount > 0) {
                this.sp.spriteFrame = Resource.spriteFrame.get(`table_daxiao_${vo.color}_0`);
                this.label.string = `${vo.markCount}`;
            }
            //無計數
            else {
                this.sp.spriteFrame = Resource.spriteFrame.get(`table_daxiao_${vo.color}`);
                this.label.string = '';
            }
        }
        else {
            this.sp.spriteFrame = null;
            this.label.string = '';
        }
    }
}


