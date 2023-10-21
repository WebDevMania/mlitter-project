import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        min: 3
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
}, {
    timestamps: true
})

export default mongoose?.models?.Comment || mongoose.model("Comment", CommentSchema)