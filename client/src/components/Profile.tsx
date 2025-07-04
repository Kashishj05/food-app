import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const Profile = () => {
  const { user, updateProfile } = useUserStore();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [profiledata, setprofiledata] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });

  const imageref = useRef<HTMLInputElement | null>(null);
  const [selectedprofilepic, setSelectedprofilepic] = useState<string>(
    profiledata.profilePicture || ""
  );

  const filechangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedprofilepic(result);
        setprofiledata((preData) => ({
          ...preData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setprofiledata({ ...profiledata, [name]: value });
  };

  const updateprofilehandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // api implementation update profile start
    try {
      setisLoading(true);
      await updateProfile(profiledata);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };

  return (
    <form onSubmit={updateprofilehandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage
              src={selectedprofilepic}
              className="w-full h-full object-cover object-center rounded-full"
            ></AvatarImage>
            <AvatarFallback></AvatarFallback>
            <input
              ref={imageref}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={filechangehandler}
            />
            <div
              onClick={() => imageref.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8"></Plus>
            </div>
          </Avatar>
          <div className="md:w-190 md:h-10">
            <Input
              type="text"
              name="fullname"
              value={profiledata.fullname}
              onChange={changehandler}
              className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label className="dark:text-black">Email</Label>
            <input
              disabled
              name="email"
              value={profiledata.email}
              onChange={changehandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            ></input>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label className="dark:text-black">Address</Label>
            <input
              name="address"
              value={profiledata.address}
              onChange={changehandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            ></input>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label className="dark:text-black">City</Label>
            <input
              name="city"
              value={profiledata.city}
              onChange={changehandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            ></input>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label className="dark:text-black">Country</Label>
            <input
              name="country"
              value={profiledata.country}
              onChange={changehandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            ></input>
          </div>
        </div>
      </div>
      <div className="text-center">
        {isLoading ? (
          <Button
            disabled
            className="bg-[#dd760f] hover:bg-[#d38538] text-white"
          >
            <Loader2 className="mr-2 w-4 h-4 animate-spin text-white" />
            Please wait
          </Button>
        ) : (
          <Button className="bg-[#dd760f] hover:bg-[#d38538] text-white">
            Update
          </Button>
        )}
      </div>
    </form>
  );
};
export default Profile;
