"use client"
import { useDispatch, useSelector } from 'react-redux'
import classes from './profile.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/fetch'
import { fetchUserPosts } from '@/redux/postSlice'
import Header from '@/components/header/Header'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import person from '../../assets/pexels-justin-shaifer-1222271.jpg'
import Image from 'next/image'
import ActionButtons from '@/components/actionButtons/ActionButtons'
import ProfileHero from '@/components/profileHero/ProfileHero'
import Post from '@/components/post/Post'
import { fetchCurrentUser, fetchSuggestedFollowings } from '@/redux/userSlice'

const Profile = (ctx) => {
    const id = ctx.params.id

    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post.posts)
    const [profile, setProfile] = useState({})
    const [isFollowed, setIsFollowed] = useState(false)
    const [followings, setFollowings] = useState([])
    const [followers, setFollowers] = useState([])
    const router = useRouter()
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        }
    })

    const isOwnProfile = session?.user?._id === profile?._id

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await api.get(`/user/${id}`)

                setIsFollowed(prev => {
                    if (profile?.followers?.includes(session?.user?._id)) {
                        return true
                    }
                })
                setFollowings(profile?.followings?.length)
                setFollowers(profile?.followers?.length)
                setProfile(profile)
            } catch (error) {
                console.log(error)
            }
        }
        session?.user?._id && fetchProfile()
    }, [id, session?.user?._id])

    useEffect(() => {
        dispatch(fetchUserPosts(id))
    }, [id])

    const handleFollow = async () => {
        try {
            const headers = {
                "Authorization": `Bearer ${session?.user?.accessToken}`
            }

            await api.put(`/user/follow/${id}`, headers)
            dispatch(fetchCurrentUser(session?.user?._id))
            dispatch(fetchSuggestedFollowings(headers))

            if (isFollowed) {
                setFollowers(prev => prev - 1)
            } else {
                setFollowers(prev => prev + 1)
            }
            setIsFollowed(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(profile)

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Header
                    label={profile?.username}
                    backArrow={<AiOutlineArrowLeft />}
                />
                <div className={classes.coverPicture}>
                    <Image width="250" height="100" src={profile?.coverPic ? profile?.coverPic : person} alt="Cover picture" />
                </div>
                <div className={classes.profilePicture}>
                    <Image src={person} alt="Profile picture" />
                </div>
                <ActionButtons
                    isOwnProfile={isOwnProfile}
                    id={id}
                    isFollowed={isFollowed}
                    handleFollow={handleFollow}
                />
                <ProfileHero
                    profile={profile}
                    followings={followings}
                    followers={followers}
                />
                {posts?.length > 0 ? posts?.map((post) => (
                    <Post
                        key={post._id}
                        postLikes={post?.likes?.length}
                        post={post}
                    />
                )) : <h2 className={classes.noPostsYet}>Profile has no posts</h2>}
            </div>
        </div>
    )
}

export default Profile