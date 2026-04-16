import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Bot from "../../assets/Images/MrBot_Logo.webp";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { AxiosError } from "axios";
import { resetPasswordAPI } from "../../api/api";
import { useTranslation } from "react-i18next";

interface ResetPasswordForm {
  new_password: string;
  confirm_password: string;
}

const ResetPassword = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenToastShown = useRef(false);

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token && !tokenToastShown.current) {
      tokenToastShown.current = true;
      toast.error(t("authPages.toast.invalidResetToken"));
    }
  }, [token, t]);

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) return;

    try {
      const payload = {
        new_password: data.new_password,
        token,
      };

      const response = await resetPasswordAPI(payload);

      toast.success(
        response?.message || t("authPages.toast.passwordResetSuccess")
      );

      navigate("/signin");
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(
        error?.response?.data?.error || t("authPages.toast.passwordResetFailed")
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#3d4b52] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-30 h-24 mx-auto mb-4 bg-[#3d4b52] rounded-full flex items-center justify-center">
              <img src={Bot} alt={t("authPages.brandAlt")} />
            </div>
            <h1 className="text-3xl font-bold text-[#3d4b52] mb-2">
              {t("authPages.resetPassword.title")}
            </h1>
            <p className="text-gray-600">{t("authPages.resetPassword.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-[#3d4b52] mb-2"
              >
                {t("authPages.resetPassword.newPasswordLabel")}
              </label>
              <input
                id="new_password"
                type="password"
                {...register("new_password", {
                  required: t("authPages.resetPassword.validation.newRequired"),
                  minLength: {
                    value: 6,
                    message: t("authPages.resetPassword.validation.newMin"),
                  },
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg
                focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder={t("authPages.resetPassword.placeholders.new")}
              />
              {errors.new_password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-[#3d4b52] mb-2"
              >
                {t("authPages.resetPassword.confirmPasswordLabel")}
              </label>
              <input
                id="confirm_password"
                type="password"
                {...register("confirm_password", {
                  required: t(
                    "authPages.resetPassword.validation.confirmRequired"
                  ),
                  validate: (value) =>
                    value === watch("new_password") ||
                    t("authPages.resetPassword.validation.mismatch"),
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                focus:outline-none focus:border-[#3d4b52] transition-colors"
                placeholder={t("authPages.resetPassword.placeholders.confirm")}
              />
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-[#3d4b52] text-white py-3 rounded-lg 
              font-semibold hover:bg-[#2d3b42] transition-colors disabled:opacity-50"
            >
              {isSubmitting
                ? t("authPages.resetPassword.submitting")
                : t("authPages.resetPassword.submit")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/signin")}
              className="text-sm text-[#3d4b52] hover:underline cursor-pointer"
            >
              {t("authPages.resetPassword.backToSignIn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
