/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(window || global).Protocol = (function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Protocol = (function() {
    
        /**
         * Namespace Protocol.
         * @exports Protocol
         * @namespace
         */
        var Protocol = $root.Protocol || {};
    
        Protocol.Game = (function() {
    
            /**
             * Namespace Game.
             * @memberof Protocol
             * @namespace
             */
            var Game = Protocol.Game || {};
    
            Game.MESSAGE_TEST_T = (function() {
    
                /**
                 * Properties of a MESSAGE_TEST_T.
                 * @memberof Protocol.Game
                 * @interface IMESSAGE_TEST_T
                 * @property {number|null} [value] MESSAGE_TEST_T value
                 */
    
                /**
                 * Constructs a new MESSAGE_TEST_T.
                 * @memberof Protocol.Game
                 * @classdesc Represents a MESSAGE_TEST_T.
                 * @implements IMESSAGE_TEST_T
                 * @constructor
                 * @param {Protocol.Game.IMESSAGE_TEST_T=} [properties] Properties to set
                 */
                function MESSAGE_TEST_T(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * MESSAGE_TEST_T value.
                 * @member {number} value
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @instance
                 */
                MESSAGE_TEST_T.prototype.value = 0;
    
                /**
                 * Creates a new MESSAGE_TEST_T instance using the specified properties.
                 * @function create
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @static
                 * @param {Protocol.Game.IMESSAGE_TEST_T=} [properties] Properties to set
                 * @returns {Protocol.Game.MESSAGE_TEST_T} MESSAGE_TEST_T instance
                 */
                MESSAGE_TEST_T.create = function create(properties) {
                    return new MESSAGE_TEST_T(properties);
                };
    
                /**
                 * Encodes the specified MESSAGE_TEST_T message. Does not implicitly {@link Protocol.Game.MESSAGE_TEST_T.verify|verify} messages.
                 * @function encode
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @static
                 * @param {Protocol.Game.IMESSAGE_TEST_T} message MESSAGE_TEST_T message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MESSAGE_TEST_T.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified MESSAGE_TEST_T message, length delimited. Does not implicitly {@link Protocol.Game.MESSAGE_TEST_T.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @static
                 * @param {Protocol.Game.IMESSAGE_TEST_T} message MESSAGE_TEST_T message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MESSAGE_TEST_T.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a MESSAGE_TEST_T message from the specified reader or buffer.
                 * @function decode
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Protocol.Game.MESSAGE_TEST_T} MESSAGE_TEST_T
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MESSAGE_TEST_T.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Protocol.Game.MESSAGE_TEST_T();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.value = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a MESSAGE_TEST_T message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Protocol.Game.MESSAGE_TEST_T} MESSAGE_TEST_T
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MESSAGE_TEST_T.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a MESSAGE_TEST_T message.
                 * @function verify
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                MESSAGE_TEST_T.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!$util.isInteger(message.value))
                            return "value: integer expected";
                    return null;
                };
    
                /**
                 * Creates a MESSAGE_TEST_T message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Protocol.Game.MESSAGE_TEST_T} MESSAGE_TEST_T
                 */
                MESSAGE_TEST_T.fromObject = function fromObject(object) {
                    if (object instanceof $root.Protocol.Game.MESSAGE_TEST_T)
                        return object;
                    var message = new $root.Protocol.Game.MESSAGE_TEST_T();
                    if (object.value != null)
                        message.value = object.value | 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a MESSAGE_TEST_T message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @static
                 * @param {Protocol.Game.MESSAGE_TEST_T} message MESSAGE_TEST_T
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                MESSAGE_TEST_T.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.value = 0;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = message.value;
                    return object;
                };
    
                /**
                 * Converts this MESSAGE_TEST_T to JSON.
                 * @function toJSON
                 * @memberof Protocol.Game.MESSAGE_TEST_T
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                MESSAGE_TEST_T.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return MESSAGE_TEST_T;
            })();
    
            return Game;
        })();
    
        return Protocol;
    })();

    return $root;
})(protobuf).Protocol;
