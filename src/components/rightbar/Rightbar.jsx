"use client"
import Friend from '../friend/Friend'
import classes from './rightbar.module.css'
import person from '../../app/assets/pexels-justin-shaifer-1222271.jpg'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuggestedFollowings } from '@/redux/userSlice'

const Rightbar = () => {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const suggestedFollowings = useSelector((state) => state.user.suggestedFollowings)

  useEffect(() => {
    const fetchSuggestedProfiles = async () => {
      try {
        const headers = {
          "Authorization": `Bearer ${session?.user?.accessToken}`
        }

        dispatch(fetchSuggestedFollowings(headers))
      } catch (error) {
        console.log(error)
      }
    }
    session?.user?.accessToken && fetchSuggestedProfiles()
  }, [session?.user?.accessToken])

  console.log(suggestedFollowings)
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Find your new friends</h2>
        {suggestedFollowings?.map((friend) => (
          <Friend
            key={friend.username}
            friend={friend}
          />
        ))}
      </div>
    </div>
  )
}

export default Rightbar