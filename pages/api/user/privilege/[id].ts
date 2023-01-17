// api/user/privilege/[id].ts import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
    const menu = req.query.id;

    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({
            message:
                "You must be signed in to view the protected content on this page.",
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



