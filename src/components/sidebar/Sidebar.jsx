import classes from './sidebar.module.css'
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { IoIosNotifications } from 'react-icons/io'
import { BiLogOut, BiSolidUser } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'
import React from 'react'
import Link from 'next/link'
import SidebarItem from '../sidebarItem/SidebarItem'

const Sidebar = () => {
  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      label: "Home"
    },
    {
      icon: <IoIosNotifications size={25} />,
      label: "Notifications"
    },
    {
      icon: <BiSolidUser size={25} />,
      label: "Profile"
    },
    {
      icon: <BiLogOut size={25} />,
      label: "Logout"
    },
    {
      icon: <AiOutlineLogin size={25} />,
      label: "Sign in"
    },
  ]

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link href='/' className={classes.logo}>
          <BsTwitter size={30} />
        </Link>
        {sidebarItems.map((item) => (
          <SidebarItem 
            key={item.label}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar