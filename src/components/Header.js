import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import {Link} from "react-router-dom"
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {


    const [btnNameReact,setBtnNameReact]=useState("Login");
    console.log("Header render");

  const onlineStatus=useOnlineStatus();

    return (
      <div className="flex justify-between bg-[#ffc0cb] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] mb-[0.5rem]">
        <div className="logo-container">
          <img className="w-32 h-full" src={LOGO_URL} />
        </div>
        <div className="flex items-center">
          <ul className="flex list-none p-[1rem] m-[1rem]">
          <li className="px-[1rem]">Online Status: {onlineStatus? "✅" : "🔴" }</li>
            <li className="px-[1rem]"><Link to="/">Home</Link></li>
            <li className="px-[1rem]"><Link to="/about">About Us</Link></li>
            <li className="px-[1rem]"><Link to="/contact">Contact Us</Link></li>
            <li className="px-[1rem]"><Link to="/grocery">Grocery</Link></li>
            <li className="px-[1rem]">Cart</li>
            <button 
              className="login" 
              onClick={()=>{
                btnNameReact=="Login"
                ?setBtnNameReact("Logout")
                :setBtnNameReact("Login");
                }}
            >
              {btnNameReact}
            </button>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;