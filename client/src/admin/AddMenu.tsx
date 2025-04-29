import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@radix-ui/react-dialog";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuformSchema, menuschema } from "@/schema/menuschema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantSrore";

const Addmenu = () => {
  const [input, setinput] = useState<MenuformSchema>({
    name: "",
    discription: "",
    price: 0,
    image: undefined,
  });

  const [open, setopen] = useState<boolean>(false);
  const [selectedval, setselectedval] = useState<any>();
  const [error, seterror] = useState<Partial<MenuformSchema>>({});
  const [editopen, seteditopen] = useState<boolean>(false);
  const { loading, createMenu } = useMenuStore();
  const { restaurant } = useRestaurantStore();

  const changeeventhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setinput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuschema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      seterror(fieldErrors as Partial<MenuformSchema>);
      return;
    }
    // api implementation
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("discription", input.discription);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await createMenu(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setopen}>
          <DialogTrigger>
            <Button className="bg-[#dd760f] hover:bg-[#d38538] text-white">
              <Plus></Plus> Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Menu</DialogTitle>
              <DialogDescription>
                Create menu that will makes your restaurant stand out.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={submitHandler}>
              <div className="mt-2">
                <Label className="mb-2">Name</Label>
                <Input
                  type="text"
                  placeholder="Enter menu name"
                  name="name"
                  value={input.name}
                  onChange={changeeventhandler}
                ></Input>
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.name}
                  </span>
                )}
              </div>
              <div className="mt-2.5">
                <Label className="mb-2">Discription</Label>
                <Input
                  type="text"
                  placeholder="Enter menu discription"
                  name="discription"
                  value={input.discription}
                  onChange={changeeventhandler}
                ></Input>
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.discription}
                  </span>
                )}
              </div>
              <div className="mt-2.5">
                <Label className="mb-2">Price in (Rupees)</Label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={input.price}
                  onChange={changeeventhandler}
                ></Input>
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.price}
                  </span>
                )}
              </div>
              <div className="mt-2.5">
                <Label className="mb-2">Upload Menu Image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setinput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                ></Input>
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.image?.name}
                  </span>
                )}
              </div>

              <DialogFooter className="mt-5">
                {loading ? (
                  <Button
                    disabled
                    className="bg-[#dd760f] hover:bg-[#d38538] text-white mt-5"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>{" "}
                    Please wait
                  </Button>
                ) : (
                  <Button className="bg-[#dd760f] hover:bg-[#d38538] text-white mt-5">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {restaurant?.menus.map((menu: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          {/* menu aayege sare */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt=""
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1 dark:text-white">
                {menu.discription}
              </p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">{menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setselectedval(menu);
                seteditopen(true);
              }}
              size={"sm"}
              className="bg-[#dd760f] hover:bg-[#d38538] text-white mt-2"
            >
              Edit
            </Button>
            {/* delete menu k liye */}
          </div>
        </div>
      ))}

      <EditMenu
        selectedval={selectedval}
        editopen={editopen}
        seteditopen={seteditopen}
      />
    </div>
  );
};
export default Addmenu;
