import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Forgetpassword = () => {
  const [email, setemail] = useState<string>("");
  const loading = false;
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col border p-6 gap-5 md:p-8 max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h2 className="font-extrabold text-2xl mb-2">Forgot Password</h2>
          <p className="text-sm text-gray-600">
            Enter your email address to reset your password
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your email"
            className="pl-10"
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"></Mail>
        </div>
        {loading ? (
          <Button
            disabled
            className="text-white bg-[#dd760f] hover:bg-[#d38538]"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please wait
          </Button>
        ) : (
          <Button className="text-white bg-[#dd760f] hover:bg-[#d38538]">
            Send Reset Link
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

export default Forgetpassword;
