import React, { useState } from "react";
import MyContext from "./MyContext";

const MoneyState = (props) => {
  const money = 1000;

  const [counter, setCounter] = useState(10);

  const person = {
    name:'ram',
    age:200,
    email:"ram@gmail.com"
  }

  return (
    <MyContext.Provider value={{ money,person, counter, setCounter }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MoneyState;
