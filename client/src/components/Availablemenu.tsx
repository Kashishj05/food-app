import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { MenuItem } from "@/types/restaurantType";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";

const Availablemenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6 ">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 md:space-y-8 space-y-4 ">
        {menus.map((menu: MenuItem) => (
          // <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden ">
          <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col h-[420px] w-[420px]">
            <div>
              <img
                src={menu.image}
                alt=""
                className="h-48 w-full object-cover"
              />
            </div>
            <CardContent className="p-3">
              <h1 className="text-2xl m-auto font-bold text-gray-900 text-left dark:text-gray-100 ">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-3 ">
                Price: <span className="text-[#D19254] ">₹{menu.price}</span>
              </h3>
            </CardContent>
            <CardFooter className="p-3">
              <Button
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className=" w-full bg-[#dd760f] h-12 hover:bg-[#d38538]  "
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Availablemenu;
2;
