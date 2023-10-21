import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import Post from "@/models/Post";

export async function GET(req) {
    try {
        await db.connect()

        let posts = []

        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId")

        if (userId) {
            posts = await Post.find({ userId })
                .limit(16)
                .populate("userId")
                .select("-password")
                .sort({ createdAt: "-1" })
        } else {
            posts = await Post.find({})
                .limit(16)
                .populate("userId")
                .select("-password")
                .sort({ createdAt: "-1" })
        }

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}

export async function POST(req) {
    try {
        await db.connect()

        const decodedToken = authorize(req)

        const body = await req.json()

        const newPost = await Post.create(body)

        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}