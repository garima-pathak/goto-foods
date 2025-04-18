import { data } from "browserslist";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    const {resId} = useParams();

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(MENU_API+resId+"&catalog_qa=undefined");

        const json = await data.json();
        console.log(json)
        setResInfo(json.data);
    };

    const {name,cuisines,costForTwoMessage} =resInfo?.cards[2]?.card?.card?.info || {};

    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || {};
    console.log(itemCards);
    
    return resInfo == null ? (
        <Shimmer />
    ) : (
        <div className="menu">
            <h1>{name}</h1>
            <p>
                {cuisines} - {costForTwoMessage}

            </p>
            
            <h2>Menu</h2>
            <ul>
                {itemCards?.map(item => (
                    <li key={item.card.info.id}>{item.card.info.name} - {"Rs."}
                    {item.card.info.defaultPrice /100 || item.card.info.price /100 }</li>
                ))|| []}
            </ul>
        </div>
    );
};

export default RestaurantMenu;