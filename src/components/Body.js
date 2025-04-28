import RestaurantCard,{withPromotedLabel} from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  //Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant,setFilteredRestaurant] =useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);


  useEffect(() => {
    fetchData();
  }, []);

  console.log("Body Rendered",listOfRestaurants);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5636272&lng=77.3725608&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    console.log(json);
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus=useOnlineStatus();
  if(onlineStatus==false) 
    return (
    <h1>
      Loos like you're offline!! Please check your internet connection
    </h1>
    );

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

  return !listOfRestaurants || listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-[1rem] p-[1rem]">
          <input
            type="text"
            className="border border-[black]"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="border-[0] px-[1rem] py-[0.5rem] bg-[#b9ffd4] m-[1rem] rounded-[0.5rem]"
            onClick={() => {
              //Filter the restaurant cards and update the UI
              //searchText
              console.log(searchText);
              const filteredRestaurant = listOfRestaurants.filter((res) => {
                console.log("res");
                console.log(res);
               return res.info.name.toLowerCase().includes(searchText.toLowerCase())
              });
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-[1rem] p-[1rem] flex items-center">
        <button
          className="border-[0] px-[1rem] py-[0.5rem] bg-[#f1f1f1] rounded-[0.5rem]"
          onClick={() => {
            console.log(listOfRestaurants);
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
        </div>
        
      </div>
      <div className="flex flex-wrap">
        {(filteredRestaurant.length > 0 ? filteredRestaurant : listOfRestaurants).map((restaurant) => (
          <Link key={restaurant?.info?.id} to={"/restaurants/"+restaurant?.info?.id}>
            
            {/**if the restaurant is promoted then add a promoted label to it */
            restaurant.info.promoted? <RestaurantCardPromoted resData={restaurant} /> : <RestaurantCard resData={restaurant} />
            }
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
