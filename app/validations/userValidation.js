// const Joi = require("@hapi/joi");
const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");

const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

function updateDetails(req) {
  const schema = Joi.object({
    id: Joi.string().required().empty().messages({
          "string.base": `id should be a type of 'text'`,
          "string.empty": `id cannot be an empty field`,
          "any.required": `id is a required field`,
        }),
          name: Joi.string().required().empty().messages({
            "string.base": `Name should be a type of 'text'`,
            "string.empty": `Name name cannot be an empty field`,
            "any.required": `Name name is a required field`,
          }),
          email: Joi.string().required().empty().email().messages({
              "string.base": `email should be a type of 'text'`,
              "string.empty": `email cannot be an empty field`,
              "string.email": `email format not valid`,
              "any.required": `email is a required field`,
            }),
            phone: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
              "number.empty": `Phone number cannot be an empty field`,
              "number.min": "Phone number must be 10 digit",
              "number.max": "Phone number can't be greater than 10 digit",
              "any.required": `Phone number is a required field`,
            }),
            gender: Joi.string().required().empty().messages({
              "string.base": `gender should be a type of 'text'`,
              "string.empty": `gender cannot be an empty field`,
              "any.required": `gender is a required field`,
            }),
            hobbies: Joi.string().required().empty().messages({
              "string.base": `hobbies should be a type of 'text'`,
              "string.empty": `hobbies cannot be an empty field`,
              "any.required": `hobbies is a required field`,
            }),
            country: Joi.string().required().empty().messages({
              "string.base": `country should be a type of 'text'`,
              "string.empty": `country cannot be an empty field`,
              "any.required": `country is a required field`,
            }),
            address: Joi.string().required().empty().messages({
              "string.base": `address should be a type of 'text'`,
              "string.empty": `address cannot be an empty field`,
              "any.required": `address is a required field`,
            }),
            pincode: Joi.string().required().empty().messages({
              "string.base": `pincode should be a type of 'text'`,
              "string.empty": `pincode cannot be an empty field`,
              "any.required": `pincode is a required field`,
            }),
            date: Joi.date().format('YYYY-MM-DD').required().messages({
              "date.format": `date should be a format`,
              "any.required": `date is a required field`,
            })
  });
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};
return schema.validate(req, options);
}

function addDetails(req) {
  const schema = Joi.object({
    name: Joi.string().required().empty().messages({
      "string.base": `Name should be a type of 'text'`,
      "string.empty": `Name cannot be an empty field`,
      "any.required": `Name is a required field`,
    }),
    email: Joi.string().required().empty().email().messages({
        "string.base": `email should be a type of 'text'`,
        "string.empty": `email cannot be an empty field`,
        "string.email": `email format not valid`,
        "any.required": `email is a required field`,
      }),
      phone: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
        "number.empty": `Phone number cannot be an empty field`,
        "number.min": "Phone number must be 10 digit",
        "number.max": "Phone number can't be greater than 10 digit",
        "any.required": `Phone number is a required field`,
      }),
      gender: Joi.string().required().empty().messages({
        "string.base": `gender should be a type of 'text'`,
        "string.empty": `gender cannot be an empty field`,
        "any.required": `gender is a required field`,
      }),
      hobbies: Joi.string().required().empty().messages({
        "string.base": `hobbies should be a type of 'text'`,
        "string.empty": `hobbies cannot be an empty field`,
        "any.required": `hobbies is a required field`,
      }),
      country: Joi.string().required().empty().messages({
        "string.base": `country should be a type of 'text'`,
        "string.empty": `country cannot be an empty field`,
        "any.required": `country is a required field`,
      }),
      address: Joi.string().required().empty().messages({
        "string.base": `address should be a type of 'text'`,
        "string.empty": `address cannot be an empty field`,
        "any.required": `address is a required field`,
      }),
      pincode: Joi.string().required().empty().messages({
        "string.base": `pincode should be a type of 'text'`,
        "string.empty": `pincode cannot be an empty field`,
        "any.required": `pincode is a required field`,
      }),
      date: Joi.date().format('YYYY-MM-DD').required().messages({
        "date.format": `date should be a format`,
        "any.required": `date is a required field`,
      })
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

  return schema.validate(req, options);
}

module.exports = {

  updateDetails, addDetails,
  listById: Joi.object({
    id: Joi.string().required().empty().messages({
      "string.base": `id should be a type of 'text'`,
      "string.empty": `id cannot be an empty field`,
      "any.required": `id is a required field`,
    })
}),

delete: Joi.object({
    id: Joi.string().required().empty().messages({
      "string.base": `id should be a type of 'text'`,
      "string.empty": `id cannot be an empty field`,
      "any.required": `id is a required field`,
    })
}),

}
