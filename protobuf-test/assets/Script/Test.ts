import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {
    start() {

        let encode_msg: Protocol.Game.MESSAGE_TEST_T = Protocol.Game.MESSAGE_TEST_T.create();
        encode_msg.value = 123;

        //encode
        let writer: protobuf.Writer = Protocol.Game.MESSAGE_TEST_T.encode(encode_msg);
        let bytes: Uint8Array = writer.finish();

        //decode
        let decode_msg: Protocol.Game.MESSAGE_TEST_T = Protocol.Game.MESSAGE_TEST_T.decode(bytes);
        console.log(`value = ${decode_msg.value}`);
    }

    update(deltaTime: number) {
    }
}


