// api/user/privilege/[id].ts 
import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const menu = req.query.id as string;

    const session = await getSession({ req });

    if (!session) {
        res.json({
            name:null,
            privilege: null,
            //message:
            //    "You must be signed in to view the protected content on this page.",
        });
        return;
    }


    const name= session.user?.name
    console.log("api/user/privilege/[id].ts")
    console.log(name)
    console.log(menu)
    const privilege = await prisma.privilege.findMany({
        where: {
            privilegeType: menu,
        },
        orderBy:{ sort_no: 'asc'},
        include: {
            groupPrivilege: {
                select: {
                    group: {
                        include: {
                            userGroup:
                            {
                                select:
                                    { user: true, },
                                where: { user: { name: name, }, },
                            },
                        },
                    },
                },
            },
        },
    })
    console.log(privilege);
    res.json(privilege);
    //res.json(privilege[0]);
}



