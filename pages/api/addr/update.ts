//pages/api/addr/insert.ts
import { AddressProps } from "../../address/approve";
import prisma from "../../../lib/prisma";
import { AddressItemProps } from "./index";
import {getSession} from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({ req });
    const { rows } = req.body;

    if (!session) {
      res.status(401).json({
        message:
          "You must be signed in to view the protected content on this page.",
      });
      return;
    }

    const name=session.user.name;

    await Promise.all(
        rows.map(async (item: AddressProps) => {
          const address = await prisma.address.update({
            where: {
              id: item.id,
            },
            data: {
              approver:name,
              status:item.status,
          },
          
          });}
          ))
                
    console.log(session.user.name);
    console.log("api/addr/update.ts");
    res.json(rows);
}
