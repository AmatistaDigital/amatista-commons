import joi from 'joi';

export const joiValidate = (object, schema) => new Promise((resolve, reject) => {
  joi.validate(object, schema, (err, value) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(value);
  });
});
