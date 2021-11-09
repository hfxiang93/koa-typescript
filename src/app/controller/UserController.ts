import { Context } from 'koa'
import logger from '../../logger'
import httpConstants from '../constant/HttpConstants'
import userService from '../service/UserService'
import userValidator from '../validation/custom/UserValidator'
import { User } from '../model/User'
import apiErrorHandler from '../utils/ApiErrorHandler'


class UserController {
    constructor() { }

    async getUser(ctx: Context) {
        try {
            let validation = await userValidator.getUser(ctx)
            if (!validation.isValid) {
                ctx.status = validation.status
                ctx.body = validation.data
                return
            }

            logger.info(`Controller : getUser, Request-Body : ${JSON.stringify(ctx.params)}`)

            // getting the user
            let user: User = await userService.getUser(ctx)

            ctx.status = httpConstants.HTTP_SUCCESS_OK
            ctx.body = user
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);

            logger.error(`Controller : getUser, Error : ${JSON.stringify(error)}`)
        }
    }

    async getAllUsers(ctx: Context) {
        try {
            let users: Array<User> = await userService.getAllUsers(ctx)

            ctx.status = httpConstants.HTTP_SUCCESS_OK
            ctx.body = users
            logger.info(`Controller : getAllUsers, Response-Body : ${JSON.stringify(ctx.body)}`)
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);

            logger.error(`Controller : getAllUsers, Error : ${JSON.stringify(error)}`)
        }
    }

    async addUser(ctx: Context) {
        try {
            let validation = await userValidator.addUser(ctx)
            if (!validation.isValid) {
                ctx.status = validation.status
                ctx.body = validation.data
                return
            }

            logger.info(`Controller : addUser, Request-Body : ${JSON.stringify(ctx.request.body)}`)

            // adding the user
            await userService.addUser(ctx)

            ctx.status = httpConstants.HTTP_CREATED
            ctx.body = 'add user success'
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);

            logger.error(`Controller : addUser, Error : ${JSON.stringify(error)}`)
        }
    }


    async updateUser(ctx: Context) {
        try {
            let validation = await userValidator.updateUser(ctx)
            if (!validation.isValid) {
                ctx.status = validation.status
                ctx.body = validation.data
                return
            }

            logger.info(`Controller : updateUser, Request-Body : ${JSON.stringify(ctx.request.body)}`)
            logger.info(`Request-Params : ${JSON.stringify(ctx.params)}`)

            // adding the user
            let updatedCount = await userService.updateUser(ctx)

            if (!updatedCount) {
                ctx.status = httpConstants.HTTP_CONFLICT
                ctx.body = { error: 'user does not exist.' }
            } else {
                ctx.status = httpConstants.HTTP_SUCCESS_OK
            }
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);

            logger.error(`Controller : updateUser, Error : ${JSON.stringify(error)}`)
        }
    }


    async deleteUser(ctx: Context) {
        try {
            let validation = await userValidator.deleteUser(ctx)
            if (!validation.isValid) {
                ctx.status = validation.status
                ctx.body = validation.data
                return
            }

            logger.info(`Controller : deleteUser, Request-Body : ${JSON.stringify(ctx.request.body)}`)
            logger.info(`Request-Params : ${JSON.stringify(ctx.params)}`)

            // adding the user
            await userService.deleteUser(ctx)

            ctx.status = httpConstants.HTTP_NO_CONTENT
        } catch (error) {
            apiErrorHandler.errorHandler(error, ctx);

            logger.error(`Controller : deleteUser, Error : ${JSON.stringify(error)}`)
        }
    }

}

const userController: UserController = new UserController()
export default userController
