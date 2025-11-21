import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Bot from "../../assets/Images/MrBot_Logo.webp";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

// ❗ Replace this with your actual API call
import { sendResetLink } from "../../api/api";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      const response = await sendResetLink(data.email);
      toast.success(
        response?.message ||
          "A password reset link has been sent to your email!"
      );
      navigate("/signin");
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen bg-[#3d4b52] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="w-30 h-24 mx-auto mb-4 bg-[#3d4b52] rounded-full flex items-center justify-center">
              <img src={Bot} alt="Mr. Bot" />
            </div>
            <h1 className="text-3xl font-bold text-[#3d4b52] mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-600">
              Enter your email and we’ll send your password
            </p>
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder="Enter your Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-[#3d4b52] text-white py-3 rounded-lg 
              font-semibold hover:bg-[#2d3b42] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Password"}
            </button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/signin")}
              className="text-sm text-[#3d4b52] hover:underline cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
