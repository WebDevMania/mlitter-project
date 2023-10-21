"use client"
import Link from 'next/link'
import classes from './tweetForm.module.css'
import person from '../../app/assets/pexels-justin-shaifer-1222271.jpg'
import { useState } from "react"
import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { api } from '@/lib/fetch'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeedPosts, fetchPostDetails } from '@/redux/postSlice'

const TweetForm = ({
  placeholder,
  postId
}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser)
  const [desc, setDesc] = useState("")
  const { data: session } = useSession()
  const router = useRouter()

  const handleClick = async () => {
    try {
      const headers = {
        "Authorization": `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json"
      }

      const body = {
        userId: session.user._id,
      }

      if (postId) {
        body.postId = postId
        body.text = desc
      } else {
        body.desc = desc
      }

      const makeRequest = async () => {
        if (postId) {
          await api.post('/comment', headers, body)
          dispatch(fetchPostDetails(postId))
        } else {
          await api.post('/post', headers, body)
          dispatch(fetchFeedPosts())
        }
      }

      await makeRequest()
      toast.success("Successfully tweeted!")
      setDesc("")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <Link href='/' className={classes.imageContainer}>
            <Image
              src={person}
              alt="Profile image"
            />
          </Link>
          <input
            type="text"
            placeholder={placeholder}
            value={desc}
            onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className={classes.bottom}>
          <button onClick={handleClick} className={classes.tweetButton}>
            Tweet
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default TweetForm