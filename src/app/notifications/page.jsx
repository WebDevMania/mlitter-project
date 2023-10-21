"use client"
import { useSession } from 'next-auth/react'
import classes from './notifications.module.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { api } from '@/lib/fetch'
import { fetchCurrentUser } from '@/redux/userSlice'
import Header from '@/components/header/Header'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Notification from '@/components/notification/Notification'
import { useRouter } from 'next/navigation'

const Notifications = () => {
    const router = useRouter()
    const { data: session } = useSession({
        required: true,
        onUnauthenticated(){
            router.push('/login')
        }
    })
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const headers = {
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                }

                const data = await api.get('/notifications', headers)
                dispatch(fetchCurrentUser(session?.user?._id))
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }
        session?.user?._id && fetchNotifications()
    }, [session?.user?._id])
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Header
                    label="Notifications"
                    backArrow={<AiOutlineArrowLeft />}
                />
                {data?.map((notification) => (
                    <Notification
                        key={notification._id}
                        notification={notification}
                    />
                ))}
            </div>
        </div>
    )
}

export default Notifications