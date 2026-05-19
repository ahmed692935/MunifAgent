import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  MdOutlineEmail,
  MdOutlineCreditCard,
  MdAccessTime,
  MdCheckCircle,
} from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { userProfile } from "../../api/userDashboard";
import { useTranslation } from "react-i18next";
import { getSubscriptionPlanByUserId } from "../../api/api"; // adjust path

function Profile() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any>(null);
  const [planLoading, setPlanLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await userProfile(token);

        if (response.success) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedId = user ? JSON.parse(user).id : null;

    if (parsedId) {
      const fetchSubscription = async () => {
        try {
          const token = localStorage.getItem("token") || "";
          const response = await getSubscriptionPlanByUserId(token, parsedId);

          setPlan(response.data || response);
        } catch (error) {
          console.error(error);
        } finally {
          setPlanLoading(false);
        }
      };

      fetchSubscription();
    }
  }, [userData]);
  // Helper function to handle value logic
  const getValue = (val: any) => {
    if (loading) return "---"; // Loading state
    return val || ""; // Data milne par value ya empty string
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans">
      <Navbar />

      <div className="pt-28 pb-10 px-5">
        <div className="max-w-[1000px] mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-10">
            <div
              className={`text-white w-16 h-16 rounded-full flex items-center justify-center ${loading ? "animate-pulse" : ""}`}
              style={{
                background: "linear-gradient(135deg, #2B7FFF 0%, #4F39F6 100%)",
              }}
            >
              <LuUser size={32} />
            </div>
            <div className="space-y-2">
              {loading ? (
                <>
                  <div className="h-7 w-48 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="h-4 w-32 bg-gray-100 animate-pulse rounded-md"></div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#111827]">
                    {userData?.username || t("profile.fallbackName")}
                  </h1>
                  <p className="text-gray-500 text-sm md:text-base">
                    {userData?.email || ""}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Section 1: Profile Information Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <LuUser className="text-gray-700 text-xl" />
              <h2 className="text-xl font-medium text-[#111827]">
                {t("profile.profileInfo")}
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              {t("profile.profileInfoDesc")}
            </p>

            <div className="space-y-5">
              {/* Full Name Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <LuUser size={16} /> {t("profile.fullName")}
                </label>
                <input
                  type="text"
                  readOnly
                  value={getValue(userData?.username)}
                  className={`w-full bg-[#F9FAFB] border border-gray-200 rounded-lg px-4 py-3 text-gray-700 outline-none transition-all ${loading ? "text-gray-300 animate-pulse" : ""}`}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <MdOutlineEmail size={16} /> {t("profile.emailAddress")}
                </label>
                <input
                  type="email"
                  readOnly
                  value={getValue(userData?.email)}
                  className={`w-full bg-[#F9FAFB] border border-gray-200 rounded-lg px-4 py-3 text-gray-700 outline-none transition-all ${loading ? "text-gray-300 animate-pulse" : ""}`}
                />
              </div>

              {/* Phone Field */}
              {/* <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    <MdOutlinePhone size={16} /> Phone Number
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={getValue(userData?.phone_number)}
                                    className={`w-full bg-[#F9FAFB] border border-gray-200 rounded-lg px-4 py-3 text-gray-700 outline-none transition-all ${loading ? 'text-gray-300 animate-pulse' : ''}`}
                                />
                            </div> */}
            </div>
          </div>

          {/* Section 2: Subscription Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* background glow */}
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-blue-100 rounded-full blur-3xl opacity-40" />

            {/* IF NO PLAN */}
            {!planLoading && !plan ? (
              <div className="relative z-10 text-center py-10">
                <div className="mx-auto w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <MdOutlineCreditCard className="text-gray-400 text-2xl" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  {t("profile.noSc")}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {t("profile.noAp")}
                </p>
              </div>
            ) : (
              <>
                {/* header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <MdOutlineCreditCard className="text-blue-600 text-2xl" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {planLoading ? t("profile.loading") : plan?.name}
                      </h2>
                      <p className="text-sm text-gray-500">{t("profile.sp")}</p>
                    </div>
                  </div>

                  {!planLoading && plan && (
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        plan.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {plan.is_active
                        ? t("profile.active")
                        : t("profile.inActive")}
                    </span>
                  )}
                </div>

                {/* price */}
                <div className="mb-6 relative z-10">
                  <h1 className="text-4xl font-extrabold text-gray-900">
                    {planLoading
                      ? "---"
                      : `${Number(plan?.price || 0).toFixed(2)} ${plan?.currency}`}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {t("profile.subscription")}
                  </p>
                </div>

                {/* minutes */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl mb-5 relative z-10">
                  <MdAccessTime className="text-blue-600 text-2xl" />

                  <div>
                    <p className="text-sm text-gray-500">{t("profile.im")}</p>
                    <p className="text-lg font-bold text-gray-900">
                      {planLoading ? "---" : plan?.included_minutes}
                    </p>
                  </div>
                </div>

                {/* features */}
                <div className="relative z-10">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {t("profile.feature")}
                  </h3>

                  <div className="flex items-start gap-2">
                    <p className="text-gray-600 text-sm">
                      {planLoading
                        ? t("profile.loadingFeature")
                        : plan?.features}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
