import { CDN_URL } from "../utils/constants";

const styleCard = {
    backgroundColor: "#f0f0f0",
  };

const RestaurantCard = (props) => {
    const {resData}=props;
    
    let {cloudinaryImageId,name,avgRating,cuisines,costForTwo,deliveryTime} = resData?.info;
    if(!deliveryTime){
      deliveryTime=resData.info.sla.deliveryTime;
    }
    return (
      <div className="res-card" style={styleCard}>
        <img 
        className="res-logo"
          alt="res-logo"
          src={CDN_URL +cloudinaryImageId}
        />
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} ⭐ | stars</h4>
        <h4>{costForTwo}</h4>
        <h4>{deliveryTime} minutes</h4>
      </div>
    );
  };


  export default RestaurantCard;