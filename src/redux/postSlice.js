import { api } from "@/lib/fetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {}


export const fetchUserPosts = createAsyncThunk("/fetch-user-posts", async (userId) => {
    const data = await api.get(`post?userId=${userId}`)

    return data
})

export const fetchFeedPosts = createAsyncThunk('/fetch-feed-posts', async () => {
    const data = await api.get('/post')

    return data
})

export const fetchPostDetails = createAsyncThunk('/fetch-post-details', async (postId) => {
    const data = await api.get(`/post/${postId}`)

    return data
})

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
            return {
                ...state,
                posts: action.payload
            }
        }),
            builder.addCase(fetchFeedPosts.fulfilled, (state, action) => {
                return {
                    ...state,
                    feed: action.payload
                }
            }),
            builder.addCase(fetchPostDetails.fulfilled, (state, action) => {
                return {
                    ...state,
                    postDetails: action.payload
                }
            })
    }
})

export default postSlice.reducer