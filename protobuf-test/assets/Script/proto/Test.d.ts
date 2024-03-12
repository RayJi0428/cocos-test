declare global {
 // DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace Protocol. */
export namespace Protocol {

    /** Namespace Game. */
    namespace Game {

        /** Properties of a MESSAGE_TEST_T. */
        interface IMESSAGE_TEST_T {

            /** MESSAGE_TEST_T value */
            value?: (number|null);
        }

        /** Represents a MESSAGE_TEST_T. */
        class MESSAGE_TEST_T implements IMESSAGE_TEST_T {

            /**
             * Constructs a new MESSAGE_TEST_T.
             * @param [properties] Properties to set
             */
            constructor(properties?: Protocol.Game.IMESSAGE_TEST_T);

            /** MESSAGE_TEST_T value. */
            public value: number;

            /**
             * Creates a new MESSAGE_TEST_T instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MESSAGE_TEST_T instance
             */
            public static create(properties?: Protocol.Game.IMESSAGE_TEST_T): Protocol.Game.MESSAGE_TEST_T;

            /**
             * Encodes the specified MESSAGE_TEST_T message. Does not implicitly {@link Protocol.Game.MESSAGE_TEST_T.verify|verify} messages.
             * @param message MESSAGE_TEST_T message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Protocol.Game.IMESSAGE_TEST_T, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MESSAGE_TEST_T message, length delimited. Does not implicitly {@link Protocol.Game.MESSAGE_TEST_T.verify|verify} messages.
             * @param message MESSAGE_TEST_T message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Protocol.Game.IMESSAGE_TEST_T, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MESSAGE_TEST_T message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MESSAGE_TEST_T
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Protocol.Game.MESSAGE_TEST_T;

            /**
             * Decodes a MESSAGE_TEST_T message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MESSAGE_TEST_T
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Protocol.Game.MESSAGE_TEST_T;

            /**
             * Verifies a MESSAGE_TEST_T message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MESSAGE_TEST_T message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MESSAGE_TEST_T
             */
            public static fromObject(object: { [k: string]: any }): Protocol.Game.MESSAGE_TEST_T;

            /**
             * Creates a plain object from a MESSAGE_TEST_T message. Also converts values to other types if specified.
             * @param message MESSAGE_TEST_T
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Protocol.Game.MESSAGE_TEST_T, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MESSAGE_TEST_T to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
 
} 
 export {}