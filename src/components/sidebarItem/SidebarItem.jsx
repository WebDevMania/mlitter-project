"use client"
import { signOut, useSession } from 'next-auth/react'
import classes from './sidebarItem.module.css'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { BsDot } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from '@/redux/userSlice'

const SidebarItem = ({
  item
}) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const router = useRouter()
  const isSignInItem = item.label === "Sign in"
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    if (session?.user?._id) {
      const userId = session?.user?._id
      dispatch(fetchCurrentUser(userId))
    }
  }, [session?.user?._id])

  if (session?.user?._id && isSignInItem) {
    return null
  }

  const goToPage = () => {
    if (item.label === "Notifications") {
      router.push('/notifications')
    }
    if (item.label === "Profile") {
      router.push(`/profile/${session?.user?._id}`)
    }

    if (item.label === 'Logout') {
      signOut()
    }
  }

  return (
    <div className={classes.container} onClick={goToPage}>
      <div className={classes.wrapper}>
        <div className={classes.icon}>
          {currentUser?.hasNotifications && item.label === "Notifications" && (
            <BsDot size={60} className={classes.dot} />
          )}
          {item.icon}
        </div>
        <div className={classes.label}>
          {item.label}
        </div>
      </div>
    </div>
  )
}

export default SidebarItem