import { Request, Response } from 'express'
import { prismaClient } from '../lib/prisma'

export class UserController {
    static async handleListUsers(request: Request, response: Response) {
        const users = await prismaClient.user.findMany()

        if (users !== null) {
            return response.json(users)
        } else {
            return response.json({ message: 'Não foi possivel encontrar os usuários' })
        }

    }

    static async handleListUserById(request: Request, response: Response) {
        const { id } = request.params

        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }, 
            include: {
                posts: true
            }
        })

        if (user !== null) {
            return response.json(user)
        } else {
            return response.json({ message: 'Usuário não encontrado' })
        }

    }

    static async handleCreateUser(request: Request, response: Response) {
        const { username, email } = request.body

        const existingUser = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        })

        if (existingUser) return response.json({ message: 'Usuário ou email já existem' })

        const user = await prismaClient.user.create({
            data: {
                username,
                email
            }
        })

        if (user !== null) {
            return response.json(user)
        } else {
            return response.json({ message: 'Não foi possivel criar o usuário' })
        }

    }

    static async handleUpdateUser(request: Request, response: Response) {
        const { username, email } = request.body
        const { id } = request.params

        const user = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                username,
                email
            }
        })

        if (user !== null) {
            return response.json(user)
        } else {
            return response.json({ message: 'Não foi possivel atualizar o usuário' })
        }
    }

    static async handleDeleteUser(request: Request, response: Response) {
        const { id } = request.params

        const post = await prismaClient.post.deleteMany({
            where: {
                authorId: id
            }
        })

        const user = await prismaClient.user.delete({
            where: {
                id: id
            }
        })

        if (user && post !== null) {
            return response.json({ message: 'Usuário e post deletado' })
        } else {
            return response.json({ message: 'Não foi possivel deletar o usuário' })
        }
    }
}