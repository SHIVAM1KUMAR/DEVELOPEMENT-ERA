import React, { useState } from "react";

const Counter = () => {

  
  // let counter = 0;

    const [counter, setCounter] = useState(0);

    const [salary, setsalary] = useState(1000000)

    const [alpha, setalpha] = useState('a')

    const [number, setnumber] = useState([10,20,30])


  const increase = () => {

    setCounter(counter+1)

    // setsalary("superman salary")
    // setalpha(100)

    // counter++;
    console.log("counter increase = ", counter);
  };

  const decrease = () => {
    setCounter(counter-1)
    // counter--;
    console.log("counter decrease = ", counter);
  };
  return (
    <div>
      <h2>character = {alpha}</h2>
      <h2>salary = {salary}</h2>
      <h1>{counter}</h1>
      <button onClick={increase}>increase by 1</button>
      <button onClick={decrease}>decrease by 1</button>
    </div>
  );
};

export default Counter;
