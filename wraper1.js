const errorSource = require('./errorSource.js');

module.exports.test = async (name) => {
  console.log(`print name: ${name} in wrap1.`);
  let re = errorSource.test(name);
  console.log('print promise from errorSource');
  console.dir(re);
  // throw new Error('before await in wrap1');
  let r = await re;
  console.log(`r: ${r}`);
  return r;
  // try{
  // await errorSource.test(name);
  // }catch(error){
  //   console.log(`handle error in wraper1: ${error}`);
  // }
};
