import React from 'react'

const Audio = () => {
    const playaudio = () =>{
       const audio = new Audio("./")
       audio.play()
    }

  return (
    <>
      <button onClick={playaudio}>PLAY</button>
    </>
  )
}

export default Audio
