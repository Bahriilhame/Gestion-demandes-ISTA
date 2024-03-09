import { Link } from "react-router-dom";

function HomeStagiaire() {
    const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    console.log(userData);

  return (
    <div>
      Welcome back {userData.nom} <br />
      <Link onClick={()=>{localStorage.removeItem("user")}} to='/'>Logout</Link>
    </div>
  )
}

export default HomeStagiaire
