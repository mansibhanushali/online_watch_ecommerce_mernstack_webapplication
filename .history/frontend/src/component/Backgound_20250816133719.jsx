import React from 'react'
import back1 from "../assets/back1.jpg"

function Background() {
  return (
    <img
      src={back1}
      alt="background"
      className="w-[100%] h-[150%] float-left overflow-auto object-cover bg-[url('../assets/back1.jpg')]"
    />
  )
}

export default Background
