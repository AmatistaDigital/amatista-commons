import joi from 'joi';
import AWS from 'aws-sdk';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const sanitize = (value) => validator.stripLow(validator.escape(value));

export const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const joiValidate = (object, schema) => new Promise((resolve, reject) => {
  joi.validate(object, schema, (err, value) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(value);
  });
});

export const dynamoUpdate = (parameters) => new Promise((resolve, reject) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  dynamo.update(parameters, (error, result) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(result);
  });
});

export const dynamoScan = (parameters) => new Promise((resolve, reject) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  dynamo.scan(parameters, (error, result) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(result);
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


export const jwtVerify = (key, secret, opts) => new Promise((resolve, reject) => {
  jwt.verify(key, secret, opts, (errVerify, decoded) => {
    if (errVerify) {
      reject(errVerify);
      return;
    }
    resolve(decoded);
  });
});

export const bcryptCompare = (firstHash, secondHash) => new Promise((resolve, reject) => {
  bcrypt.compare(firstHash, secondHash, (err, match) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(match);
  });
});

export const tokenValidate = (fnTokenVerify, lambda, token) => new Promise((resolve, reject) => {
  const params = {
    FunctionName : fnTokenVerify,
    Payload      : JSON.stringify({token}),
  };
  lambda.invoke(params, (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    const payload = JSON.parse(data.Payload);
    if (payload.email) {
      resolve(true);
    } else {
      reject(new Error(payload.errorMessage));
    }
  });
});
