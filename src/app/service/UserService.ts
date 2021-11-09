import { Context } from 'koa'
import library from '../db/entity/library'
import { User } from '../model/User';

class UserService {
    constructor() { }

    // service for retrieving the single user using user id
    async getUser(ctx: Context): Promise<User> {

        let userId = parseInt(ctx.params.id)

        let userModel = await library.User.findByPk(userId)

        let user: User = new User()

        if (userModel) {
            user.setId(userModel.id)
            user.setUsername(userModel.username)
            user.setPassword(userModel.password)
            user.setBirth(userModel.birth)
            user.setGender(userModel.gender)
            user.setPhone(userModel.phone)
        }

        return user
    }

    // service for retrieving the all users
    async getAllUsers(ctx: Context): Promise<Array<User>> {
        let userModels = await library.User.findAll()

        let users: Array<User> = new Array<User>()

        for (let userModel of userModels) {
            let user: User = new User()
            user.setId(userModel.id)
            user.setUsername(userModel.username)
            user.setPassword(userModel.password)
            user.setBirth(userModel.birth)
            user.setGender(userModel.gender)
            user.setPhone(userModel.phone)
            users.push(user)
        }

        return users
    }

    // service for adding the user
    async addUser(ctx: Context) {

        let username: string = ctx.request.body.username
        let password: string = ctx.request.body.password
        let birth: string = ctx.request.body.birth
        let gender: number = ctx.request.body.gender
        let phone = ctx.request.body.phone

        // adding user into database
        await library.User.create({
            username: username,
            password: password,
            birth: birth,
            gender: gender,
            phone: phone
        })
    }

    // service for updating the user
    async updateUser(ctx: Context) {

        let userId = parseInt(ctx.params.id)
        let userDetials = ctx.request.body

        // updating user detials into database
        let updateData = await library.User.update(userDetials, {
            where: {
                id: userId
            }
        })

        return updateData[0]
    }

    // service for deleting the user
    async deleteUser(ctx: Context) {

        let userId = parseInt(ctx.params.id)

        // deleting user from database
        let user = await library.User.destroy({
            where: {
                id: userId
            }
        })

    }

}


let userService: UserService = new UserService()
export default userService
