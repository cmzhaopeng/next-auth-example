// pages/api/user/index.ts

import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
// POST /api/user
import { PrivilegeProps } from "../../admin";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  // At this position, you should have a session object with a user object
  // ensure the user is authenticated and has admin privileges
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({
      message:
        "You must be signed in to view the protected content on this page.",
    });
    return;
  }
/*
  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!isAdmin) {
    res.status(401).json({
      message: "You must be Admin to view the protected content on this page.",
    });
    return;
  }
  */
  const menu= "menu"
  const email= session.user.email
  let privilege: PrivilegeProps[]=await prisma.$queryRaw `select distinct p.name as name, p.privilege_type as "privilegeType", p.privilege_content as "privilegeContent",
  p.description as description, p.sort_no  from "Privilege" p left join "GroupPrivilege" gp on p.name=gp.privilege_name
  left join "Group" g on gp.group_name=g.name left join "UserGroup" ug on g.name=ug.group_name
  left join "User" u on u.email=ug.user_email where p.privilege_type=${menu} and u.email=${email} order by p.sort_no`
  //console.log(privilege);
  //filter the privilege privilegeContent is "/admin"
  privilege=privilege.filter((item)=>item.privilegeContent=="/admin")

  if (privilege.length==0) {
      res.status(401).json({
        message: "You must be Admin to view the protected content on this page.",
      });
      return;
    }


  const method = req.method;
  const data = req.body;
  switch (method) {
    case "GET":
      const dataUser = await prisma.user.findMany();
      res.json(dataUser);
      break;
    case "POST":
      const users = await prisma.user.createMany({
        data: data.users,
        skipDuplicates: true,
      });
      res.json(users);
      break;
    case "PUT":
      const updateUsers = await Promise.all(
        data.users.map(async (user: UserProps) => {
          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: user,
          });
          return updatedUser;
        })
      );
      res.json(updateUsers);
      break;
    case "DELETE":
      const deleteUsers = await Promise.all(
        data.users.map(async (user: UserProps) => {
          const deletedUser = await prisma.user.delete({
            where: { id: user.id },
          });
          return deletedUser;
        })
      );
      res.json(deleteUsers);
      break;

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
