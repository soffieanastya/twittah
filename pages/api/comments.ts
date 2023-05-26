import serverAuth from "@/library/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/library/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req,res)
        const { body } = req.body;
        const { postId } = req.query

        if(!postId || typeof postId !== 'string'){
            throw new Error("Invalid ID")
        }

        const comment = await prisma.comments.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            }
        })

        try {
            const post = await prisma.post.findUnique({
                where: { id: postId }
            })
            if(post?.userId){
                await prisma.notification.create({
                    data: {
                        body: 'Someone replied to your tweet!',
                        userId: post.userId
                    }
                })

                await prisma.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                })
            }
        }catch(err){
            console.log(err);
            
        }

        return res.status(200).json(comment)
    }catch(Err){
        console.log(Err);
        return res.status(400).end()
    }
}