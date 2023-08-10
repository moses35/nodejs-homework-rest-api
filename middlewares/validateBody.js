const { HttpError } = require("../helpers");

const addValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = `missing required ${error?.details[0].context.key} field`;
      next(HttpError(400, errorMessage));
    }
    next();
  };
  return func;
};

const updateByIdValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = `missing field`;
      next(HttpError(400, errorMessage));
    }
    next();
  };
  return func;
};

module.exports = {
  addValidateBody,
  updateByIdValidateBody,
};
