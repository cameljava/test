const wrap1 = require('./wraper1.js');

module.exports.test = async (name) => {
  console.log(`print name: ${name} in wrap2.`);
  try {
    await wrap1.test(name);
  } catch (e) {
    throw e;
  }
};
