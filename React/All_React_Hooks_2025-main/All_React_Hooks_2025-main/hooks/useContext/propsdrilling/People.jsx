import React from "react";
import MyContext from "../MyContext";
import { useContext } from "react";

const People = () => {
  // console.log("priting the context = ",useContext(MyContext))

  const data = useContext(MyContext);
  // const {money,counter,setCounter} = useContext(MyContext);

  return (
    <div>
      <h1> This is People/Janta Component = {data.money} </h1>
      <h1>Couter = {data.counter}</h1>
      <button onClick = {()=>data.setCounter(data.counter + 1)} >increase</button>
    </div>
  );
};

export default People;
