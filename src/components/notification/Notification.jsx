import { BsBellFill } from 'react-icons/bs'
import classes from './notification.module.css'
import React from 'react'
import { format } from 'timeago.js'

const Notification = ({
  notification
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.text}>
          <span>
            <BsBellFill size={30} className={classes.icon} />
          </span>
          <h3>
            {notification.text}
          </h3>
        </div>
        <span className={classes.createdAt}>
          {format(notification.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default Notification