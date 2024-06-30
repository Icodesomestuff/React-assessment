import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import React from "react";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});
const ResetPassword = () => {
const [isSignup,setIsSignup] = useState(false)
const navigate = useNavigate()
const {reset , handleSubmit , register ,   formState: { errors },} = useForm({
    resolver : zodResolver(resetSchema)
})

const onSubmit = (data) => {
      console.log("Reset Data:", data);
      alert("Reset passowrd link send to your email");
      reset()
  };

  return (
    <React.Fragment>
      <div className="max-w-[300px] mx-auto mt-10 p-4 border rounded shadow">
      <div className="flex justify-center mb-4 w-full border border-gray-300 rounded-full">
        <button
          className={`w-1/2 p-2 rounded-full ${
            !isSignup ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setIsSignup(false)}
        >
          Reset Password
        </button>
        <button
          className={`w-1/2 p-2 rounded-full ${
            isSignup ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => navigate("/")}
        >
          Sign up/Login
        </button>
      </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register("email")} className="border p-2 rounded w-full" />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
            Reset Password
        </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
