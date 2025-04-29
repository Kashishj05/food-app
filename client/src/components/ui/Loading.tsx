import { Loader } from "lucide-react";
const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-bg-lightgreen to-emerald-900 flex justify-center items-center">
      <Loader className="animate-spin w-16 h-16 text-white"></Loader>
    </div>
  );
};
export default Loading;
