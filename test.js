const wraper3 = require('./wraper3.js');

(async () =>{
  try{
    console.time('test');
await wraper3.test('kname');
    console.timeEnd('test');
    console.log('print in the end.');
  }catch(error){
    console.log('print error in the end.');
    console.log(error);
    console.log(typeof error);
  }finally{
    console.log('print in test finally');
  }
})();
