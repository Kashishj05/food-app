import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { useRestaurantStore } from "@/store/useRestaurantSrore";
import { Restaurant } from "@/types/restaurantType";

const SearchProfile = () => {
  const params = useParams();
  const [serachQuery, setSearchQuery] = useState<string>("");
  const {
    loading,
    searchedRestaurant,
    searchRestaurant,
    appliedFilter,
    setAppliedFilter,
  } = useRestaurantStore();

  useEffect(() => {
    searchRestaurant(params.text!, serachQuery, appliedFilter);
  }, [params.text!, appliedFilter, serachQuery]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage></FilterPage>
        <div className="flex-1">
          {/* Search Input Field  */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={serachQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by restaurant and cuisines"
            ></Input>
            <Button
              onClick={() =>
                searchRestaurant(params.text!, serachQuery, appliedFilter)
              }
              className="bg-[#dd760f] text-white hover:bg-[#d38538]"
            >
              Search
            </Button>
          </div>

          {/* SEarched item display her  */}

          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">
                (
                {Array.isArray(searchedRestaurant?.data)
                  ? searchedRestaurant.data.length
                  : 0}
                ) search result found
              </h1>
              <div className="flex gap-2 flex-wrap mb-4 md:mb-0">
                {appliedFilter.map((selectedFilter: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative inline-flex items-center max-w-full"
                  >
                    <Badge
                      className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                      variant="outline"
                    >
                      {selectedFilter}
                    </Badge>
                    <X
                      onClick={() => setAppliedFilter(selectedFilter)}
                      size={16}
                      className="absolute right-1 hover:cursor-pointer  text-[#D19254]"
                    ></X>
                  </div>
                ))}
              </div>
            </div>
            {/* cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {loading ? (
                <SearchPageSkeleton />
              ) : !loading &&
                (!searchedRestaurant?.data ||
                  searchedRestaurant.data.length === 0) ? (
                <NoResultFound searchText={params.text!} />
              ) : (
                searchedRestaurant?.data.map((restaurant: Restaurant) => (
                  <Card
                    key={restaurant._id}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="relative">
                      <AspectRatio ratio={16 / 6}>
                        <img
                          src={restaurant.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white bg-opacity-75 dark:bg-gray-700  rounded-lg  px-3 py-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Features
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h1 className="text-2xl font-bold text-gray-900 text-left dark:text-gray-100 ">
                        {restaurant.restaurantName}
                      </h1>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400 ">
                        <MapPin size={16}></MapPin>
                        <p className="text-sm">
                          City:{" "}
                          <span className="font-medium">{restaurant.city}</span>
                        </p>
                      </div>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400 ">
                        <Globe size={16} />
                        <p className="text-sm">
                          Country:{" "}
                          <span className="font-medium">
                            {restaurant.country}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {restaurant?.cuisines.map(
                          (cuisine: string, idx: number) => (
                            <Badge
                              key={idx}
                              className="font-medium px-3 py-1 rounded-full shadow-sm "
                            >
                              {cuisine}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-2 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end ">
                      <Link to={`/restaurant/${restaurant._id}`}>
                        <Button className="bg-[#dd760f] text-black hover:bg-[#d38538] font-semibold py-2 px-5 rounded-full shadow-md transition-colors duration-200">
                          view menu
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchProfile;

const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
          <CardFooter className="p-4  dark:bg-gray-900 flex justify-end">
            <Skeleton className="h-10 w-24 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};
