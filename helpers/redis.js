const { series } = require("async");
const { APPLICATION_ID } = require("../constants/Ids");
const redisFile = require("../config/redisFiles");
const redisText = require("../config/redisText");

const filterRedisKeys = async (filter) => {
  console.log(filter);
  let redisFileKeys = await redisFile.keys("*");
  redisFileKeys = redisFileKeys.filter((key) => {
    return key.toLowerCase().includes(filter.toLowerCase());
  });
  let redisTextKeys = await redisText.keys("*");
  redisTextKeys = redisTextKeys.filter((key) => {
    return key.toLowerCase().includes(filter.toLowerCase());
  });
  return [...new Set([...redisFileKeys, ...redisTextKeys])];
};

const deleteRedisKeys = async (keys) => {
  try {
    for (let i = 0; i < keys.length; i++) {
      await redisFile.del(keys[i]);
      await redisText.del(keys[i]);
    }
  } catch (error) {
    throw error;
  }
};
module.exports = { filterRedisKeys, deleteRedisKeys };
