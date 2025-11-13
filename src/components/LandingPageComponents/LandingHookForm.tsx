import { useForm } from "react-hook-form";
import type { IFormInput } from "../../Interface/LandingPage";
import { useTranslation } from "react-i18next";

function LandingHookForm() {

    // Add Translate
    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="w-full">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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

                {/* Email */}
                <div className=" relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("form.email")} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        {...register("email", {
                            required: t("form.validation.emailRequired"),
                            pattern: { value: /^\S+@\S+$/i, message: t("form.validation.invalidEmail") },
                        })}
                        className="w-full px-3 py-2 border rounded-full border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
                        placeholder={t("form.email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1 absolute -bottom-5 pl-4">{errors.email.message}</p>
                    )}
                </div>

                {/* News */}
                <div className=" relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("form.news")}
                    </label>
                    <textarea
                        {...register("news")}
                        className="w-full px-3 py-2 border rounded-3xl border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
                        rows={3}
                        placeholder={t("form.newsPlaceholder")}
                    ></textarea>

                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#3d4b52] hover:bg-[#3d4b52]/80 text-white font-medium py-2 mt-4 px-5 rounded-md transition-all cursor-pointer"
                >
                    {t("form.submit")}
                </button>
            </form>
        </div>
    );
}

export default LandingHookForm;
