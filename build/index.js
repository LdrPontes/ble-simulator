"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bleno_1 = __importDefault(require("bleno"));
bleno_1.default.on('stateChange', function (state) {
    console.log('on stateChange: ' + state);
    if (state === 'poweredOn') {
        bleno_1.default.startAdvertising('MyRPI-Simulator', ['1803']);
    }
    else {
        bleno_1.default.stopAdvertising();
    }
});
