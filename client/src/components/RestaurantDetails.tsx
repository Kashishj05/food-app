import { Timer } from "lucide-react";
import { Badge } from "./ui/badge";
import Availablemenu from "./Availablemenu";
import { useRestaurantStore } from "@/store/useRestaurantSrore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const RestaurantDetails = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

  useEffect(() => {
    getSingleRestaurant(params.id!);
  }, [params.id]);

  return (
    <div className="max-w-6xl mx-auto my-10 ">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={singleRestaurant?.imageUrl || "Loading..."}
            className="object-cover w-full h-full rounded-lg shadow-lg "
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between ">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              {singleRestaurant?.restaurantName || "Loading..."}
            </h1>
            <div className="flex gap-2 my-2">
              {singleRestaurant?.cuisines.map(
                (cuisine: string, idx: number) => (
                  <Badge key={idx}>{cuisine}</Badge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col my-5 gap-2">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5"></Timer>
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery time:{" "}
                  <span className="text-[#D19254]">
                    {singleRestaurant?.deliverytime || "NA"}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {singleRestaurant?.menus && (
          <Availablemenu menus={singleRestaurant?.menus!}></Availablemenu>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
