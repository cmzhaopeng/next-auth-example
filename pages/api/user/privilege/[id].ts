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
    const email= session.user?.email

    const privilege=await prisma.$queryRaw `select distinct p.name as name, p.privilege_type as "privilegeType", p.privilege_content as "privilegeContent",
    p.description as description, p.sort_no  from "Privilege" p left join "GroupPrivilege" gp on p.name=gp.privilege_name
    left join "Group" g on gp.group_name=g.name left join "UserGroup" ug on g.name=ug.group_name
    left join "User" u on u.email=ug.user_email where p.privilege_type=${menu} and u.email=${email} order by p.sort_no`
    
 //   console.log("$queryRaw");
 //   console.log(privilege);

/*
    let privilege = await prisma.privilege.findMany({
        where: {
            privilegeType: menu,
        },
        orderBy:{ sort_no: 'asc'},
        select: {
            name: true,
            privilegeType: true,
            sort_no: true,
            privilegeContent:true,
            description: true,
            groupPrivilege: {
                select: {
                    group: {
                        select: {
                            userGroup:
                            {
                                select: {
                                        user:
                                        {
                                          
                                            select: {
                                                name: true,
                                            },
                                        },},
                                  where: { userEmail: email, },                                                                                  
                               
                            },
                        },
                    },
                },
            },
        },
    })

    console.log("privilege-select not include");
    console.log(privilege);
       




    console.log("api/user/privilege/[id].ts")
    console.log(name)
    console.log(menu)
    let privilegeQuery = await prisma.privilege.findMany({
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
    console.log(privilegeQuery);

    //filter the privilegeQuery according user.name==session.user.name
    let privilege = privilegeQuery.filter((item) => {
        return item.groupPrivilege[0].group.userGroup[0]?.user.name == name;
    });

    privilege.forEach((item) => {
        console.log(item.groupPrivilege[0].group.userGroup[0]?.user.name);
    });
    */
    res.json(privilege);
    //res.json(privilege[0]);
}



