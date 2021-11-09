import Joi from 'joi';
class UserValidationSchema {
  constructor() { }
  static getUserSchema = Joi.object({
    id: Joi.number().positive().required()
  })

  static addUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    gender: Joi.string(),
    birth: Joi.string(),
    phone: Joi.string(),
  })

  static updateUserSchema = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
    gender: Joi.string(),
    birth: Joi.string(),
    phone: Joi.string(),
  })

  static deleteUserSchema = Joi.object({
    id: Joi.number().positive().required()
  })

}
export default UserValidationSchema;
