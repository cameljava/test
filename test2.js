const errorSource = require('./errorSource.js');
const retryService = require('./retryService.js');
const _ = require('lodash');

let shouldRetry = (error) => {
  let shouldRetry = true;
  const shouldNotRetryStatusArray = ['400', '403', '404', '401'];
  console.log(error);
  if (
    error.isAxiosError &&
    error.response &&
    _.includes(shouldNotRetryStatusArray, _.trim(error.response.status))
  ) {
    shouldRetry = false;
  }
  console.log('check shouldRetry');
  // console.log(
  //   _.includes(shouldNotRetryStatusArray, _.trim(error.response.status))
  // );
  return shouldRetry;
};

(async () => {
  try {
    console.time('test2 time');
    let result = await retryService.callWithRetriesAsyc(
      'ktest',
      errorSource.test,
      {MAX_WAIT_INTERVAL: 2000, MAX_RETRIES: 4},
      shouldRetry
    );
    // let result = await errorSource.test('ktest');
    console.timeEnd('test2 time');
    console.log(`result: ${result}`);
    console.log(JSON.stringify(result));
  } catch (error) {
    console.log(`error: ${error}`);
    console.log('*************');
    console.log(error);
    // console.log(error.response.status);
    // console.log(error.toJSON());
  }
})();
