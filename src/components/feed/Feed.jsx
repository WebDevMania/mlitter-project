"use client"
import { api } from '@/lib/fetch'
import Post from '../post/Post'
import classes from './feed.module.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeedPosts } from '@/redux/postSlice'
import { useSession } from 'next-auth/react'

const Feed = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post.feed)

  useEffect(() => {
    dispatch(fetchFeedPosts())
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {posts?.map((post) => (
          <Post
            key={post._id}
            post={post}
            postLikes={post?.likes?.length}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed