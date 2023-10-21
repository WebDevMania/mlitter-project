import { createNotification } from "@/lib/createNotification";
import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import Post from "@/models/Post";

export async function PUT(req, ctx) {
    try {
        await db.connect()

        const decodedToken = authorize(req)

        const id = ctx.params.id
        const userId = decodedToken._id

        const post = await Post.findById(id)
        const isLikedByCurrentUser = post.likes.includes(userId)

        if (isLikedByCurrentUser) {
            await Post.findByIdAndUpdate(id, { $pull: { likes: userId } })
 
            await createNotification(post.userId, "Someone unliked your post!")

            return new Response(
                JSON.stringify({ message: "User successfully unliked that post" }),
                { status: 200 }
            )
        } else {
            await Post.findByIdAndUpdate(id, { $push: { likes: userId } })

            await createNotification(post.userId, "Someone liked your post!")

            return new Response(
                JSON.stringify({ message: "User successfully liked that post" }),
                { status: 200 }
            )
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}