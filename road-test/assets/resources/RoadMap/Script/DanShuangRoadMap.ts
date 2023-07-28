import { _decorator, Component, Graphics, Node, Sprite, UITransform, Vec2 } from 'cc';
import { RoadMapBase, RoadStyle, RoadType } from './Base/RoadMapBase';
const { ccclass, property } = _decorator;

@ccclass('DanShuangRoadMap')
export class DanShuangRoadMap extends RoadMapBase {

    /**雙 */
    private SHUANG: number = 0;
    /**單 */
    private DAN: number = 1;

    protected childStart(): void {
        this.registerRoad(this.SHUANG, new RoadStyle(RoadType.BLOCK, '#0000FF'));
        this.registerRoad(this.DAN, new RoadStyle(RoadType.BLOCK, '#FF0000'));
    }
}


