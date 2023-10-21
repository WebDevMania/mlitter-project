import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import User from "@/models/User";

export async function GET(req, ctx) {
    try {
        await db.connect()

        const id = ctx.params.id

        const user = await User.findById(id)

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occured" }), { status: 500 })
    }
}

export async function PUT(req, ctx) {
    try {
        await db.connect()

        const id = ctx.params.id
        const decodedToken = authorize(req)
        const userId = decodedToken._id

        const body = await req.json()

        if (userId !== id) {
            return new Response(JSON.stringify({ error: "You can update only your own profile" }))
        }

        if (Object.values((body)).some((v) => v === "")) {
            return new Response(JSON.stringify({ error: "Fill all fields!" }), { status: 422 })
        }


        await User.findByIdAndUpdate(
            id,
            { $set: { ...body } },
            { new: true }
        )

        return new Response(
            JSON.stringify({ message: "Successfully updated the user" }),
            { status: 200 }
        )
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occured" }), { status: 500 })
    }
}