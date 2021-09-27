'use strict';

const log = require('./util/logUtil.js');
const util = require('./util/utils.js');

/**
 * callWithRetriesAsyc.
 * return function call result if succeed, otherwise throw back error
 * from last attempt
 *
 * @param {} context, context object contains parameters of callFunction
 * @param function callFunction, callFunction to be retried
 * @param {} retry configuration object, MAX_RETRIES, MAX_WAIT_INTERVAL
 *  MAX_RETRIES : max number of retry attemps, wait exponentialWaitTime before next attempt
 *  if that exponentialWaitTime is not greater than MAX_WAIT_INTERVAL
 *  MAX_WAIT_INTERVAL :  define max wait time for each retry attemp
 */
module.exports.callWithRetriesAsyc = async (
  context,
  callFunction,
  retryConfig,
  checkShouldRetry
) => {
  log.trace(context);
  log.trace(callFunction);
  log.trace(retryConfig);
  let result;
  let retry = true;
  let retries = 0;

  let returnError;

  do {
    let exponentialWaitTime = util.getWaitTimeExp(retries);
    let waitTime =
      exponentialWaitTime < retryConfig.MAX_WAIT_INTERVAL
        ? exponentialWaitTime
        : retryConfig.MAX_WAIT_INTERVAL;
    log.trace(`waitTime: ${waitTime}`);

    await util.sleep(waitTime);

    try {
      result = await callFunction(context);
      retry = false;
      returnError = null;
    } catch (error) {
      console.dir(error);
      log.error(`Caught error while ${retries + 1} call: ${error}`);
      log.error(
        `Caught error while ${retries + 1} call, error message: ${
          error.message
        }`
      );
      returnError = error;
      retry = checkShouldRetry(error);
      console.log(`${retries + 1} time , retry flag: ${retry}`);
    }
  } while (retry && retries++ < retryConfig.MAX_RETRIES);

  if (returnError) {
    throw returnError;
  }

  return result;
};
