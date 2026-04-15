import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
// import Logo from "../../assets/Images/MrBot_Logo.webp";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { loginSuccess } from "../../store/slices/authSlice";
import { businessDetail } from "../../api/userDashboard";
// 1. useNavigate import karein
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface OnboardingInputs {
    agent_name: string;
    business_name: string;
    business_email: string;
    phone_number: string;
    industry: string;
    language: string;
}

const Onboarding = () => {
    const { t } = useTranslation();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    // 2. navigate function initialize karein
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.is_admin) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnboardingInputs>();

    const onSubmit: SubmitHandler<OnboardingInputs> = async (data) => {
        setIsLoading(true);
        try {
            const response = await businessDetail(token as string, data);

            if (response.success) {
                toast.success(response.message || t("onboarding.toast.success"));

                // Update Redux state to reflect onboarding is done
                if (user) {
                    const updatedUser = { ...user, onboard: true };
                    dispatch(loginSuccess({ user: updatedUser, token: token as string }));
                }

                // 3. Success par dashboard par bhej dain
                // Thoda delay (e.g. 1.5s) dena chahen takay toast nazar aa jaye to setTimeout use kar sakte hain
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            }
        } catch (error: any) {
            console.error("Submission Error:", error);
            toast.error(error.response?.data?.message || t("onboarding.toast.error"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-[#F9FAFB] py-10 pt-30 px-5 min-h-screen">
                <Toaster position="top-right" />

                {/* <div className="text-center mb-8">
                <img src={Logo} alt="MrBot Logo" className="w-10 h-10 mx-auto mb-4 object-contain" />
                <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-2">
                    Welcome to MrBot, {user?.email.split('@')[0] || "Demo User"}!
                </h1>
                <p className="text-gray-500 text-base">Let's set up your AI call handling system</p>
            </div> */}

                <div className="w-full max-w-[650px] mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-[#111827] mb-8">{t("onboarding.title")}</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-[15px] font-semibold text-gray-800">
                                {t("onboarding.fields.agentName")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={t("onboarding.placeholders.agentName")}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.agent_name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
                                {...register("agent_name", { required: true })}
                            />
                            <p className="text-xs text-gray-400">{t("onboarding.hints.agentName")}</p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[15px] font-semibold text-gray-800">
                                {t("onboarding.fields.businessName")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={t("onboarding.placeholders.businessName")}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.business_name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
                                {...register("business_name", { required: true })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[15px] font-semibold text-gray-800">
                                {t("onboarding.fields.businessEmail")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder={t("onboarding.placeholders.businessEmail")}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.business_email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
                                {...register("business_email", { required: true })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[15px] font-semibold text-gray-800">
                                {t("onboarding.fields.phoneNumber")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={t("onboarding.placeholders.phoneNumber")}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.phone_number ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
                                {...register("phone_number", { required: true })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[15px] font-semibold text-gray-800">
                                {t("onboarding.fields.industry")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={t("onboarding.placeholders.industry")}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.industry ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
                                {...register("industry", { required: true })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[15px] font-semibold text-gray-800">
                                {t("onboarding.fields.language")} <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={`w-full px-4 py-3 rounded-xl border ${errors.language ? 'border-red-500' : 'border-gray-200'} bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none`}
                                {...register("language", { required: true })}
                            >
                                <option value="">{t("onboarding.selectLanguage")}</option>
                                <option value="English">{t("onboarding.languageOptionEnglish")}</option>
                                <option value="German">{t("onboarding.languageOptionGerman")}</option>
                                {/* <option value="Spanish">Spanish</option> */}
                            </select>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#3d4b52] hover:bg-[#2d3b42] disabled:bg-blue-300 text-white font-semibold px-10 py-3 rounded-xl transition-all shadow-md active:scale-95 min-w-[140px] cursor-pointer"
                            >
                                {isLoading ? t("onboarding.submitting") : t("onboarding.submit")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Onboarding;