"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bleno_1 = __importDefault(require("bleno"));
var BlenoPrimaryService = bleno_1.default.PrimaryService;
var BlenoCharacteristic = bleno_1.default.Characteristic;
bleno_1.default.on('stateChange', function (state) {
    console.log('on -> stateChange: ' + state);
    if (state === 'poweredOn') {
        bleno_1.default.startAdvertising('echo', ['ec00']);
    }
    else {
        bleno_1.default.stopAdvertising();
    }
});
var value = new Buffer(0);
var updateValueCallback = null;
bleno_1.default.on('advertisingStart', function (error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
    if (!error) {
        bleno_1.default.setServices([
            new BlenoPrimaryService({
                uuid: 'ec0e',
                characteristics: [
                    new BlenoCharacteristic({
                        uuid: 'ec0e',
                        properties: ['read', 'write', 'notify'],
                        value: null,
                        onReadRequest: function (offset, callback) {
                            console.log('EchoCharacteristic - onReadRequest: value = ' + offset);
                            callback(bleno_1.default.Characteristic.RESULT_SUCCESS, value);
                        },
                        onWriteRequest: function (data, offset, withoutResponse, callback) {
                            value = data;
                            console.log('onWriteRequest: ' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
                            if (updateValueCallback) {
                                console.log('EchoCharacteristic - onWriteRequest: notifying');
                                updateValueCallback(value);
                            }
                            callback(bleno_1.default.Characteristic.RESULT_SUCCESS);
                        },
                        onSubscribe: function (maxValueSize, value) {
                            console.log('EchoCharacteristic - onSubscribe');
                            updateValueCallback = value;
                        },
                        onUnsubscribe: function () {
                            console.log('EchoCharacteristic - onUnsubscribe');
                            updateValueCallback = null;
                        }
                    })
                ]
            })
        ]);
    }
});
