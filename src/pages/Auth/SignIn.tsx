import { useForm } from "react-hook-form";
import type { SignInFormData } from "../../Interface/Auth";
import Bot from "../../assets/Images/MrBot_Logo.webp";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
import { loginUser } from "../../api/api";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loginLoading } = useSelector((state: RootState) => state.auth);

  const onSubmit = async (data: SignInFormData) => {
    console.log(data, "Data");
    try {
      dispatch(loginStart());
      const response = await loginUser(data);
      console.log(response, "LOGIN RESPONSE");

      // ✅ Extract token + user from API response
      const token = response.access_token;
      // Fixed: Mapped access_token to token as required by User interface
      const user = { 
        ...response.user, 
        access_token: token, 
        token: token, 
        onboard: response.onboard,
        onboarding_completed: response.onboarding_completed 
      };

      dispatch(loginSuccess({ user, token }));

      toast.success(t("authPages.toast.signInSuccess"));

      
      
      if (user.is_admin) {
        navigate("/dashboard");
      } else if (response.onboarding_completed === false) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
      
      reset();
    } catch (err: any) {
      const errorMessage = 
        err.response?.data?.error || 
        err.response?.data?.message || 
        err.message || 
        t("authPages.toast.fallbackError");
        
      toast.error(errorMessage);
      console.error("Login Error:", err);
      dispatch(loginFailure(errorMessage));
    }
  };

  // const handleNavigate = () => {
  //   navigate("/signup");
  // };

  return (
    <div className="min-h-screen bg-[#3d4b52] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="w-30 h-24 mx-auto mb-4 bg-[#3d4b52] rounded-full flex items-center justify-center">
              <img src={Bot} alt={t("authPages.brandAlt")} />
            </div>
            <h1 className="text-3xl font-bold text-[#3d4b52] mb-2">
              {t("authPages.signin.title")}
            </h1>
            <p className="text-gray-600">{t("authPages.signin.subtitle")}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3d4b52] mb-2"
              >
                {t("authPages.fields.email")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: t("authPages.validation.emailRequired"),
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder={t("authPages.placeholders.email")}
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
                {t("authPages.fields.password")}
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: t("authPages.validation.passwordRequired"),
                  minLength: {
                    // value: 8,
                    value: 4,
                    message: t("authPages.validation.passwordMin"),
                  },
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder={t("authPages.placeholders.password")}
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
              disabled={loginLoading}
              className="w-full cursor-pointer bg-[#3d4b52] text-white py-3 rounded-lg font-semibold hover:bg-[#2d3b42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {isSubmitting ? t("authPages.signin.submitting") : t("authPages.signin.submit")}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("authPages.signin.noAccount")}{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#3d4b52] hover:underline cursor-pointer"
              >
                {t("authPages.signin.createAccountCta")}
              </button>
            </p>
          </div>

          <div className="mt-1 text-center">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-[#3d4b52]"
            >
              <span className=" hover:underline cursor-pointer">
                {t("authPages.signin.forgotPassword")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
