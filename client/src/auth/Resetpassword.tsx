import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Resetpassword = () => {
  const [newpassword, setnewpassword] = useState<string>("");
  const loading = false;
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 border p-6 md:p-8 max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h2 className="font-extrabold text-2xl mb-2">Reset Password</h2>
          <p className="text-sm text-gray-600">Enter your new password</p>
        </div>
        <div className="relative w-full">
          <Input
            type="password"
            value={newpassword}
            onChange={(e) => setnewpassword(e.target.value)}
            placeholder="Enter your new password"
            className="pl-10"
          />
          <LockKeyhole className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"></LockKeyhole>
        </div>
        {loading ? (
          <Button
            disabled
            className="text-white bg-[#dd760f] hover:bg-[#d38538] "
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please wait
          </Button>
        ) : (
          <Button className="text-white bg-[#dd760f] hover:bg-[#d38538]">
            {" "}
            Reset{" "}
          </Button>
        )}
        <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Resetpassword;
