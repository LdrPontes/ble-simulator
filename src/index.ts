import bleno from 'bleno';

var BlenoPrimaryService = bleno.PrimaryService;
var BlenoCharacteristic = bleno.Characteristic;

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('echo', ['ec00']);
  } else {
    bleno.stopAdvertising();
  }
});

var value = new Buffer(0);
var updateValueCallback: any = null;

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: 'ec0e',
        characteristics: [
          new BlenoCharacteristic({
            uuid: 'ec0e',
            properties: ['read', 'write', 'notify'],
            value: null,
            onReadRequest: function(offset, callback) {
              console.log('EchoCharacteristic - onReadRequest: value = ' +offset);
              callback(bleno.Characteristic.RESULT_SUCCESS, value);
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              value = data;

              console.log('onWriteRequest: ' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);

              if (updateValueCallback) {
                console.log('EchoCharacteristic - onWriteRequest: notifying');

                updateValueCallback(value);
              }

              callback(bleno.Characteristic.RESULT_SUCCESS);
            },
            onSubscribe: function(maxValueSize, value) {
              console.log('EchoCharacteristic - onSubscribe');

              updateValueCallback = value;
            },
            onUnsubscribe: function() {
              console.log('EchoCharacteristic - onUnsubscribe');

              updateValueCallback = null;
            }
          })
        ]
      })
    ]);
  }
});