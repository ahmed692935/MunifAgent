import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'
import { MdOutlineEmail, MdOutlineCreditCard } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { userProfile } from '../../api/userDashboard';

function Profile() {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
                // Thoda delay dene ke liye taake loading effect nazar aaye (optional)
                setTimeout(() => setLoading(false), 800);
            }
        };
        fetchProfile();
    }, []);

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
                        <div className={`text-white w-16 h-16 rounded-full flex items-center justify-center ${loading ? 'animate-pulse' : ''}`}
                            style={{ background: "linear-gradient(135deg, #2B7FFF 0%, #4F39F6 100%)" }}
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
                                        {userData?.username || "User"}
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
                            <h2 className="text-xl font-medium text-[#111827]">Profile Information</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Your personal information and contact details</p>

                        <div className="space-y-5">
                            {/* Full Name Field */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    <LuUser size={16} /> Full Name
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={getValue(userData?.username)}
                                    className={`w-full bg-[#F9FAFB] border border-gray-200 rounded-lg px-4 py-3 text-gray-700 outline-none transition-all ${loading ? 'text-gray-300 animate-pulse' : ''}`}
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    <MdOutlineEmail size={16} /> Email Address
                                </label>
                                <input
                                    type="email"
                                    readOnly
                                    value={getValue(userData?.email)}
                                    className={`w-full bg-[#F9FAFB] border border-gray-200 rounded-lg px-4 py-3 text-gray-700 outline-none transition-all ${loading ? 'text-gray-300 animate-pulse' : ''}`}
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
                    <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <MdOutlineCreditCard className="text-gray-700 text-xl" />
                            <h2 className="text-lg font-semibold text-[#111827]">Active Subscription Plan</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Your current plan details</p>

                        <div className={`bg-[#eff6ff] border border-blue-100 rounded-xl p-6 transition-all ${loading ? 'opacity-50 animate-pulse' : ''}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-bold text-[#111827] text-lg">
                                    {loading ? "---" : "Professional Plan"}
                                </span>
                                {!loading && (
                                    <span className="bg-[#dcfce7] text-[#15803d] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                        Active
                                    </span>
                                )}
                            </div>
                            <div className="text-[#2563eb] text-2xl md:text-3xl font-bold">
                                {loading ? "---" : "$299/month"}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile;