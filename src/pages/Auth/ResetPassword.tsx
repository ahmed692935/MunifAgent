import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Bot from "../../assets/Images/MrBot_Logo.webp";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { AxiosError } from "axios";
import { resetPasswordAPI } from "../../api/api";

interface ResetPasswordForm {
  new_password: string;
  confirm_password: string;
}

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract token from URL
  const token = searchParams.get("token");

  if (!token) {
    toast.error("Invalid or missing token");
  }

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) return;

    try {
      const payload = {
        new_password: data.new_password,
        token,
      };

      const response = await resetPasswordAPI(payload);

      toast.success(
        response?.message || "Password reset successfully! Please sign in."
      );

      navigate("/signin");
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to reset password");
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
              Reset Password
            </h1>
            <p className="text-gray-600">Set your new password</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password */}
            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-[#3d4b52] mb-2"
              >
                New Password
              </label>
              <input
                id="new_password"
                type="password"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg
                focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder="Enter new password"
              />
              {errors.new_password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-[#3d4b52] mb-2"
              >
                Confirm New Password
              </label>
              <input
                id="confirm_password"
                type="password"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("new_password") || "Passwords do not match",
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder="Re-enter new password"
              />
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-[#3d4b52] text-white py-3 rounded-lg 
              font-semibold hover:bg-[#2d3b42] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
