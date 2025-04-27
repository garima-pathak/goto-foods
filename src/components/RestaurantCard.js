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
      <div className="w-[250px] h-[420px] m-[1rem] p-[1rem] rounded-[0.5rem] bg-[lightgray] hover:bg-[gray]" >
        <img 
        className="w-[15.5rem] h-[10rem] object-cover rounded-[0.5rem]"
          alt="res-logo"
          src={CDN_URL +cloudinaryImageId}
        />
        <h3 className="w-[15.5rem] font-[1000] text-[20px]">{name}</h3>
        <h4 className="w-[15.5rem]">{cuisines.join(", ")}</h4>
        <h4 className="w-[15.5rem]">{avgRating} ⭐ | stars</h4>
        <h4 className="w-[15.5rem]">{costForTwo}</h4>
        <h4 className="w-[15.5rem]">{deliveryTime} minutes</h4>
      </div>
    );
  };


  export default RestaurantCard;