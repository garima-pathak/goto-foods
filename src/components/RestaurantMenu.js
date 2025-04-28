import { data } from "browserslist";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu"

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card || {};


  const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    c=>
      c.card?.card?.["@type"]==
    "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" || 
    c.card?.card?.["@type"]==
    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  console.log(categories);

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines} - {costForTwoMessage}
      </p>

      <h2>Menu</h2>
      <ul>
        {itemCards?.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - {"Rs."}
            {item.card.info.defaultPrice / 100 || item.card.info.price / 100}
          </li>
        )) || []}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
