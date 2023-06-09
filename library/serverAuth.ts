import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react'

import prisma from "@/library/prismadb"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

// pengecekan saat login, diperiksa email sama password yang di hash nya
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    const session = await getServerSession(req, res, authOptions)

    if(!session?.user?.email) {
        const currentUser = {
            id: ''
        }
        return {currentUser}
        // throw new Error("Not signed innnn");
        // return;
    }

    const currentUser = await prisma.user.findUnique({
        where : {
            email: session.user.email
        }
    })

    if(!currentUser){
        throw new Error('Not signed in')
    }
 

    return { currentUser }
}

export default serverAuth;