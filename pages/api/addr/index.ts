//pages/api/addr/index.ts
import { AddressProps } from "../../address";
import prisma from "../../../lib/prisma";

export type AddressItemProps = {
  id: number;
  startAddress: string;
  endAddress: string;
  description: string;
  startIntAddress: number;
  endIntAddress: number;
  protocol:string;
  applicant: string;
  isRepeat: boolean;
};

export default async function handle(req, res) {
  const { addr } = req.body;
  //var resAddr: AddressProps = [];

  await Promise.all(
  addr.map(async (item: AddressItemProps) => {
    //find any address that item.startIntAddress equal prisma.address.startIntAddress
    //or item.startIntAddress equal prisma.address.endIntAddress
    //or item.endIntAddress equal prisma.address.startIntAddress
    //or item.endIntAddress equal prisma.address.endIntAddress
    //or item.startIntAddress between prisma.address.startIntAddress and prisma.address.endIntAddress
    //or item.endIntAddress between prisma.address.startIntAddress and prisma.address.endIntAddress
    //or prisma.address.startIntAddress between item.startIntAddress and item.endIntAddress
    //or prisma.address.endIntAddress between item.startIntAddress and item.endIntAddress
    //if any of the above is true, then return the address

    //if none of the above is true, then return null
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
      console.log("address already exist");
      item.isRepeat = true;
   //   resAddr.push(item);
    } else {
      console.log("address does not exist");
      item.isRepeat = false;
      item.description = "new address";
    //  resAddr.push(item);
    }
    console.log("in map item");
    console.log(item);
  })
  );

  console.log("api/addr/index.ts");
  //console.log(resAddr);
  res.json(addr);
}

