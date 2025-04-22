import { useEffect, useState } from "react";
import { MENU_API } from "./constants";
import { useState } from "react";


const useRestaurantMenu = (resId) => {
    const [resInfo,setResInfo] = useState(null);
  
    //fetchdata
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData= async () =>{
        const data= await fetch(MENU_API+resId+"&catalog_qa=undefined");
        const json= await data.json();
        setResInfo(json.data);
    }
  
  return resInfo;
};

export default useRestaurantMenu;
