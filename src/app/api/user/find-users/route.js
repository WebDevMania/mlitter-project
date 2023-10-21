import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import User from "@/models/User";

export async function GET(req) {
    try {
        await db.connect()

        const decodedToken = authorize(req)
        const userId = decodedToken._id

        const currentUser = await User.findById(userId)
        let users = await User.find({})

        // it will return users that are not our own user
        // and users that we aren't following
        users = users.filter((user) => {
            if (
                user._id.toString() !== currentUser._id.toString() &&
                !currentUser.followings.includes(user._id.toString())
            )
                return user
        }).slice(0, 3)

        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occured" }), { status: 500 })
    }
}