//Props is a  properties which share only between component ,parent component shared data to child component

import Student from "./Student"


function App() {
 

  return (
    <>
     <Student name="Shivam" age="4545"isStudent={true}/>
     <Student name="Shivam" age={23}  isStudent={true}/>
     <Student name="Shivam" age={23}  isStudent={true}/>
     <Student name="Shivam" age={23}  isStudent={true}/>
     <Student/>
    </>
  )
}

export default App
