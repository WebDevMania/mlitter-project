import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import Notification from "@/models/Notification";
import User from "@/models/User";

export async function GET(req) {
    try {
        await db.connect()

        const decodedToken = authorize(req)
        const userId = decodedToken._id

        await Notification.updateMany({ userId }, { $set: { new: false } }, { new: true })
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 })
        await User.findByIdAndUpdate(userId, { $set: { hasNotifications: false } }, { new: true })

        return new Response(JSON.stringify(notifications), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}