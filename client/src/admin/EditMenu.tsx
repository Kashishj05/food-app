import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuformSchema, menuschema } from "@/schema/menuschema";
import { useMenuStore } from "@/store/useMenuStore";
import { MenuItem } from "@/types/restaurantType";
import { Loader2 } from "lucide-react";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const EditMenu = ({
  selectedval,
  editopen,
  seteditopen,
}: {
  selectedval: MenuItem;
  editopen: boolean;
  seteditopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setinput] = useState<MenuformSchema>({
    name: "",
    discription: "",
    price: 0,
    image: undefined,
  });

  const { loading, editMenu } = useMenuStore();
  const [error, seterror] = useState<Partial<MenuformSchema>>({});

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
    // api start here
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("discription", input.discription);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await editMenu(selectedval._id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setinput({
      name: selectedval?.name || "",
      discription: selectedval?.description || "",
      price: selectedval?.price || 0,
      image: undefined,
    });
  }, [selectedval]);

  return (
    <Dialog open={editopen} onOpenChange={seteditopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offering fresh and exciting!!
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
            <Label className="mb-2">Description</Label>
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2> Please
                wait
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
  );
};

export default EditMenu;
