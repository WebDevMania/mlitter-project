"use client"
import Image from 'next/image'
import classes from './post.module.css'
import person from '../../app/assets/pexels-justin-shaifer-1222271.jpg'
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { AiOutlineComment } from 'react-icons/ai'
import ActionButtons from '../actionButtons/ActionButtons'
import Heart from '../heart/Heart'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { api } from '@/lib/fetch'
import { fetchFeedPosts } from '@/redux/postSlice'
import { useDispatch } from 'react-redux'

const Post = ({
  post,
  postLikes: likes,
}) => {
  const dispatch = useDispatch()
  const user = post?.userId
  const userId = post?.userId?._id
  const { data: session } = useSession()
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(null);

  const [postLikes, setPostLikes] = useState(likes)
  const router = useRouter()

  useEffect(() => {
    function handleIsLikedByCurrentUser(){
      setIsLikedByCurrentUser(post?.likes?.includes(session?.user?._id))
    }
    session?.user?._id && handleIsLikedByCurrentUser()
  }, [session?.user?._id])

  const handleLike = async (e) => {
    e.stopPropagation()

    try {
      const headers = {
        "Authorization": `Bearer ${session?.user?.accessToken}`
      }

      await api.put(`/post/like/${post?._id}`, headers)
      dispatch(fetchFeedPosts())

      if (isLikedByCurrentUser) {
        setPostLikes(prev => prev - 1)
      } else {
        setPostLikes(prev => prev + 1)
      }

      setIsLikedByCurrentUser(prev => !prev)

    } catch (error) {
      toast.error(error.message)
    }
  }

  const goToPost = (e) => {
    e.stopPropagation()
    router.push(`/postDetails/${post?._id}`)
  }

  const goToProfile = (e) => {
    e.stopPropagation()
    router.push(`/profile/${userId}`)
  }

  return (
    <div className={classes.container} onClick={goToPost}>
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <div className={classes.imageContainer} onClick={goToProfile}>
            <Image src={person} alt="" />
          </div>
          <span className={classes.username}>
            {user.username}
          </span>
          <span className={classes.usernameTwitter}>
            @{user.username}
          </span>
          <span className={classes.postedAgo}>
            {format(post?.createdAt)}
          </span>
        </div>
        <p className={classes.desc}>
          {post?.desc}
        </p>
        <div className={classes.actions}>
          <div className={classes.action}>
            <AiOutlineComment size={25} />
            <span>{post?.comments?.length || 0}</span>
          </div>
          <div className={classes.action}>
            <Heart
              condition={isLikedByCurrentUser}
              eventHandler={handleLike}
              postLikes={postLikes}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Post