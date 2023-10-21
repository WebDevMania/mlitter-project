"use client"
import Image from 'next/image'
import classes from './comment.module.css'
import person from '../../app/assets/pexels-justin-shaifer-1222271.jpg'
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/fetch'
import Heart from '../heart/Heart'

const Comment = ({
  commentId
}) => {
  const { data: session } = useSession()
  const [comment, setComment] = useState("")
  const [commentLikes, setCommentLikes] = useState(0)
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false)

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await api.get(`/comment/${commentId}`)

        setComment(data)
        setCommentLikes(data?.likes?.length)
        setIsLikedByCurrentUser(data?.likes?.includes(session?.user?._id))

      } catch (error) {
        console.log(error)
      }
    }
    session?.user?._id && fetchComment()
  }, [commentId, session?.user?._id])

  const handleLike = async () => {
    try {
      const headers = {
        "Authorization": `Bearer ${session?.user?.accessToken}`
      }

      await api.put(`/comment/like/${commentId}`, headers)

      if (isLikedByCurrentUser) {
        setCommentLikes(prev => prev - 1)
      } else {
        setCommentLikes(prev => prev + 1)
      }

      setIsLikedByCurrentUser(prev => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <div className={classes.imageContainer}>
            <Image src={person} alt="" />
          </div>
          <span className={classes.username}>
            {comment?.userId?.username}
          </span>
          <span className={classes.usernameTwitter}>
            @{comment?.userId?.username}
          </span>
          <span className={classes.commentedAgo}>
            {format(comment?.createdAt)}
          </span>
        </div>
        <p className={classes.desc}>
          {comment?.text}
        </p>
        <div className={classes.action}>
          <Heart
            condition={isLikedByCurrentUser}
            eventHandler={handleLike}
            postLikes={commentLikes}
          />
        </div>
      </div>
    </div>
  )
}

export default Comment