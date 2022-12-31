// pages/api/publish/[id].ts

import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const id= req.query.id;
    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    res.json(user);
}
