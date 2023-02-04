// pages/api/user/index.ts

import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
// POST /api/user

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
