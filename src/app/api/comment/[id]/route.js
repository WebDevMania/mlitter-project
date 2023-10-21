import db from "@/lib/db";
import Comment from "@/models/Comment";

export async function GET(req, ctx) {
    try {
        await db.connect()

        const id = ctx.params.id

        const comment = await Comment.findById(id)
            .populate("userId")
            .select("-password")

        return new Response(JSON.stringify(comment), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}