const wraper3 = require('./wraper3.js');

let ntestV;
add test;
addtest(async () => {
  // obj[testV] = 't';
  try {
    console.time('test');
    await wraper3.test('kname');
    console.timeEnd('test');
    console.log('print in the end.');

    setTimeout(() => {
      wraper3.test();
    }, 1000);
  } catch (error) {
    console.log('print error in the end.');
    console.log(error);
    console.log(typeof error);
  } finally {
    console.log('print in test finally');
  }
})();
var test;
