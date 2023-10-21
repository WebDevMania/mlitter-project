import { BiCalendar } from 'react-icons/bi'
import classes from './profileHero.module.css'
import React from 'react'
import { format } from 'timeago.js'

const ProfileHero = ({
  profile,
  followings,
  followers
}) => {
  return (
    <div className={classes.profileData}>
      <h1 className={classes.username}>
        {profile?.username}
      </h1>
      <h4 className={classes.tagUsername}>
        @{profile?.username}
      </h4>
      <span className={classes.bio}>
        {profile?.bio ? profile?.bio : "No bio"}
      </span>
      <span className={classes.profileJoined}>
        <BiCalendar size={22} />
        Joined {format(profile?.createdAt)}
      </span>
      <div className={classes.followData}>
        <div className={classes.following}>
          <span>
            {followings}
            <span>followings</span>
          </span>
        </div>
        <div className={classes.followers}>
          <span>
            {followers}
            <span>followers</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHero