import bleno from 'bleno';

bleno.on('stateChange', function(state) {
  console.log('on stateChange: ' + state);

  try {
    if (state === 'poweredOn') {
      bleno.startAdvertising('MyRPI-Simulator', ['1803']);
      console.log('startAdvertising');
    } else {
      bleno.stopAdvertising();
      console.log('stopAdvertising');
    }
  } catch (error) {
    console.log(error);
  }
});