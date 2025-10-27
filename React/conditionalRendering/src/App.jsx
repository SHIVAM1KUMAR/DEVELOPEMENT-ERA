import UserGreet from "./userGreet.jsx";

function App() {
  

  return (
    <>
    <userGreet/>
     <UserGreet isAdmin={true} />
      <UserGreet isAdmin={false} />
    </>
  )
}

export default App
