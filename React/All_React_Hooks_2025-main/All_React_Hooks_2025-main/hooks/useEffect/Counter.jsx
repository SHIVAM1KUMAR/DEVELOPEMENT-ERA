import React, { useEffect, useState } from "react";

const FetchData = () => {
  const [counter, setcounter] = useState(0);

  useEffect(() => {
    console.log("UseEffect is running...")
    document.title = counter;

  }, [counter]) // dependency array
  

  return (
    <div>
      <h1>Counter = {counter}</h1>
      <button onClick={() => setcounter(counter + 1)}>increase</button>
      <button onClick={() => setcounter(counter - 1)}>decrease</button>
    </div>
  );
};

export default FetchData;
