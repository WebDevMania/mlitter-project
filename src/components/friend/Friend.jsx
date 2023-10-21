import Image from 'next/image'
import classes from './friend.module.css'
import Link from 'next/link'
import person from '../../app/assets/pexels-justin-shaifer-1222271.jpg'
import React from 'react'

const Friend = ({
  friend
}) => {
  return (
    <Link href={`/profile/${friend._id}`} className={classes.user}>
      <Image src={friend.image ? friend.image : person} alt="Friend's image" />
      <div className={classes.userData}>
        <h4>{friend.username}</h4>
        <span className={classes.usernameTwitter}>
          @{friend.username}
        </span>
      </div>
    </Link>
  )
}

export default Friend