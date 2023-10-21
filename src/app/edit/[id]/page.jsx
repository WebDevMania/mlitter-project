"use client"
import { useSession } from 'next-auth/react'
import classes from './edit.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/fetch'
import { AiOutlineFileImage } from 'react-icons/ai'

const Edit = (ctx) => {
    const CLOUD_NAME = "doojo83ea"
    const UPLOAD_PRESET = "ncqbyghu"

    const id = ctx.params.id
    const [profileData, setProfileData] = useState({})
    const [coverImage, setCoverImage] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await api.get(`/user/${id}`)

                setProfileData(profile)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfile()
    }, [id])

    const handleChange = (e) => {
        setProfileData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const headers = {
                "Authorization": `Bearer ${session?.user?.accessToken}`,
                "Content-Type": "application/json"
            }

            const body = {
                ...profileData
            }

            let coverImageUrl
            let profileImageUrl

            if (coverImage) {
                coverImageUrl = await uploadImage(coverImage)
                body.coverPic = coverImageUrl
            }

            if (profileImage) {
                profileImageUrl = await uploadImage(profileImage)
                body.profilePic = profileImageUrl
            }

            await api.put(`/user/${id}`, headers, body)

            router.push(`/profile/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async (image) => {
        if (!image) return

        const formData = new FormData()

        formData.append("file", image)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            const imageUrl = data['secure_url']

            return imageUrl
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={profileData?.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={profileData?.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="bio"
                        value={profileData?.bio}
                        onChange={handleChange}
                    />
                    <label htmlFor='coverImage'>
                        Upload Cover Image
                        <AiOutlineFileImage />
                    </label>
                    <input
                        type="file"
                        id="coverImage"
                        style={{ display: "none" }}
                        onChange={(e) => setCoverImage(e.target.files[0])}
                    />
                    <label htmlFor='profileImage'>
                        Upload Profile Image
                        <AiOutlineFileImage />
                    </label>
                    <input
                        type="file"
                        id="profileImage"
                        style={{ display: "none" }}
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                    <button className={classes.editButton}>
                        Edit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Edit