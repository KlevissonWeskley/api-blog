import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { PostController } from '../controllers/PostController'

const route = Router()

route.get('/users', UserController.handleListUsers)
route.get('/users/:id', UserController.handleListUserById)
route.post('/users', UserController.handleCreateUser)
route.put('/users/:id', UserController.handleUpdateUser)
route.delete('/users/:id', UserController.handleDeleteUser)

route.get('/posts', PostController.handleListPosts)
route.get('/posts/:id', PostController.handleListPostById)
route.post('/posts', PostController.handleCreatePost)
route.put('/posts/:id', PostController.handleUpdatePost)
route.delete('/posts/:id', PostController.handleDeletePost)

export { route }