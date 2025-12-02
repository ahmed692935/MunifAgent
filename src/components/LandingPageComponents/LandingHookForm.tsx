import { useForm } from "react-hook-form";
import type { IFormInput } from "../../Interface/LandingPage";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { contactForm } from "../../api/api";
import toast from "react-hot-toast";
import { useState } from "react";

function LandingHookForm() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const token = useSelector((state: any) => state.auth.token);

  // const onSubmit = (data: IFormInput) => {
  //   console.log("Form Data:", data);
  // };
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IFormInput) => {
    try {
      setLoading(true);
      const body = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        message: data.message,
      };

      const res = await contactForm(token, body);
      toast.success(res.message || "Message sent successfully!");
      reset();
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ---------- First & Last Name ---------- */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* First Name */}
          <div className="w-full relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("form.firstName")}
            </label>
            <input
              {...register("firstName")}
              className="w-full px-3 py-2 border rounded-full border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
              placeholder={t("form.firstName")}
            />
          </div>

          {/* Last Name */}
          <div className="w-full relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("form.lastName")}
            </label>
            <input
              {...register("lastName")}
              className="w-full px-3 py-2 border rounded-full border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
              placeholder={t("form.lastName")}
            />
          </div>
        </div>

        {/* ---------- Email ---------- */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("form.email")} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: t("form.validation.emailRequired"),
              pattern: {
                value: /^\S+@\S+$/i,
                message: t("form.validation.invalidEmail"),
              },
            })}
            className="w-full px-3 py-2 border rounded-full border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
            placeholder={t("form.email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 absolute -bottom-5 pl-4">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ---------- Message / Message ---------- */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("form.message")}
          </label>
          <textarea
            {...register("message")}
            className="w-full px-3 py-2 border rounded-3xl border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
            rows={3}
            placeholder={t("form.messagePlaceholder")}
          ></textarea>
        </div>

        {/* ---------- Submit Button ---------- */}
        {/* <button
          type="submit"
          className="w-full bg-[#3d4b52] hover:bg-[#3d4b52]/80 text-white font-medium py-2 mt-4 px-5 rounded-full transition-all cursor-pointer"
        >
          {t("form.submit")}
        </button> */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-medium py-2 mt-4 px-5 rounded-full transition-all cursor-pointer
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#3d4b52] hover:bg-[#3d4b52]/80"
    }
  `}
        >
          {loading ? t("form.sending") : t("form.submit")}
        </button>
      </form>
    </div>
  );
}

export default LandingHookForm;
