import bleno from 'bleno';

bleno.on('stateChange', function(state) {
  console.log('on stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('MyRPI-Simulator', ['1803']);
  } else {
    bleno.stopAdvertising();
  }
});