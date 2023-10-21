import { createNotification } from "@/lib/createNotification";
import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import Comment from "@/models/Comment";
import Post from "@/models/Post";

export async function POST(req) {
    try {
        await db.connect()

        const decodedToken = authorize(req)

        const body = await req.json()

        const post = await Post.findById(body.postId)
        const newComment = await Comment.create(body)

        await Post.findByIdAndUpdate(body.postId, { $push: { comments: newComment._id } })
        await createNotification(post.userId, "Someone commented on your post!")

        return new Response(JSON.stringify(newComment), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}