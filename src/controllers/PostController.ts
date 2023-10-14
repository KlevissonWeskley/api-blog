import { Request, Response } from 'express'
import { prismaClient } from '../lib/prisma'

export class PostController {
    static async handleListPosts(request: Request, response: Response) {
        const posts = await prismaClient.post.findMany()

        if (posts !== null) {
            return response.json(posts)
        } else {
            return response.json({ message: 'Não foi possivel listar os posts' })
        }
    }

    static async handleListPostById(request: Request, response: Response) {
        const { id } = request.params

        const post = await prismaClient.post.findUnique({
            where: {
                id: id
            }
        })

        if (post !== null) {
            return response.json(post)
        } else {
            return response.json({ message: 'Post não encontrado' })
        }

    }

    static async handleCreatePost(request: Request, response: Response) {
        const { title, content, authorId } = request.body

        const post = await prismaClient.post.create({
            data: {
                title,
                content,
                authorId
            }
        })

        if (post !== null) {
            return response.json(post)
        } else {
            return response.json({ message: 'Não foi possivel criar o post' })
        }
    }

    static async handleUpdatePost(request: Request, response: Response) {
        const { title, content } = request.body
        const { id } = request.params

        const post = await prismaClient.post.update({
            where: {
                id: id
            },
            data: {
                title,
                content
            }
        })

        if (post !== null) {
            return response.json(post)
        } else {
            return response.json({ message: 'Não foi possivel editar o post' })
        }
    }

    static async handleDeletePost(request: Request, response: Response) {
        const { id } = request.params

        const post = await prismaClient.post.delete({
            where: {
                id: id
            }
        })

        if (post !== null) {
            return response.json({ message: 'Post deletado' })
        } else {
            return response.json({ message: 'Não foi possivel deletar o post' })
        }
    }

}