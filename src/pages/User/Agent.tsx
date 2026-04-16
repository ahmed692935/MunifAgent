// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import type { AgentFormData } from "../../Interface/AddAgent";
// import { RiUserAddFill } from "react-icons/ri";
// import Navbar from "../../components/Navbar";

// import { useNavigate } from "react-router-dom";
// import { getLanguage, postAddAgent } from "../../api/api";
// import toast from "react-hot-toast";
// import type { AxiosError } from "axios";

// import Uk from "../../assets/Images/uk.png";
// import German from "../../assets/Images/germany.png";
// import Itlaian from "../../assets/Images/italy.png";
// import Netherlands from "../../assets/Images/netherlands.png";
// import Spainsh from "../../assets/Images/spanish.png";
// import France from "../../assets/Images/france.png";

// function Agent() {

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [preview, setPreview] = useState<string | null>(null);
//     const [openVoicePopup, setOpenVoicePopup] = useState(false);
//     const [voiceSamples, setVoiceSamples] = useState<any[]>([]);
//     const [selectedVoice, setSelectedVoice] = useState<any>(null);
//     const [loadingVoiceSamples, setLoadingVoiceSamples] = useState(false);

//     const navigate = useNavigate();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//         watch,
//     } = useForm<AgentFormData>();

//     const onSubmit = async (data: AgentFormData) => {
//         setIsSubmitting(true);

//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 toast.error("User token missing!");
//                 return;
//             }

//             // Create formData for API
//             const formData = new FormData();
//             formData.append("agent_name", data.agent_name);
//             formData.append("phone_number", data.phone_number);
//             formData.append("owner_name", data.business_name || "");
//             formData.append("industry", data.industry || "");
//             formData.append("language", data.language || "");
//             // formData.append("voice_type", data.voice_type);
//             formData.append("voice_type", selectedVoice?.voice_name || "");
//             formData.append("system_prompt", data.system_prompt);
//             formData.append("owner_email", data.owner_email);
//             formData.append("business_hours_start", data.business_hours_start);
//             formData.append("business_hours_end", data.business_hours_end);
//             formData.append("allowed_minutes", data.allowed_minutes.toString());

//             // image (file)
//             if (data.agent_image && data.agent_image[0] instanceof File) {
//                 formData.append("avatar", data.agent_image[0]);
//             }

//             const res = await postAddAgent(token, formData);

//             // console.log("API Response:", res);
//             // toast.success("Agent Created Successfully!");
//             toast.success(res?.data?.message || "Agent Created Successfully!");

//             reset();
//             setPreview(null);

//             setTimeout(() => {
//                 navigate("/dashboard");
//             }, 700);
//         } catch (error: unknown) {
//             const axiosError = error as AxiosError<{ error: string }>;
//             const apiMessage =
//                 axiosError?.response?.data?.error ||
//                 axiosError?.message ||
//                 "Error creating agent!";

//             toast.error(apiMessage);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const languageFlags: Record<string, string> = {
//         en: Uk, // English
//         de: German, // German
//         es: Spainsh, // Spanish
//         fr: France, // French
//         it: Itlaian, // Italian
//         nl: Netherlands, // Dutch
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-4xl mx-auto">
//                     {/* Header */}
//                     <div className="text-center mb-10">
//                         <div className="p-3 flex mb-4 justify-center !mt-16">
//                             <RiUserAddFill size={30} className="mt-2 mx-5" color="#3d4b52" />
//                             <h1 className="text-4xl font-bold text-[#3d4b52]">
//                                 Update Agent
//                             </h1>
//                         </div>

//                         <p className="text-gray-600">Configure your AI agent</p>
//                     </div>

//                     {/* Form Card */}
//                     <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                         <div className="p-8 md:p-10">
//                             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                                 <div className="flex flex-col items-center">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                                         Agent Image
//                                     </label>

//                                     {/* Circle Upload Container */}
//                                     <label className="w-32 h-32 rounded-full border-dashed border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden relative hover:border-[#3d4b52] transition">
//                                         {/* Preview Image */}
//                                         {preview ? (
//                                             <img
//                                                 src={preview}
//                                                 alt="Preview"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         ) : (
//                                             <span className="text-gray-500 text-sm text-center px-2">
//                                                 Upload Image +
//                                             </span>
//                                         )}

//                                         {/* Hidden Input */}
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             {...register("agent_image", {
//                                                 required: "Agent image is required",
//                                             })}
//                                             onChange={(e) => {
//                                                 const file = e.target.files?.[0];
//                                                 if (file) setPreview(URL.createObjectURL(file));
//                                             }}
//                                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                         />
//                                     </label>

//                                     {errors.agent_image && (
//                                         <p className="mt-2 text-sm text-red-600">
//                                             {errors.agent_image.message}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Agent Name & Phone Number Row */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                             Agent Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             {...register("agent_name", {
//                                                 required: "Agent name is required",
//                                             })}
//                                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
//            focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
//                                             // style={{ focusBorderColor: "#3d4b52" }}
//                                             placeholder="Enter agent name"
//                                         />
//                                         {errors.agent_name && (
//                                             <p className="mt-1 text-sm text-red-600">
//                                                 {errors.agent_name.message}
//                                             </p>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                             Phone Number
//                                         </label>
//                                         <input
//                                             type="tel"
//                                             {...register("phone_number", {
//                                                 required: "Phone number is required",
//                                                 pattern: {
//                                                     value: /^[0-9+\-() ]+$/,
//                                                     message: "Invalid phone number",
//                                                 },
//                                             })}
//                                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
//            focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
//                                             placeholder="+1 (555) 000-0000"
//                                         />
//                                         {errors.phone_number && (
//                                             <p className="mt-1 text-sm text-red-600">
//                                                 {errors.phone_number.message}
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>
//                                 {/* Business Name & Industry Row */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                             Business Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             {...register("business_name", {})}
//                                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
//                                             focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
//                                             placeholder="Enter business name"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                             Business Email
//                                         </label>
//                                         <input
//                                             type="email"
//                                             {...register("owner_email", {})}
//                                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
//                                             focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
//                                             placeholder="Enter owner email"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="w-full">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Industry
//                                     </label>
//                                     <input
//                                         type="text"
//                                         {...register("industry", {})}
//                                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
//            focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
//                                         placeholder="e.g., Healthcare, Finance, Retail"
//                                     />
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                             Language
//                                         </label>

//                                         <select
//                                             defaultValue="de"
//                                             {...register("language", {})}
//                                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
//       focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors bg-white"
//                                         >
//                                             <option value="de">German</option>
//                                             <option value="en">English</option>
//                                             <option value="fr">French</option>
//                                             <option value="it">Italian</option>
//                                             <option value="es">Spanish</option>
//                                             <option value="nl">Dutch</option>
//                                         </select>
//                                         <div className="flex items-center gap-2 mt-2">
//                                             {watch("language") && (
//                                                 <img
//                                                     src={languageFlags[watch("language")]}
//                                                     alt={watch("language")}
//                                                     className="w-6 h-4 object-cover rounded-sm"
//                                                 />
//                                             )}
//                                             <span className="text-gray-700 font-medium">
//                                                 {watch("language")
//                                                     ? watch("language").toUpperCase()
//                                                     : "Select language"}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                             Select Voice Type
//                                         </label>
//                                         <input
//                                             type="text"
//                                             readOnly
//                                             value={selectedVoice?.voice_name || ""}
//                                             placeholder="Click to choose a voice"
//                                             onFocus={async () => {
//                                                 const lang = watch("language");

//                                                 if (!lang) {
//                                                     toast.error("Please select a language first!");
//                                                     return;
//                                                 }

//                                                 setOpenVoicePopup(true);
//                                                 setLoadingVoiceSamples(true);

//                                                 try {
//                                                     const token = localStorage.getItem("token");
//                                                     if (!token) {
//                                                         toast.error("Token missing!");
//                                                         return;
//                                                     }

//                                                     const response = await getLanguage({
//                                                         language: lang,
//                                                         token: token,
//                                                     });

//                                                     setVoiceSamples(
//                                                         response.grouped_by_language?.[lang] || []
//                                                     );
//                                                 } catch (error) {
//                                                     console.error(error);
//                                                     toast.error("Error fetching voice samples");
//                                                 } finally {
//                                                     setLoadingVoiceSamples(false);
//                                                 }
//                                             }}
//                                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
//        focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors bg-white cursor-pointer"
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* System Prompt */}
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Update Prompt
//                                     </label>
//                                     <textarea
//                                         {...register("system_prompt", {
//                                             required: "System prompt is required",
//                                         })}
//                                         rows={5}
//                                         className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
//            focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors resize-none"
//                                         placeholder="Define the agent's behavior, personality, and guidelines..."
//                                     />
//                                     {errors.system_prompt && (
//                                         <p className="mt-1 text-sm text-red-600">
//                                             {errors.system_prompt.message}
//                                         </p>
//                                     )}
//                                 </div>
//                                 {/* Submit Button */}
//                                 <div className="pt-4">
//                                     <button
//                                         type="submit"
//                                         disabled={isSubmitting}
//                                         className="w-full py-4 px-6 text-white font-semibold rounded-lg shadow-lg bg-[#3d4b52] hover:shadow-xl hover:bg-[#2d3b42] transform cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                                     //   style={{ backgroundColor: "#3d4b52" }}
//                                     >
//                                         {isSubmitting ? (
//                                             <span className="flex items-center justify-center">
//                                                 <svg
//                                                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     fill="none"
//                                                     viewBox="0 0 24 24"
//                                                 >
//                                                     <circle
//                                                         className="opacity-25"
//                                                         cx="12"
//                                                         cy="12"
//                                                         r="10"
//                                                         stroke="currentColor"
//                                                         strokeWidth="4"
//                                                     ></circle>
//                                                     <path
//                                                         className="opacity-75"
//                                                         fill="currentColor"
//                                                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                                     ></path>
//                                                 </svg>
//                                                 Updating Agent...
//                                             </span>
//                                         ) : (
//                                             "Update Agent"
//                                         )}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>

//                     {/* Info Card */}
//                     <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
//                         <div className="flex items-start">
//                             <svg
//                                 className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
//                                 style={{ color: "#3d4b52" }}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                             <p className="text-sm text-gray-600">
//                                 Configure your AI agent with specific instructions and
//                                 characteristics. The system prompt defines how the agent will
//                                 interact with users.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
// {openVoicePopup && (
//     <div className="fixed inset-0 bg-[#3d4b52] bg-opacity-40 flex justify-center items-center z-50">
//         <div className="bg-white w-full flex flex-col max-w-full mx-2 lg:mx-30 p-6 rounded-xl shadow-xl">
//             <h2 className="text-xl font-bold text-[#3d4b52] mb-4">
//                 Select Voice Sample
//             </h2>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-90 overflow-y-auto">
//                 {loadingVoiceSamples ? (
//                     <div className="col-span-full flex justify-center items-center py-20">
//                         <svg
//                             className="animate-spin h-10 w-10 text-[#3d4b52]"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                         >
//                             <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                             ></circle>
//                             <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                             ></path>
//                         </svg>
//                     </div>
//                 ) : (
//                     voiceSamples.map((voice) => (
//                         <div
//                             key={voice.id}
//                             className="border border-[#3d4b52] hover:border-2 p-4 rounded-lg flex items-center justify-between hover:bg-gray-50 cursor-pointer"
//                             onClick={() => {
//                                 setSelectedVoice(voice);
//                                 setOpenVoicePopup(false);
//                             }}
//                         >
//                             <div className="flex items-center gap-3">
//                                 {languageFlags[voice.language] && (
//                                     <img
//                                         src={languageFlags[voice.language]}
//                                         alt={voice.language}
//                                         className="w-6 h-4 object-cover rounded-sm"
//                                     />
//                                 )}
//                                 <div>
//                                     <p className="font-semibold text-[#3d4b52]">
//                                         {voice.voice_name}
//                                     </p>
//                                     <p className="text-sm text-gray-500">
//                                         {voice.gender} • {voice.language.toUpperCase()}
//                                     </p>
//                                 </div>
//                             </div>
//                             <audio
//                                 controls
//                                 src={voice.audio_url}
//                                 className="h-10"
//                             ></audio>
//                         </div>
//                     ))
//                 )}
//             </div>

//             <button
//                 className="mt-8 w-72 mx-auto text-white py-3 bg-[#3d4b52] cursor-pointer hover:bg-[#2d3b42] rounded-lg"
//                 onClick={() => setOpenVoicePopup(false)}
//             >
//                 Close
//             </button>
//         </div>
//     </div>
// )}
//         </>
//     )
// }

// export default Agent

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { AgentFormData } from "../../Interface/AddAgent";
import type { Agent as AgentType } from "../../Interface/User";
import { RiUserAddFill } from "react-icons/ri";
import Navbar from "../../components/Navbar";
import { getLanguage } from "../../api/api";
import { getMyAgent, putMyAgent } from "../../api/userDashboard";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import Uk from "../../assets/Images/uk.png";
import German from "../../assets/Images/germany.png";
import Itlaian from "../../assets/Images/italy.png";
import Netherlands from "../../assets/Images/netherlands.png";
import Spainsh from "../../assets/Images/spanish.png";
import France from "../../assets/Images/france.png";

function Agent() {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [openVoicePopup, setOpenVoicePopup] = useState(false);
    const [voiceSamples, setVoiceSamples] = useState<any[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<any>(null);
    const [loadingVoiceSamples, setLoadingVoiceSamples] = useState(false);

    const [isLoadingData, setIsLoadingData] = useState(true);

    // Multi-agent state
    const [agents, setAgents] = useState<AgentType[]>([]);
    const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
    } = useForm<AgentFormData>();

    // Initial Fetch of Agents
    useEffect(() => {
        const fetchAgents = async () => {
            setIsLoadingData(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await getMyAgent(token);

                if (response.success && response.data && response.data.agents.length > 0) {
                    setAgents(response.data.agents);
                    // Default select the first agent
                    setSelectedAgentId(response.data.agents[0].id);
                } else {
                    toast.error(t("userAgent.toast.noAgents"));
                }
            } catch (error) {
                console.error("Error fetching agents:", error);
                toast.error(t("userAgent.toast.loadFailed"));
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchAgents();
    }, [t]);

    // Update form when selected agent changes
    useEffect(() => {
        if (!selectedAgentId || agents.length === 0) return;

        const agent = agents.find(a => a.id === selectedAgentId);
        if (!agent) return;

        reset({
            agent_name: agent.agent_name,
            phone_number: agent.phone_number,
            system_prompt: agent.system_prompt,
            industry: agent.industry || "",
            language: agent.language,
            business_name: agent.owner_name,
            owner_email: agent.owner_email,
            allowed_minutes: agent.allowed_minutes || 0,
        });

        if (agent.voice_type) {
            setSelectedVoice({ voice_name: agent.voice_type });
        } else {
            setSelectedVoice(null);
        }

        if (agent.avatar_presigned_url || agent.avatar_url) {
            setPreview(agent.avatar_presigned_url || agent.avatar_url || null);
        } else {
            setPreview(null);
        }

    }, [selectedAgentId, agents, reset]);


    const onSubmit = async (data: AgentFormData) => {
        if (!selectedAgentId) {
            toast.error(t("userAgent.toast.noneSelected"));
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error(t("userAgent.toast.tokenMissing"));
                return;
            }

            const formData = new FormData();
            formData.append("agent_name", data.agent_name);
            formData.append("system_prompt", data.system_prompt);
            formData.append("industry", data.industry);
            formData.append("language", data.language);
            formData.append("business_name", data.business_name);
            formData.append("owner_email", data.owner_email);

            if (selectedVoice) {
                formData.append("voice_type", selectedVoice.voice_name);
            }

            if (data.agent_image && data.agent_image instanceof FileList && data.agent_image[0]) {
                formData.append("avatar", data.agent_image[0]); // Changed to 'avatar' based on previous context implementation, verify API expectation. Assuming 'avatar' based on previous `agent_image` logic or verify. Wait, User request mentioned JSON response has `avatar_url`. Let's stick to standard `avatar` or `agent_image`. Previous code used `agent_image` in append but file input name is `agent_image`. Previous working code used `avatar` in formData append at line 65. I'll stick to `avatar`.
            }

            // Using the new signature: putMyAgent(token, agentId, formData)
            const response = await putMyAgent(token, selectedAgentId, formData);

            if (response.success) {
                toast.success(t("userAgent.toast.updateSuccess"));
                setIsEditing(false);

                // Update local state to reflect changes immediately
                setAgents(prevAgents => prevAgents.map(a =>
                    a.id === selectedAgentId
                        ? { ...a, ...response.data } // Assuming response.data is the updated agent object or contains updated fields
                        : a
                ));

                // If response.data isn't the full object, we might need refetch, but let's assume optimistically or based on standard.
                // Or better, just refetch getMyAgent to be safe and sync.
                // But for smoothness, let's keep it simple.

                // Re-fetch to ensure sync (optional but safer)
                const freshResponse = await getMyAgent(token);
                if (freshResponse.success && freshResponse.data) {
                    setAgents(freshResponse.data.agents);
                }

            } else {
                toast.error(response.message || t("userAgent.toast.updateFailed"));
            }

        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ error: string }>;
            toast.error(axiosError?.response?.data?.error || t("userAgent.toast.updateError"));
            console.error("Update Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const languageFlags: Record<string, string> = {
        en: Uk, de: German, es: Spainsh, fr: France, it: Itlaian, nl: Netherlands,
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="p-3 flex mb-4 justify-center mt-16!">
                            <RiUserAddFill size={30} className="mt-2 mx-5" color="#3d4b52" />
                            <h1 className="text-4xl font-bold text-[#3d4b52]">
                                {isEditing ? t("userAgent.titleEdit") : t("userAgent.titleView")}
                            </h1>
                        </div>
                    </div>

                    <div className="bg-white border border-[#0000001A] rounded-2xl overflow-hidden relative min-h-[300px]">
                        <div className="p-8 md:p-10">


                            {/* Agent Selection Dropdown */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("userAgent.selectAgent")}</label>
                                <div className="relative">
                                    <select
                                        value={selectedAgentId || ""}
                                        onChange={(e) => {
                                            const id = Number(e.target.value);
                                            setSelectedAgentId(id);
                                            setIsEditing(false); // Reset edit mode on switch
                                        }}
                                        disabled={isLoadingData}
                                        className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg appearance-none bg-white focus:border-[#3d4b52] outline-none cursor-pointer"
                                    >
                                        {isLoadingData ? <option>{t("userAgent.loadingOption")}</option> : agents.map((agent) => (
                                            <option key={agent.id} value={agent.id}>
                                                {agent.agent_name} {/*({agent.phone_number})*/}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Image Upload - Disabled if not editing */}
                                <div className="flex flex-col items-center">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">{t("addAgent.fields.agentImage")}</label>
                                    <label className={`w-32 h-32 rounded-full border-dashed border-2 flex items-center justify-center overflow-hidden relative transition ${isEditing ? 'border-gray-300 cursor-pointer hover:border-[#3d4b52]' : 'border-gray-100 cursor-not-allowed'}`}>
                                        {preview ? (
                                            <img src={preview} alt={t("addAgent.alt.preview")} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-gray-500 text-sm text-center px-2">{t("addAgent.placeholders.uploadImage")}</span>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            disabled={!isEditing}
                                            {...register("agent_image")}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) setPreview(URL.createObjectURL(file));
                                            }}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                        />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("addAgent.fields.agentName")}</label>
                                        <input
                                            type="text"
                                            disabled={isLoadingData || !isEditing}
                                            {...register("agent_name", { required: t("addAgent.validation.agentNameRequired") })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                            placeholder={isLoadingData ? t("userAgent.loadingOption") : t("addAgent.placeholders.agentName")}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("userAgent.phoneReadOnly")}</label>
                                        <input
                                            type="tel"
                                            disabled={true} // Hamesha disabled rahega
                                            {...register("phone_number")}
                                            className="w-full px-4 py-3 border-2 border-gray-100 bg-gray-50 text-gray-400 rounded-lg outline-none cursor-not-allowed"
                                            placeholder={isLoadingData ? t("userAgent.loadingOption") : t("addAgent.placeholders.phoneNumber")}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("addAgent.fields.businessName")}</label>
                                        <input
                                            type="text"
                                            disabled={isLoadingData || !isEditing}
                                            {...register("business_name")}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] outline-none disabled:bg-gray-50"
                                            placeholder={isLoadingData ? t("userAgent.loadingOption") : ""}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("addAgent.fields.businessEmail")}</label>
                                        <input
                                            type="email"
                                            disabled={isLoadingData || !isEditing}
                                            {...register("owner_email")}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] outline-none disabled:bg-gray-50"
                                            placeholder={isLoadingData ? t("userAgent.loadingOption") : ""}
                                        />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t("addAgent.fields.industry")}</label>
                                    <input
                                        type="text"
                                        disabled={isLoadingData || !isEditing}
                                        {...register("industry")}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] outline-none disabled:bg-gray-50"
                                        placeholder={isLoadingData ? t("userAgent.loadingOption") : ""}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("addAgent.fields.language")}</label>
                                        <select
                                            disabled={isLoadingData || !isEditing}
                                            {...register("language")}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] outline-none bg-white disabled:bg-gray-50"
                                        >
                                            {isLoadingData ? <option>{t("userAgent.loadingOption")}</option> : null}
                                            <option value="de">{t("addAgent.languageOptions.de")}</option>
                                            <option value="en">{t("addAgent.languageOptions.en")}</option>
                                            <option value="fr">{t("addAgent.languageOptions.fr")}</option>
                                            <option value="it">{t("addAgent.languageOptions.it")}</option>
                                            <option value="es">{t("addAgent.languageOptions.es")}</option>
                                            <option value="nl">{t("addAgent.languageOptions.nl")}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("addAgent.fields.voiceType")}</label>
                                        <input
                                            type="text"
                                            readOnly
                                            disabled={isLoadingData}
                                            value={selectedVoice?.voice_name || ""}
                                            placeholder={isLoadingData ? t("userAgent.loadingOption") : t("addAgent.placeholders.voiceType")}
                                            onFocus={async () => {
                                                const lang = watch("language");

                                                if (!lang) {
                                                    toast.error(t("addAgent.toast.selectLanguageFirst"));
                                                    return;
                                                }

                                                setOpenVoicePopup(true);
                                                setLoadingVoiceSamples(true);

                                                try {
                                                    const token = localStorage.getItem("token");
                                                    if (!token) {
                                                        toast.error(t("addAgent.toast.authTokenMissing"));
                                                        return;
                                                    }

                                                    const response = await getLanguage({
                                                        language: lang,
                                                        token: token,
                                                    });

                                                    setVoiceSamples(
                                                        response.grouped_by_language?.[lang] || []
                                                    );
                                                } catch (error) {
                                                    console.error(error);
                                                    toast.error(t("addAgent.toast.voiceSamplesFailed"));
                                                } finally {
                                                    setLoadingVoiceSamples(false);
                                                }
                                            }}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                    focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors bg-white cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t("addAgent.fields.systemPrompt")}</label>
                                    <textarea
                                        disabled={isLoadingData || !isEditing}
                                        {...register("system_prompt", { required: t("addAgent.validation.systemPromptRequired") })}
                                        rows={5}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] outline-none resize-none disabled:bg-gray-50"
                                        placeholder={isLoadingData ? t("userAgent.loadingOption") : t("addAgent.placeholders.systemPrompt")}
                                    />
                                </div>

                                <div className="pt-4">
                                    {!isEditing ? (
                                        // Edit Button
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="w-full py-4 px-6 text-white font-semibold rounded-lg shadow-lg bg-[#3d4b52] hover:bg-[#2d3b42] transition-all cursor-pointer"
                                        >
                                            {t("userAgent.editAgent")}
                                        </button>
                                    ) : (
                                        // Update Button (Submit type)
                                        <div className="flex gap-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 py-4 px-6 text-white font-semibold rounded-lg shadow-lg bg-[#3d4b52] hover:bg-[#2d3b42] transition-all disabled:opacity-50 cursor-pointer"
                                            >
                                                {isSubmitting ? t("userAgent.updating") : t("userAgent.updateAgent")}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="py-4 px-6 text-gray-600 font-semibold rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
                                            >
                                                {t("userAgent.cancel")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            </div>
            {/* ... Modal code remains the same ... */}
            {openVoicePopup && (
                <div className="fixed inset-0 bg-[#3d4b52] bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-full flex flex-col max-w-full mx-2 lg:mx-30 p-6 rounded-xl shadow-xl">
                        <h2 className="text-xl font-bold text-[#3d4b52] mb-4">
                            {t("addAgent.voiceModal.title")}
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-90 overflow-y-auto">
                            {loadingVoiceSamples ? (
                                <div className="col-span-full flex justify-center items-center py-20">
                                    <svg
                                        className="animate-spin h-10 w-10 text-[#3d4b52]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                </div>
                            ) : (
                                voiceSamples.map((voice) => (
                                    <div
                                        key={voice.id}
                                        className="border border-[#3d4b52] hover:border-2 p-4 rounded-lg flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                                        onClick={() => {
                                            setSelectedVoice(voice);
                                            setOpenVoicePopup(false);
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            {languageFlags[voice.language] && (
                                                <img
                                                    src={languageFlags[voice.language]}
                                                    alt={voice.language}
                                                    className="w-6 h-4 object-cover rounded-sm"
                                                />
                                            )}
                                            <div>
                                                <p className="font-semibold text-[#3d4b52]">
                                                    {voice.voice_name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {voice.gender} • {voice.language.toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                        <audio
                                            controls
                                            src={voice.audio_url}
                                            className="h-10"
                                        ></audio>
                                    </div>
                                ))
                            )}
                        </div>

                        <button
                            className="mt-8 w-72 mx-auto text-white py-3 bg-[#3d4b52] cursor-pointer hover:bg-[#2d3b42] rounded-lg"
                            onClick={() => setOpenVoicePopup(false)}
                        >
                            {t("addAgent.voiceModal.close")}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Agent;