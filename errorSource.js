const axios = require('axios').default;


module.exports.test = (name)=>{
  console.log(name);
  return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
    // reject(new Error('kevins error'));
  }, 3000);
});
    // await new Promise(resolve => setTimeout(resolve, 2000));
  // return 'testError';
  // throw 'noP';
  // return Promise.reject('noP');
  // throw await Promise.reject('noP');
  
   // console.log( setTimeout((data)=>{console.log(data);
   //  return data;
  // // throw 'no no again';
  // }, 2000, 'testValue to print')
   // );
  // try {
    // const response = await axios.get('/user?ID=12345');
    // console.log(response);
  // } catch (error) {
    // console.error(error);
    // console.error(typeof error);
    // console.log(error.isAxiosError);
    // throw error;
  // }
};
