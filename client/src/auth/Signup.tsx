import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, Mail, PhoneCall, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Signupinputstate, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

const Signup = () => {
  const [input, setinput] = useState<Signupinputstate>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const [error, seterror] = useState<Partial<Signupinputstate>>({});
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();
  const ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const loginsubmithandler = async (e: FormEvent) => {
    e.preventDefault();
    // form validation start
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const feildErrors = result.error.formErrors.fieldErrors;
      seterror(feildErrors as Partial<Signupinputstate>);
      return;
    }
    // api implementation start here
    try {
      await signup(input);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={loginsubmithandler}
        className="p-6 md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 bg-white shadow-md"
      >
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl md:text-3xl text-gray-800">Eat</h1>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="fullname"
              name="fullname"
              value={input.fullname}
              onChange={ChangeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {error && (
              <span className="text-xm text-red-500">{error.fullname}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={ChangeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {error && (
              <span className="text-xm text-red-500">{error.email}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={ChangeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {error && (
              <span className="text-xm text-red-500">{error.password}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="contact"
              name="contact"
              value={input.contact}
              onChange={ChangeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneCall className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {error && (
              <span className="text-xm text-red-500">{error.contact}</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          {loading ? (
            <Button
              disabled
              className="text-white w-full bg-[#dd760f] hover:bg-[#d38538]"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="text-white w-full bg-[#dd760f] hover:bg-[#d38538]"
            >
              Signup
            </Button>
          )}
        </div>

        <hr className="border-t border-gray-300 my-4" />

        <p className="mt-2 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
