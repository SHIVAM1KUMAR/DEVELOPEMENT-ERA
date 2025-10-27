

function userGreet(props){
    let message;
     if (props.isAdmin) {
    message = <h1>Welcome Admin</h1>;
  } else {
    message = <h1>Access Denied</h1>;
  }
  return (
    <>
   {message}
    </>
  )
}

export default userGreet
