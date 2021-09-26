const wrap2 = require('./wraper2.js');

var test;

module.exports.test = async (name) => {
  console.log(`print name: ${name} in wrap3.`);
  // try{
  await wrap2.test(name);

  // }catch(e){
  //   throw e;
  // }
};
