// api/user/privilege/[id].ts import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
    const name= req.query.id;
   // console.log(queryname);
  /*  const user = await prisma.user.findMany({
        where: { name: name,},
        include :{
             userGroup:{
                    select:{ 
                        group: {
                            include: {groupPrivilege: 
                                {
                                    select: {
                                    privilege:true,
                                },
                            },
                        },
                         },
             }, 
    },
},
})
*/
   //console.log(user[0].userGroup[0].group.groupPrivilege);
   //res.json(user[0]);
   const privilege=await prisma.privilege.findMany({
    where: {
        privilegeType: 'menu',
    },
    include: {
        groupPrivilege: {
            select: {
                group: {
                    include: {
                        userGroup:
                        {select: 
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
    


