import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { AgentFormData } from "../Interface/AddAgent";
import { RiUserAddFill } from "react-icons/ri";
import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLanguage, postAddAgent, getUsersAgent } from "../api/api";
import toast from "react-hot-toast";

import Uk from "../assets/Images/uk.png";
import German from "../assets/Images/germany.png";
import Itlaian from "../assets/Images/italy.png";
import Netherlands from "../assets/Images/netherlands.png";
import Spainsh from "../assets/Images/spanish.png";
import France from "../assets/Images/france.png";

const AddAgents = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [openVoicePopup, setOpenVoicePopup] = useState(false);
  const [voiceSamples, setVoiceSamples] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<any>(null);
  const [loadingVoiceSamples, setLoadingVoiceSamples] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<AgentFormData>();

  const onSubmit = async (data: AgentFormData) => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error(t("addAgent.toast.tokenMissing"));
        return;
      }

      const formData = new FormData();

      // --- UPDATED PART: Passing user_id and agent_name ---
      formData.append("user_id", String(data.user_id)); // Selected ID from dropdown
      formData.append("agent_name", data.agent_name); // Agent Name from text input
      // --------------------------------------------------

      formData.append("phone_number", data.phone_number);
      formData.append("owner_name", data.business_name || "");
      formData.append("industry", data.industry || "");
      formData.append("language", data.language || "");
      formData.append("voice_type", selectedVoice?.voice_name || "");
      formData.append("system_prompt", data.system_prompt);
      formData.append("owner_email", data.owner_email);
      formData.append("business_hours_start", data.business_hours_start);
      formData.append("business_hours_end", data.business_hours_end);
      formData.append("allowed_minutes", data.allowed_minutes.toString());

      if (data.agent_image && data.agent_image[0] instanceof File) {
        formData.append("avatar", data.agent_image[0]);
      }

      const res = await postAddAgent(token, formData);
      toast.success(res?.data?.error || t("addAgent.toast.agentCreated"));

      reset();
      setPreview(null);
      setTimeout(() => navigate("/dashboard"), 700);

    } catch (error: any) {
      // ... error handling
      toast.error(error.res?.data?.error || t("addAgent.toast.createFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };



  // --- New States ---
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // --- API Fetching Logic ---
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoadingUsers(true);
      try {
        const response = await getUsersAgent(token);
        if (response.success) {
          setUsersList(response.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(t("addAgent.toast.loadUsersFailed"));
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [t]);

  // --- Auto-fill Email Logic ---
  const selectedUserId = watch("user_id");

  useEffect(() => {
    if (selectedUserId && usersList.length > 0) {
      const selectedUser = usersList.find((u) => String(u.id) === String(selectedUserId));
      if (selectedUser) {
        setValue("owner_email", selectedUser.email);
      }
    } else if (!selectedUserId) {
      setValue("owner_email", "");
    }
  }, [selectedUserId, usersList, setValue]);

  const languageFlags: Record<string, string> = {
    en: Uk, // English
    de: German, // German
    es: Spainsh, // Spanish
    fr: France, // French
    it: Itlaian, // Italian
    nl: Netherlands, // Dutch
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="p-3 flex mb-4 justify-center mt-16!">
              <RiUserAddFill size={30} className="mt-2 mx-5" color="#3d4b52" />
              <h1 className="text-4xl font-bold text-[#3d4b52] mb-2">
                {t("addAgent.title")}
              </h1>
            </div>

            <p className="text-gray-600">{t("addAgent.subtitle")}</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col items-center">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {t("addAgent.fields.agentImage")}
                  </label>

                  {/* Circle Upload Container */}
                  <label className="w-32 h-32 rounded-full border-dashed border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden relative hover:border-[#3d4b52] transition">
                    {/* Preview Image */}
                    {preview ? (
                      <img
                        src={preview}
                        alt={t("addAgent.alt.preview")}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm text-center px-2">
                        {t("addAgent.placeholders.uploadImage")}
                      </span>
                    )}

                    {/* Hidden Input */}
                    <input
                      type="file"
                      accept="image/*"
                      {...register("agent_image", {
                        required: t("addAgent.validation.agentImageRequired"),
                      })}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setPreview(URL.createObjectURL(file));
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>

                  {errors.agent_image && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.agent_image.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("addAgent.fields.selectUser")}
                  </label>
                  <select
                    {...register("user_id", {
                      required: t("addAgent.validation.selectUser"),
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors bg-white"
                  >
                    <option value="">
                      {loadingUsers ? t("addAgent.loadingUsers") : t("addAgent.placeholders.selectUser")}
                    </option>
                    {usersList.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username} ({user.email})
                      </option>
                    ))}
                  </select>
                  {errors.user_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.user_id.message}</p>
                  )}
                </div>

                {/* Agent Name & Phone Number Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.agentName")}
                    </label>
                    <input
                      type="text"
                      {...register("agent_name", {
                        required: t("addAgent.validation.agentNameRequired"),
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                      placeholder={t("addAgent.placeholders.agentName")}
                    />
                    {errors.agent_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.agent_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.phoneNumber")}
                    </label>
                    <input
                      type="tel"
                      {...register("phone_number", {
                        required: t("addAgent.validation.phoneRequired"),
                        pattern: {
                          value: /^[0-9+\-() ]+$/,
                          message: t("addAgent.validation.invalidPhone"),
                        },
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                      placeholder={t("addAgent.placeholders.phoneNumber")}
                    />
                    {errors.phone_number && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Business Name & Industry Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.businessName")}
                    </label>
                    <input
                      type="text"
                      {...register("business_name", {})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                      placeholder={t("addAgent.placeholders.businessName")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.businessEmail")}
                    </label>
                    <input
                      type="email"
                      {...register("owner_email", {})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
        focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                      placeholder={t("addAgent.placeholders.ownerEmail")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.industry")}
                    </label>
                    <input
                      type="text"
                      {...register("industry", {})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                      placeholder={t("addAgent.placeholders.industry")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.allowedMinutes")}
                    </label>
                    <input
                      type="number"
                      {...register("allowed_minutes", {
                        min: { value: 1, message: t("addAgent.validation.minMinutes") },
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
        focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                      placeholder={t("addAgent.placeholders.allowedMinutes")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.businessHoursStart")}
                    </label>
                    <input
                      type="time"
                      {...register("business_hours_start", {
                        required: t("addAgent.validation.startTimeRequired"),
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
        focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    />
                  </div>

                  {/* Business End Time */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.businessHoursEnd")}
                    </label>
                    <input
                      type="time"
                      {...register("business_hours_end", {
                        required: t("addAgent.validation.endTimeRequired"),
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
        focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.language")}
                    </label>

                    <select
                      defaultValue="de"
                      {...register("language", {})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
      focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors bg-white"
                    >
                      <option value="de">{t("addAgent.languageOptions.de")}</option>
                      <option value="en">{t("addAgent.languageOptions.en")}</option>
                      <option value="fr">{t("addAgent.languageOptions.fr")}</option>
                      <option value="it">{t("addAgent.languageOptions.it")}</option>
                      <option value="es">{t("addAgent.languageOptions.es")}</option>
                      <option value="nl">{t("addAgent.languageOptions.nl")}</option>
                    </select>
                    <div className="flex items-center gap-2 mt-2">
                      {watch("language") && (
                        <img
                          src={languageFlags[watch("language")]}
                          alt={watch("language")}
                          className="w-6 h-4 object-cover rounded-sm"
                        />
                      )}
                      <span className="text-gray-700 font-medium">
                        {watch("language")
                          ? watch("language").toUpperCase()
                          : t("addAgent.selectLanguageHint")}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("addAgent.fields.voiceType")}
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={selectedVoice?.voice_name || ""}
                      placeholder={t("addAgent.placeholders.voiceType")}
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
                {/* System Prompt */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("addAgent.fields.systemPrompt")}
                  </label>
                  <textarea
                    {...register("system_prompt", {
                      required: t("addAgent.validation.systemPromptRequired"),
                    })}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors resize-none"
                    placeholder={t("addAgent.placeholders.systemPrompt")}
                  />
                  {errors.system_prompt && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.system_prompt.message}
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 text-white font-semibold rounded-lg shadow-lg bg-[#3d4b52] hover:shadow-xl hover:bg-[#2d3b42] transform cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  //   style={{ backgroundColor: "#3d4b52" }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("addAgent.submitting")}
                      </span>
                    ) : (
                      t("addAgent.submit")
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 mt-0.5 mr-3 shrink-0"
                style={{ color: "#3d4b52" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-600">{t("addAgent.info")}</p>
            </div>
          </div>
        </div>
      </div>
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
};

export default AddAgents;
