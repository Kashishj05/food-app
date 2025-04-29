import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setotp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputref = useRef<any>([]);

  const { loading, verifyEmail } = useUserStore();
  const navigate = useNavigate();
  const handlechange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newotp = [...otp];
      newotp[index] = value;
      setotp(newotp);
    }
    // move to the next input feild if a digit is entered
    if (value !== "" && index < 5) {
      inputref.current[index + 1].focus();
    }
  };

  const handlekeydown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputref.current[index - 1].focus();
    }
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = otp.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h2 className="font-extrabold text-2xl mb-3">Verify your email</h2>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent to ypur email address
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between mt-5">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) => {
                  if (inputref.current) {
                    inputref.current[idx] = element;
                  }
                }}
                type="text"
                maxLength={1}
                value={letter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handlechange(idx, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handlekeydown(idx, e)
                }
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></Input>
            ))}
          </div>
          {loading ? (
            <Button
              disabled
              className="mt-6 w-full bg-[#dd760f] hover:bg-[#d38538]"
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin text-white"></Loader2>
              Please wait
            </Button>
          ) : (
            <Button className="mt-6 w-full text-white bg-[#dd760f] hover:bg-[#d38538]">
              verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
