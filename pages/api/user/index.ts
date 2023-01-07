// pages/api/user/index.ts


import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/user

export type UserProps = {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  
export default async function handle(req, res) {
// At this postion, you should have a session object with a user object
// ensure the user is authenticated and has admin privileges


    const method = req.method;
    const data = req.body;
    switch (method) {
        case 'POST':
            const users = await prisma.user.createMany({
                data: data.users,
                skipDuplicates: true,
            })
            res.json(users)
            break;
        case 'PUT':
            const updateUsers = await Promise.all(
                data.users.map (async (user: UserProps)  => {
                    const updatedUser = await prisma.user.update({
                        where: { id: user.id },
                        data: user,
                    })
                    return updatedUser;
                })  

            )
            res.json(updateUsers)
            break;
        case 'DELETE':
            const deleteUsers = await Promise.all(
                data.users.map (async (user: UserProps) => {
                    const deletedUser = await prisma.user.delete({
                        where: { id: user.id
                        }
                    })
                    return deletedUser;
                })
            )
            res.json(deleteUsers)
            break;

        default:
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
     }

    }
