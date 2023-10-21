"use client"
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import classes from './heart.module.css'
import React from 'react'

const Heart = ({
  condition,
  eventHandler,
  postLikes
}) => {

  return (
    <>
      {condition ? (
        <AiFillHeart size={25} onClick={eventHandler} />
      ) : (
        <AiOutlineHeart size={25} onClick={eventHandler} />
      )
      }
      <span>
        {postLikes}
      </span>
    </>
  )
}

export default Heart