const Joi = require("joi");
function validateCreateAdmin(data) {
  const schema = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
    repeat_password: Joi.ref("password"),
  });

  return schema.validate(data);
}

function validateUpdateAdmin(data) {
  const schema = Joi.object({
    id: Joi.number().required(),
    unit_doc_attachment: Joi.string().min(10).max(255),
    parking_slot_count: Joi.string().max(50).required(),
    parking_alloc_nos: Joi.object().required(),
  });

  return schema.validate(data);
}

function validateLogin(data) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().max(255).required(),
  });

  return schema.validate(data);
}

module.exports = { validateCreateAdmin, validateUpdateAdmin, validateLogin };
