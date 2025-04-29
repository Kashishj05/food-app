import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutconfirmPge from "./CheckoutconfirmPge";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cartType.ts";

const Cart = () => {
  const [open, setopen] = useState<boolean>(false);
  const {
    cart,
    clearCart,
    removeFromCart,
    decrementQuantity,
    incrementQuantity,
  } = useCartStore();
  let totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button
          onClick={() => clearCart()}
          className="bg-[#dd760f] hover:bg-[#d38538]"
        >
          Clear All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image}></AvatarImage>
                  <AvatarFallback>cn</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    size={"icon"}
                    className="rounded-full bg-gray-200"
                    variant={"outline"}
                  >
                    <Minus className="text-black"></Minus>
                  </Button>
                  <Button
                    disabled
                    size={"icon"}
                    className=" font-bold border-none"
                    variant={"outline"}
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    size={"icon"}
                    className="rounded-full bg-[#dd760f] hover:bg-[#d38538]"
                    variant={"outline"}
                  >
                    <Plus></Plus>
                  </Button>
                </div>
              </TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <Button
                  size={"sm"}
                  onClick={() => removeFromCart(item._id)}
                  className="bg-[#dd760f] hover:bg-[#d38538] text-white "
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setopen(true)}
          className="bg-[#dd760f] hover:bg-[#d38538] text-white "
        >
          Proceed to Checkout
        </Button>
      </div>
      <CheckoutconfirmPge open={open} setopen={setopen}></CheckoutconfirmPge>
    </div>
  );
};
export default Cart;
