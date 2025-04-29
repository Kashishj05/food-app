import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantformschema,
  RestaurantFormSchema,
} from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantSrore.ts";
import { Loader2 } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";

const Restaurant = () => {
  const [input, setinput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliverytime: 0,
    cuisines: [],
    imagefile: undefined,
  });
  const [errors, seterrors] = useState<Partial<RestaurantFormSchema>>({});
  const {
    loading,
    restaurant,
    createRestaurant,
    updateRestaurant,
    getRestaurant,
  } = useRestaurantStore();
  const changeeventhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setinput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantformschema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      seterrors(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }
    // api implimentation
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliverytime", input.deliverytime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));
      if (input.imagefile) {
        formData.append("imagefile", input.imagefile);
      }
      if (restaurant) {
        // updata
        await updateRestaurant(formData);
      } else {
        // create
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if (restaurant) {
        setinput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliverytime: restaurant.deliverytime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          imagefile: undefined,
        });
      }
    };

    fetchRestaurant();
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant className */}
              <div>
                <Label className="mb-1.5">Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={changeeventhandler}
                  placeholder="Enter your rastaurant name"
                ></Input>
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.restaurantName}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-1.5">City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeeventhandler}
                  placeholder="Enter your city"
                ></Input>
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.city}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-1.5">Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeeventhandler}
                  placeholder="Enter your country"
                ></Input>
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.country}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-1.5">Estimated Delivery Time</Label>
                <Input
                  type="number"
                  name="deliverytime"
                  value={input.deliverytime}
                  onChange={changeeventhandler}
                  placeholder="Enter your delivery time"
                ></Input>
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.deliverytime}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-1.5">Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setinput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder="e.g. Italian, Indian, Chinese"
                ></Input>
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-1.5">Upload Image</Label>
                <Input
                  onChange={(e) =>
                    setinput({
                      ...input,
                      imagefile: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                  name="imagefile"
                  accept="image/*"
                ></Input>
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.imagefile?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button
                  disabled
                  className="bg-[#dd760f] hover:bg-[#d38538] text-white"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>{" "}
                  Please wait
                </Button>
              ) : (
                <Button className="bg-[#dd760f] hover:bg-[#d38538] text-white ">
                  {restaurant
                    ? "Update your Restaurant"
                    : "Add your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Restaurant;
