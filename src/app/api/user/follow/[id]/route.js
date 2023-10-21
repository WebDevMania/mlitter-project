import { createNotification } from "@/lib/createNotification";
import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import User from "@/models/User";

export async function PUT(req, ctx) {
    try {
        await db.connect()

        const decodedToken = authorize(req)
        const currentUserId = decodedToken._id
        const otherUserId = ctx.params.id

        if (currentUserId === otherUserId) {
            return new Response(
                JSON.stringify({ error: "You can't follow yourself :D" }),
                { status: 403 }
            )
        }

        const currentUser = await User.findById(currentUserId)
        const otherUser = await User.findById(otherUserId)

        if (currentUser.followings.includes(otherUserId)) {
            await User.findByIdAndUpdate(
                otherUserId,
                { $pull: { followers: currentUserId } }
            )
            await User.findByIdAndUpdate(
                currentUserId,
                { $pull: { followings: otherUserId } }
            )

            await createNotification(otherUserId, "Someone unfollowed you")

            return new Response(JSON.stringify({ message: "Successfully unfollowed the user" }), { status: 200 })
        } else {
            await User.findByIdAndUpdate(
                otherUserId,
                { $push: { followers: currentUserId } }
            )
            await User.findByIdAndUpdate(
                currentUserId,
                { $push: { followings: otherUserId } }
            )

            await createNotification(otherUserId, "Someone followed you")

            return new Response(JSON.stringify({ message: "Successfully followed the user" }), { status: 200 })
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}