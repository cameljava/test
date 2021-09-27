const axios = require('axios').default;

module.exports.test = (name) => {
  // const url = `http://localhost?user=${name}`;
  const url = `https://dev.api.cochlear.com/bfs/v1/patient?clinicId=224624512098440`;

  return new Promise((resolve, reject) => {
    console.log(name);
    setTimeout(async () => {
      try {
        console.log(`query with url: ${url}`);
        let googleResponse = await axios.get(url);
        console.log(`print in errorSource, response: ${googleResponse}`);
        console.dir(googleResponse.data);
        resolve(googleResponse.data);
      } catch (error) {
        console.log(`print in errorSource, caught error: ${error}`);
        reject(error);
      }
    }, 3000);
  });
};
