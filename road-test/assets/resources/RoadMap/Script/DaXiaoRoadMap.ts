import { _decorator, Component, Graphics, Node, Sprite, UITransform, Vec2 } from 'cc';
import { RoadMapBase, RoadStyle, RoadDisplay } from './Base/RoadMapBase';
const { ccclass, property } = _decorator;

@ccclass('DaXiaoRoadMap')
export class DaXiaoRoadMap extends RoadMapBase {

    /**和 */
    private HE: number = 0;
    /**小 */
    private XIAO: number = 1;
    /**大 */
    private DA: number = 2;

    protected childStart(): void {
        this.registerRoad(this.HE, new RoadStyle(RoadDisplay.MARK, '#000000'));
        this.registerRoad(this.XIAO, new RoadStyle(RoadDisplay.BLOCK, '#0000FF'));
        this.registerRoad(this.DA, new RoadStyle(RoadDisplay.BLOCK, '#FF0000'));
    }
}


