import { createNotification } from "@/lib/createNotification";
import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import Comment from "@/models/Comment";

export async function PUT(req, ctx) {
    try {
        await db.connect()

        const decodedToken = authorize(req)
        const userId = decodedToken._id

        const id = ctx.params.id

        const comment = await Comment.findById(id)

        if (comment?.likes?.includes(userId)) {
            await Comment.findByIdAndUpdate(
                id,
                { $pull: { likes: userId } }
            )
    
            await createNotification(comment.userId, "Someone unliked your comment!")

            return new Response(
                JSON.stringify({ message: "Successfully unliked the comment" })
                , { status: 200 }
            )
        } else {
            await Comment.findByIdAndUpdate(
                id,
                { $push: { likes: userId } }
            )

            await createNotification(comment.userId, "Someone liked your comment!")

            return new Response(
                JSON.stringify({ message: "Successfully liked the comment" })
                , { status: 200 }
            )
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}