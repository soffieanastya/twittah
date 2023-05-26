import serverAuth from "@/library/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/library/prismadb"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'PATCH'){
        return res.status(405).end()
    }

    // const { currentUser } = await serverAuth(req,res)
    // console.log('masuk edit');
    
    // console.log(currentUser,'ed');
    
    try {
        const { currentUser } = await serverAuth(req,res)
        const { name, username, bio, profileImage, coverImage } = req.body;
        // console.log('masuk edit');
        
        // console.log(currentUser,'di edit');
        
        if(!name || !username){
            throw new Error('Missing fields!')
        }

        const updateUser = await prisma.user.update({
            where: { id: currentUser.id},
            data: {
                name, username, bio, profileImage, coverImage
            }
        })
        return res.status(200).json(updateUser)
    }catch(err){
        console.log(err);
        return res.status(400).end()
    }
}