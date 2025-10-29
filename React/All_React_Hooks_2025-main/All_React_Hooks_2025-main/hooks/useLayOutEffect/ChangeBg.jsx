import React, { useLayoutEffect, useState } from 'react'

const ChangeBg = () => {

    const [color, setColor] = useState('black')

    useLayoutEffect(() => {
      document.body.style.backgroundColor = color;

    }, [color]) // dependecy array
    

  return (
    <div>
        <h2>Current Background :{color}</h2>
        <button onClick={()=>setColor('red')}>Red</button>
        <button onClick={()=>setColor('green')}>Green</button>
        <button onClick={()=>setColor('blue')}>Blue</button>
    </div>
  )
}

export default ChangeBg