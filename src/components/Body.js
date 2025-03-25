import RestaurantCard from "./RestaurantCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {

  //Local State Variable - Super powerful variable
  const [listOfRestaurants,setListOfRestaurants] = useState([]);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json= await data.json();

    console.log(json);
    setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }


  let listOfRestaurantsJS = [
    {
      type: "restaurant",
      data: {
        id: "121603",
        name: "Kannur Food Point",
        cloudinaryImageId: "bmwn4n4bn6n1tcpc8x2h",
        cuisines: ["Kerala", "Chinese"],
        costForTwo: 30000,
        deliveryTime: 24,
        avgRating: "3.8",
      },
    },
    {
      type: "restaurant",
      data: {
        id: "121606",
        name: "Dominos",
        cloudinaryImageId: "bmwn4n4bn6n1tcpc8x2h",
        cuisines: ["Kerala", "Chinese"],
        costForTwo: 30000,
        deliveryTime: 24,
        avgRating: "4.5",
      },
    },
    {
      type: "restaurant",
      data: {
        id: "121607",
        name: "MCD",
        cloudinaryImageId: "bmwn4n4bn6n1tcpc8x2h",
        cuisines: ["Kerala", "Chinese"],
        costForTwo: 30000,
        deliveryTime: 24,
        avgRating: "4.1",
      },
    },
  ];


  return listOfRestaurants.length==0? <Shimmer/> : (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.data.avgRating > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
