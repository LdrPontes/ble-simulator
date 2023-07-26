import bleno from 'bleno';

bleno.on('stateChange', function(state) {
  console.log('on stateChange: ' + state);

  try {
    if (state === 'poweredOn') {
      var name = 'MyRPI-Simulator';
      var serviceUuids = ['fffffffffffffffffffffffffffffff0']
      
      bleno.startAdvertising(name, serviceUuids, function(err) {
        if (err) {
          console.log(err);
        }
      });
      console.log('startAdvertising');
    } else {
      bleno.stopAdvertising();
      console.log('stopAdvertising');
    }
  } catch (error) {
    console.log(error);
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');

    bleno.setServices([
      new bleno.PrimaryService({
        uuid: 'fffffffffffffffffffffffffffffff0',
        characteristics: [
          new bleno.Characteristic({
            value: null,
            uuid: 'fffffffffffffffffffffffffffffff1',
            properties: ['read', 'write'],
            onReadRequest: function(offset, callback) {
              console.log('onReadRequest');
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              console.log('onWriteRequest: ' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
            }
          })
        ]
      })
    ]);
  }
});