import { useForm } from "react-hook-form";
import type { SignInFormData } from "../../Interface/Auth";
import Bot from "../../assets/Images/MrBot_Logo.webp";
import { Link } from "react-router-dom";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form data:", data);
    // Handle sign in logic here
  };

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
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder="Enter your Email"
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
                    value: 6,
                    message: "Password must be at least 6 characters",
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
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-[#3d4b52] text-white py-3 rounded-lg font-semibold hover:bg-[#2d3b42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link to="/signup" className="text-sm text-[#3d4b52]">
              Not have account? <span className=" hover:underline">Signup</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
