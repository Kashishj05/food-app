import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import Heroimage from "../assets/hero_pizza.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setsearchtext] = useState<string>("");
  const naviagte = useNavigate();
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:pd-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold md:font-extrabold  md:text-5xl text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our Delicous food is waiting for you, we are always near to
            you.
          </p>
        </div>
        <div className="relative flex items-center gap-2 ">
          <Input
            type="text"
            value={searchText}
            placeholder="search restraurant by name , city and country...."
            onChange={(e) => setsearchtext(e.target.value)}
            className="pl-10 shadow-lg"
          />
          <Search className="text-gray-500 absolute inset-y-2 left-2" />
          <Button
            onClick={() => naviagte(`/search/${searchText}`)}
            className="bg-[#dd760f] hover:bg-[#d38538]"
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <img src={Heroimage} className="object-cover w-full max-h-[500px]" />
      </div>
    </div>
  );
};

export default HeroSection;
