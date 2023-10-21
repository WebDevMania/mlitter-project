import db from "@/lib/db";
import Post from "@/models/Post";

export async function GET(req, ctx) {
    try {
        await db.connect()

        const id = ctx.params.id

        if (id) {
            const post = await Post.findById(id)
                .populate('userId')
                .select('-password')

            return new Response(JSON.stringify(post), { status: 200 })
        } else {
            const url = new URL(req.url)
            const userId = url.searchParams.get("userId")

            const posts = await Post.find({ userId })
                .populate("userId")
                .select("-password")

            return new Response(JSON.stringify(posts), { status: 200 })
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}