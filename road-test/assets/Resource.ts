import { SpriteFrame, sp } from 'cc';

export default class Resource {
    public static spriteFrame: Map<string, SpriteFrame> = new Map();
    public static spriteAtlas: Map<string, SpriteFrame[]> = new Map();
    public static spine: Map<string, sp.SkeletonData> = new Map();
}
