import { api } from "@/lib/fetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {}

export const fetchCurrentUser = createAsyncThunk('/fetch-current-user', async (userId) => {
    const data = await api.get(`/user/${userId}`)

    return data
})

export const fetchSuggestedFollowings = createAsyncThunk('/fetch-suggested-users', async (headers) => {
    const data = await api.get('/user/find-users', headers)

    console.log(data)
    return data
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            return {
                ...state,
                currentUser: action.payload
            }
        }),
            builder.addCase(fetchSuggestedFollowings.fulfilled, (state, action) => {
                return {
                    ...state,
                    suggestedFollowings: action.payload
                }
            })
    }
})

export default userSlice.reducer