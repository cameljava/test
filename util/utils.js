'use strict';

const assert = require('assert').strict;
const _ = require('lodash');
const ErrorEvent = require('../model/error/ErrorEvent');
const log = require('./logUtil');

module.exports.checkSessionType = (sessionType) => {
  let invalid = true;
  if (
    _.isNil(sessionType) ||
    _.trim(sessionType).length === 0 ||
    _.includes(['routed', 'relayed'], _.trim(sessionType))
  ) {
    invalid = false;
  }
  return invalid;
};

module.exports.getTokenValue = (authorization) => {
  const authorizationValues = _.split(authorization, ' ');
  if (authorizationValues.length === 2) {
    return authorizationValues[1].trim();
  } else {
    return '';
  }
};

module.exports.checkNbf = (nbf) => {
  // return true if current time pass nbf
  return Date.now() >= 1000 * nbf;
};

module.exports.addProxyForAxios = (params, callConfig) => {
  const url = new URL(params.proxyUrl);
  if (params.needProxy) {
    callConfig.proxy = {
      protocal: _.split(url.protocol, ':')[0],
      host: url.hostname,
      port: url.port
    };
  }
  return callConfig;
};

module.exports.addProxyForAws = (params, callConfig) => {
  if (params.needProxy) {
    callConfig.httpOptions = {
      proxy: params.proxyUrl
    };
  }
  return callConfig;
};

module.exports.useErrorEvent = (instance) => {
  return instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error && error.response && error.response.data) {
        log.error(error.response.status);
        log.error(error.response.data);
        log.error(error.response.headers);

        const status = error.response.status;
        const message = error.response.data.message;

        throw new ErrorEvent(status, false, status, message);
      }
      throw error;
    }
  );
};

module.exports.checkApp = (tokenApp, requiredApp) => {
  assert.ok(!_.isEmpty(requiredApp), 'requiredApp value must be set');
  return _.split(tokenApp, ',').find((x) => _.trim(x) === _.trim(requiredApp))
    ? true
    : false;
};

module.exports.saveInCache = async (cache, id, value, expiresInSeconds) => {
  await cache.save(id, value, expiresInSeconds);
  return value;
};

/**
 * getRandomPositiveIntInt.
 * This method is for internal use only. currently set maximum input : 100000
 * The maximum is exclusive and the minimum is inclusive
 *
 * @param  min, not less than 0 and not greater than 100000
 * @param  max, not less than 0 and not greater than 100000
 */
module.exports.getRandomPositiveInt = (max, min = 0) => {
  if (min < 0 || max < 0 || min > max || min > 100000 || max > 100000) {
    throw new Error('input exceed support range');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * getWaitTimeExp.
 * Returns the next wait interval, in milliseconds, using an exponential
 * backoff algorithm.
 * @param {} retryCount, optional, if specified, must be positiv int less than 10
 */
module.exports.getWaitTimeExp = (retryCount) => {
  let waitTime;
  if (_.isNumber(retryCount) && retryCount > 0 && retryCount < 10) {
    waitTime = Math.pow(2, retryCount) * 1000;
  } else if (retryCount === 0) {
    waitTime = 0;
  } else {
    throw Error('Invalid parameter for getWaitTimeExp');
  }
  return waitTime;
};

module.exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
