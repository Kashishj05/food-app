import { useRestaurantStore } from "@/store/useRestaurantSrore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
export type Fileroptionsstate = {
  id: string;
  label: string;
};

const filteroptions: Fileroptionsstate[] = [
  {
    id: "burger",
    label: "burger",
  },
  {
    id: "thali",
    label: "thali",
  },
  {
    id: "pulao",
    label: "pulao",
  },
  {
    id: "pizza",
    label: "pizza",
  },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } =
    useRestaurantStore();
  const applidefilterhandler = (value: string) => {
    setAppliedFilter(value);
  };

  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button
          onClick={resetAppliedFilter}
          className="bg-[#dd760f] hover:bg-[#d38538]"
        >
          Reset
        </Button>
      </div>
      {filteroptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            id={option.id}
            checked={appliedFilter.includes(option.label)}
            onClick={() => applidefilterhandler(option.label)}
          ></Checkbox>
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};
export default FilterPage;
