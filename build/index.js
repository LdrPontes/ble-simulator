"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bleno_1 = __importDefault(require("bleno"));
bleno_1.default.on('stateChange', function (state) {
    console.log('on stateChange: ' + state);
    try {
        if (state === 'poweredOn') {
            var name = 'MyRPI-Simulator';
            var serviceUuids = ['fffffffffffffffffffffffffffffff0'];
            bleno_1.default.startAdvertising(name, serviceUuids, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            console.log('startAdvertising');
        }
        else {
            bleno_1.default.stopAdvertising();
            console.log('stopAdvertising');
        }
    }
    catch (error) {
        console.log(error);
    }
});
bleno_1.default.on('advertisingStart', function (err) {
    if (!err) {
        console.log('advertising...');
        bleno_1.default.setServices([
            new bleno_1.default.PrimaryService({
                uuid: 'fffffffffffffffffffffffffffffff0',
                characteristics: [
                    new bleno_1.default.Characteristic({
                        value: null,
                        uuid: 'fffffffffffffffffffffffffffffff1',
                        properties: ['read', 'write'],
                        onReadRequest: function (offset, callback) {
                            console.log('onReadRequest');
                        },
                        onWriteRequest: function (data, offset, withoutResponse, callback) {
                            console.log('onWriteRequest: ' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
                        }
                    })
                ]
            })
        ]);
    }
});
