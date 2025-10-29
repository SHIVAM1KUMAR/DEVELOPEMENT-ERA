import React from 'react'

const Button = React.memo(({onClick}) => {
    console.log("Button is re-rendered")
  return (
    <div>
        <button onClick={onClick}>Click Me</button>
    </div>
  )
});

export default Button