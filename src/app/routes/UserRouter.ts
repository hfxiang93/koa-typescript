import { RouterManager } from '../core/RouterManager'
import userController from '../controller/UserController'

const userRouterManager: RouterManager = new RouterManager('/users')

userRouterManager.get('/:id', userController.getUser)

userRouterManager.get('/', userController.getAllUsers)

userRouterManager.post('/', userController.addUser)

userRouterManager.put('/:id', userController.updateUser)

userRouterManager.delete('/:id', userController.deleteUser)


export default userRouterManager

