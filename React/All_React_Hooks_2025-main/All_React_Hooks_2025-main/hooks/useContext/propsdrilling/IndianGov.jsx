import React from 'react'
import StateGov from './StateGov';

const IndianGov = () => {
    const money = 500;
    const dollar = 5000;

  return (
    <div>
      <h1> This is IndianGov Component</h1>
      <StateGov money={money} dollar={dollar} />
    </div>
  );
}

export default IndianGov