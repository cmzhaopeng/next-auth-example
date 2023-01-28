//pages/api/addr/insert.ts
import { AddressProps } from "../../address";
import prisma from "../../../lib/prisma";
import { AddressItemProps } from "./index";
import {getSession} from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({ req });
    const { addressTable } = req.body;

    if (!session) {
      res.status(401).json({
        message:
          "You must be signed in to view the protected content on this page.",
      });
      return;
    }


    await Promise.all(
        addressTable.map(async (item: AddressItemProps) => {
          const address = await prisma.address.findFirst({
            where: {
              OR: [
                {
                  startIntAddress: {
                    gte: item.startIntAddress,
                    lte: item.endIntAddress,
                  },
                },
                {
                  endIntAddress: {
                    gte: item.startIntAddress,
                    lte: item.endIntAddress,
                  },
                },
                {
                  startIntAddress: { lte: item.startIntAddress },
                  endIntAddress: { gte: item.endIntAddress },
                },
              ],
            },
          });
      
          if (address) {
            item.isRepeat = true;
          } else {
            item.isRepeat = false;
          }
        })
        );

        const addrNoRepeat=addressTable.filter((item: AddressItemProps)=>!item.isRepeat);

        await Promise.all(
            addrNoRepeat.map(async (item: AddressItemProps) => {
              const address = await prisma.address.create({
                data: {
                    startAddress:item.startAddress,
                    endAddress: item.endAddress,
                    addressType:"W",
                    addressDescription:item.description,
                    startIntAddress: item.startIntAddress,
                    endIntAddress: item.endIntAddress,
                    protocol: item.protocol,
                    applicant: session.user.name?session.user.name:"",
                    status:0,
                },
              });
            })
            ); 

            res.json(addrNoRepeat);
    console.log(session.user.name)
    console.log("api/addr/insert.ts");
}
