import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const signupSchema = z
  .object({
    firstName: z.string().min(1, "Please enter a valid first name."),
    lastName: z.string().min(1, "Please enter a valid last name."),
    email: z.string().email(1, "Please enter a valid email."),
    address: z.string().min(1, "Please enter a valid address."),
    country: z.string().min(1, "Please select your country."),
    state: z.string().min(1, "Please select your state."),
    city: z.string().min(1, "Please select your city."),
    pincode: z.string().length(6, "Please enter a valid pincode."),
    mobileNumber: z
      .string()
      .min(10, "Please enter a valid mobile number.")
      .max(15, "Please enter a valid mobile number.")
      .regex(/[0-9]/, "Must contain at least one number."),
    fax: z.string().optional(),
    password: z
      .string()
      .min(8, "Must contain at least 8 characters.")
      .regex(/[a-z]/, "Must contain at least one lowercase letter.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Must contain at least one number."),
    confirmPassword: z.string().min(8, "Must contain at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(8, "Please enter your password."),
});

const SignupForm = () => {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
  });

  const onSubmit = (data) => {
    if (isSignup) {
  //  No Api so handling data using state 
      console.log("Signup Data:", data);
      alert("Signup successful! Redirecting to login...");
      reset()
      setTimeout(() => setIsSignup(false), 1000); // navigating to login 
      
    } else {
      // No Api to store data in db so handling data using state
      console.log("Login Data:", data);
      alert("Login successful! Redirecting to home...");
      reset()
      setTimeout(() => navigate("/products"), 1000); // navigating to product listing
    }
  };

  return (
    <div className="max-w-[800px] mx-auto mt-10 p-4 border rounded shadow">
      <div className="flex justify-center mb-4 w-full border border-gray-300 rounded-full">
        <button
          className={`w-1/2 p-2 rounded-full ${
            !isSignup ? "bg-green-500 text-white" : ""
          }`}
          onClick={() => setIsSignup(false)}
        >
          LOGIN
        </button>
        <button
          className={`w-1/2 p-2 rounded-full ${
            isSignup ? "bg-green-500 text-white" : ""
          }`}
          onClick={() => setIsSignup(true)}
        >
          SIGNUP
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isSignup && (
          <>
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium">First Name</label>
                <input
                  {...register("firstName")}
                  className="border p-2 rounded w-full"
                />
                {errors.firstName && (
                  <span className="text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  {...register("lastName")}
                  className="border p-2 rounded w-full"
                />
                {errors.lastName && (
                  <span className="text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                {...register("address")}
                className="border p-2 rounded w-full"
              />
              {errors.address && (
                <span className="text-red-500">{errors.address.message}</span>
              )}
            </div>
            <div className="grid grid-cols-2 w-full gap-2">
              <div>
                <label className="block text-sm font-medium">Country</label>
                <input
                  {...register("country")}
                  className="border p-2 rounded w-full"
                />
                {errors.country && (
                  <span className="text-red-500">{errors.country.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">State</label>
                <input
                  {...register("state")}
                  className="border p-2 rounded w-full"
                />
                {errors.state && (
                  <span className="text-red-500">{errors.state.message}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-2">
              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  {...register("city")}
                  className="border p-2 rounded w-full"
                />
                {errors.city && (
                  <span className="text-red-500">{errors.city.message}</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Pincode</label>
                <input
                  {...register("pincode")}
                  className="border p-2 rounded w-full"
                />
                {errors.pincode && (
                  <span className="text-red-500">{errors.pincode.message}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-2">
              <div>
                <label className="block text-sm font-medium">
                  Mobile Number
                </label>
                <input
                  {...register("mobileNumber")}
                  className="border p-2 rounded w-full"
                />
                {errors.mobileNumber && (
                  <span className="text-red-500">
                    {errors.mobileNumber.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Fax</label>
                <input
                  {...register("fax")}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register("email")} className="border p-2 rounded w-full" />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="border p-2 rounded w-full"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        {isSignup && (
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="border p-2 rounded w-full"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        )}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
