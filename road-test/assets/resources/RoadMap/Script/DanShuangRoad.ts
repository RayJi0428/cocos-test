import { _decorator, Component, Graphics, Node, Sprite, UITransform, Vec2 } from 'cc';
import { RoadBase } from './Base/RoadBase';
import { RoadStyle, RoadVO } from './Base/RoadMapBase';
import Resource from '../../../Resource';


const { ccclass, property } = _decorator;

@ccclass('DanShuangRoad')
export class DanShuangRoad extends RoadBase {

    update(deltaTime: number) {

    }

    protected drawImage(vo: RoadVO, style: RoadStyle): void {
        let sp: Sprite = this.node.getChildByName("Sprite").getComponent(Sprite);
        if (vo) {
            sp.spriteFrame = Resource.spriteFrame.get(`table_danshuang_${vo.color}`);
        }
        else {
            sp.spriteFrame = null;
        }
    }
}


