"use client"
import Header from '@/components/header/Header'
import classes from './postDetails.module.css'
import React, { useEffect } from 'react'
import Post from '@/components/post/Post'
import TweetForm from '@/components/tweetForm/TweetForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostDetails } from '@/redux/postSlice'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Comment from '@/components/comment/Comment'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const PostDetails = (ctx) => {
  const id = ctx?.params?.id
  const dispatch = useDispatch()
  const post = useSelector((state) => state.post.postDetails)
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated(){
        router.push('/login')
    }
})

  useEffect(() => {
    dispatch(fetchPostDetails(id))
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Header
          label="Tweet"
          backArrow={<AiOutlineArrowLeft />}
        />
        {post && (
          <Post
            post={post}
            postLikes={post?.likes?.length}
          />
        )}
        <TweetForm
          placeholder="Tweet your reply"
          postId={id}
        />
        {post?.comments?.map((commentId) => (
          <Comment
            key={commentId}
            commentId={commentId}
          />
        ))}
      </div>
    </div>
  )
}

export default PostDetails