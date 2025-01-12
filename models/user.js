const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegaxp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      require: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string()
    .min(7)
    .required()
    .messages({ "any.required": "missing required password field" }),
  email: Joi.string()
    .pattern(emailRegaxp)
    .required()
    .messages({ "any.required": "missing required email field" }),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "missing required subscription field" }),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegaxp)
    .required()
    .messages({ "any.required": "missing required field email" }),
});

const schemas = {
  registerSchema,
  subscriptionSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
