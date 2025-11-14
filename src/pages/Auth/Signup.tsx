import { useForm } from "react-hook-form";
import type { SignUpFormData } from "../../Interface/Auth";
import Bot from "../../assets/Images/MrBot_Logo.webp";

import { useNavigate } from "react-router-dom";
import { signupStart, signupFailure, signupSuccess } from "../../store/slices/authSlice"
import { signupUser } from "../../api/api"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const SignUp = () => {

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  const dispatch = useDispatch();
  const { user, signupLoading } = useSelector((state: RootState) => state.auth);
  console.log(user, "user");


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      dispatch(signupStart());
      const response = await signupUser(data);
      // console.log(response, "RESPONSE");
      dispatch(signupSuccess(response));
      toast.success("Sign-up successful! Please Sign in");
      reset();
      navigate("/signin");
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Oops an error occurred");
      dispatch(signupFailure(error.message));

      // console.log("Form data:", data);
      // Handle sign up logic here
    };
  }

  return (
    <div className="min-h-screen bg-[#3d4b52] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="w-30 h-24 mx-auto mb-4 bg-[#3d4b52] rounded-full flex items-center justify-center">
              <img src={Bot} alt="Mr. Bot" />
            </div>

            <h1 className="text-3xl font-bold text-[#3d4b52] mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#3d4b52] mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username can only contain letters, numbers and underscores",
                  },
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3d4b52] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#3d4b52] mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Password must contain uppercase, lowercase and number",
                  },
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={signupLoading}
              className="w-full bg-[#3d4b52] text-white py-3 rounded-lg font-semibold hover:bg-[#2d3b42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              {/* <Link to="/signin" onClick={handleNavigate} className="text-[#3d4b52] hover:underline">
                Signin
              </Link> */}
              <button
                onClick={handleNavigate} className="text-[#3d4b52] hover:underline">
                Signin
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
