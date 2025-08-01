import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import { CheckoutSessionRequest } from "@/types/orderType";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantSrore";
import { useOrderStore } from "@/store/useOrderStore";
import { Loader2 } from "lucide-react";

const CheckoutconfirmPge = ({
  open,
  setopen,
}: {
  open: boolean;
  setopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const [input, setinput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { createCheckOutSession, loading } = useOrderStore();
  const changeeventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const checkouthandler = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    //api implimentation start from here
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: input,
        restaurantId: restaurant?._id as string,
      };
      await createCheckOutSession(checkoutData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <DialogTitle className="font-bold">Review your order</DialogTitle>
        <DialogDescription className="text-sm">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order
        </DialogDescription>
        <form
          onSubmit={checkouthandler}
          className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
        >
          <div>
            <Label className="mb-2">Fullname</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeeventHandler}
            ></Input>
          </div>
          <div>
            <Label className="mb-2">Email</Label>
            <Input
              disabled
              type="email"
              name="email"
              value={input.email}
              onChange={changeeventHandler}
            ></Input>
          </div>
          <div>
            <Label className="mb-2">Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeeventHandler}
            ></Input>
          </div>
          <div>
            <Label className="mb-2">Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeeventHandler}
            ></Input>
          </div>
          <div>
            <Label className="mb-2">City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeeventHandler}
            ></Input>
          </div>
          <div>
            <Label className="mb-2">Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeeventHandler}
            ></Input>
          </div>
          <DialogFooter
            className="col-span-2
      pt-5"
          >
            {loading ? (
              <Button
                disabled
                className="text-white bg-[#dd760f] hover:bg-[#d38538]"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                Please wait
              </Button>
            ) : (
              <Button className="text-white bg-[#dd760f] hover:bg-[#d38538]">
                Continue To Payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CheckoutconfirmPge;
