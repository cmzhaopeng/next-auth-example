//pages/api/publish/[id].ts

import  prisma from  '../../../lib/prisma'

// POST /api/publish/:id
export default async function handle(req, res) {
    const postId = req.query.id
    const post = await prisma.post.update({
        where: { id: postId },
        data: { published: true },
    })
    res.json(post)
    }