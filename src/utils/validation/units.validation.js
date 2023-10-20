const Joi = require("joi");
function validatePostUnit(data) {
  const schema = Joi.object({
    unit: Joi.string().max(50).required(),
    block: Joi.string().max(50).required(),
    floor: Joi.string().max(50).required(),
    sqft_details: Joi.string().min(3).max(50).required(),
    flat_type: Joi.string().max(50).required(),
    water_code: Joi.string().min(3).max(50).required(),
    eb_code: Joi.string().min(3).max(50).required(),
    unit_doc_attachment: Joi.string().min(10).max(255),
    parking_slot_count: Joi.string().max(50).required(),
    parking_alloc_nos: Joi.object().required(),
  });

  return schema.validate(data);
}

module.exports = { validatePostUnit };
