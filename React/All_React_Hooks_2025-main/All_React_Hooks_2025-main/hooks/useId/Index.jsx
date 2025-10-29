import React, { useId } from 'react'


const Index = () => {
    const id = useId();
    const id2 = useId();
  return (
    <div>
        <label htmlFor={id}>
            Name: <input id={id} type="text" />
        </label>
        <label htmlFor={id2}>
            Email: <input id={id2} type="text" />
        </label>
    </div>
  )
}

export default Index