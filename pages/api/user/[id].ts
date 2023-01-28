// pages/api/publish/[id].ts

import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const id= req.query.id as string;
    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    res.json(user);
}
