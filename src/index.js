import joi from 'joi';
import AWS from 'aws-sdk';

export const joiValidate = (object, schema) => new Promise((resolve, reject) => {
  joi.validate(object, schema, (err, value) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(value);
  });
});

export const dynamoQuery = (parameters) => new Promise((resolve, reject) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  dynamo.query(parameters, (err, result) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  });
});

export const dynamoPut = (parameters) => new Promise((resolve, reject) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  dynamo.put(parameters, (error, result) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(result);
  });
});
