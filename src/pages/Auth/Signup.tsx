import { useForm } from "react-hook-form";
import type { SignUpFormData } from "../../Interface/Auth";
import Bot from "../../assets/Images/MrBot_Logo.webp";

import { useNavigate } from "react-router-dom";
import {
  signupStart,
  signupFailure,
  signupSuccess,
} from "../../store/slices/authSlice";
import { signupUser } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/signin");
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
      toast.success(t("authPages.toast.signUpSuccess"));
      reset();
      navigate("/signin");
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || t("authPages.toast.fallbackError"));
      dispatch(signupFailure(error.message));

      // console.log("Form data:", data);
      // Handle sign up logic here
    }
  };

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
              {t("authPages.signup.title")}
            </h1>
            <p className="text-gray-600">{t("authPages.signup.subtitle")}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#3d4b52] mb-2"
              >
                {t("authPages.fields.username")}
              </label>
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: t("authPages.validation.usernameRequired"),
                  minLength: {
                    value: 3,
                    message: t("authPages.validation.usernameMin"),
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: t("authPages.validation.usernamePattern"),
                  },
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder={t("authPages.placeholders.username")}
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
                {t("authPages.fields.email")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: t("authPages.validation.emailRequired"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("authPages.validation.invalidEmail"),
                  },
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
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: t("authPages.validation.passwordPattern"),
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
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={signupLoading}
              className="w-full bg-[#3d4b52] cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-[#2d3b42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("authPages.signup.submitting") : t("authPages.signup.submit")}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("authPages.signup.haveAccount")}{" "}
              <button
                onClick={handleNavigate}
                className="text-[#3d4b52] hover:underline cursor-pointer"
              >
                {t("authPages.signup.signInCta")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
