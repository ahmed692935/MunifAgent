import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { AgentFormData, AgentType } from "../../Interface/AddAgent";
import { RiUserAddFill } from "react-icons/ri";
import { getLanguage } from "../../api/api";
import { putMyAgent } from "../../api/userDashboard";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  data: AgentType | null;
  onSave: (updated: AgentFormData) => void;
}

const EditAgent = ({ open, onClose, data, onSave }: Props) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [openVoicePopup, setOpenVoicePopup] = useState(false);
  const [voiceSamples, setVoiceSamples] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<any>(null);
  const [loadingVoiceSamples, setLoadingVoiceSamples] = useState(false);

  useEffect(() => {
    if (data) {
      setSelectedVoice({ voice_name: data.voice_type }); // default voice
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AgentFormData>();

  useEffect(() => {
    if (data) {
      reset({
        agent_name: data.agent_name || "",
        phone_number: data.phone_number || "",
        transfer_number: data.transfer_number || "",
        business_name: data.owner_name || "",
        industry: data.industry || "",
        language: data.language || "",
        voice_type: data.voice_type || "",
        system_prompt: data.system_prompt || "",
        agent_image: data.avatar_presigned_url || "",
        owner_email: data.owner_email || "",
        business_hours_start: data.business_hours_start || "",
        business_hours_end: data.business_hours_end || "",
        allowed_minutes: data.allowed_minutes || 0,
      });

      setPreview(data.avatar_presigned_url || null);
    }
  }, [data, reset]);

  if (!open) return null;

  const submitHandler = async (form: AgentFormData) => {
    const token = localStorage.getItem("token");
    if (!token || !data) return;
    setIsLoading(true);

    try {
      // Prepare FormData for image upload
      const formData = new FormData();
      formData.append("agent_name", form.agent_name);
    //   formData.append("phone_number", form.phone_number);
      formData.append("transfer_number", form.transfer_number || "");
      formData.append("owner_name", form.business_name);
      formData.append("industry", form.industry);
      formData.append("language", form.language);
      // formData.append("voice_type", form.voice_type);
      formData.append("voice_type", selectedVoice?.voice_name || "");
      formData.append("system_prompt", form.system_prompt);
      formData.append("owner_email", form.owner_email);
      // formData.append("business_hours_start", form.business_hours_start);
      // formData.append("business_hours_end", form.business_hours_end);
      if (form.business_hours_start !== data.business_hours_start)
        formData.append("business_hours_start", form.business_hours_start);

    //   if (form.business_hours_end !== data.business_hours_end)
        // formData.append("business_hours_end", form.business_hours_end);
    //   formData.append("allowed_minutes", form.allowed_minutes.toString());

      if (
        form.agent_image &&
        typeof form.agent_image !== "string" &&
        form.agent_image[0]
      ) {
        formData.append("avatar", form.agent_image[0]);
      }

      // Call API
      const res = await putMyAgent(token, data.id, formData);

      // Notify user
      toast.success(res?.message || t("editAgent.toast.updated"));

      onSave(res?.data || form);
      onClose();
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || t("editAgent.toast.updateFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white w-[95%] md:w-[600px] rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#3d4b52] flex items-center gap-2">
              <RiUserAddFill />
              {t("editAgent.title")}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-black text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            {/* Agent Image */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-semibold mb-2">
                {t("addAgent.fields.agentImage")}
              </label>

              <label className="relative w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#3d4b52]">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-sm text-[#3d4b52]">
                    {t("editAgent.uploadShort")}
                  </span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  {...register("agent_image")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-[#3d4b52]">
                  {t("addAgent.fields.agentName")}
                </label>
                <input
                  {...register("agent_name", {
                    required: t("addAgent.validation.agentNameRequired"),
                  })}
                  className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
                />
                {errors.agent_name && (
                  <p className="text-sm text-red-600">
                    {errors.agent_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#3d4b52]">
                  {t("addAgent.fields.phoneNumber")}
                </label>
                <input
                  disabled={true}
                  {...register("phone_number", {
                    required: t("addAgent.validation.phoneRequired"),
                  })}
                  className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52] cursor-not-allowed bg-gray-100"
                />
                {errors.phone_number && (
                  <p className="text-sm text-red-600">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#3d4b52]">
                {t("addAgent.fields.transferNumber") || "Transfer Number"}
              </label>
              <input
                type="tel"
                {...register("transfer_number")}
                className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
                placeholder="+49123456789"
              />
            </div>

            {/* Business & Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-[#3d4b52]">
                  {t("addAgent.fields.businessName")}
                </label>
                <input
                  {...register("business_name")}
                  className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("addAgent.fields.businessEmail")}
                </label>
                <input
                  type="email"
                  {...register("owner_email", {})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg 
        focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                  placeholder={t("addAgent.placeholders.ownerEmail")}
                />
              </div>

            </div>

            <div>
              <label className="text-sm font-semibold text-[#3d4b52]">
                {t("addAgent.fields.industry")}
              </label>
              <input
                {...register("industry")}
                className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
              />
            </div>
            {/* Language & Voice Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <div>
              <label className="text-sm font-semibold text-[#3d4b52]">
                Language
              </label>
              <input
                {...register("language")}
                className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
              />
            </div> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("addAgent.fields.language")}
                </label>

                <select
                  {...register("language", {})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
      focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors bg-white"
                >
                  <option value="">{t("editAgent.selectLanguage")}</option>
                  <option value="en">{t("addAgent.languageOptions.en")}</option>
                  <option value="de">{t("addAgent.languageOptions.de")}</option>
                  <option value="fr">{t("addAgent.languageOptions.fr")}</option>
                  <option value="it">{t("addAgent.languageOptions.it")}</option>
                  <option value="es">{t("addAgent.languageOptions.es")}</option>
                  <option value="nl">{t("addAgent.languageOptions.nl")}</option>
                </select>
              </div>

              {/* <div>
              <label className="text-sm font-semibold text-[#3d4b52]">
                Voice Type
              </label>
              <select
                {...register("voice_type")}
                className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
              </select>
            </div> */}
              <div>
                <label className="text-sm font-semibold text-[#3d4b52]">
                  {t("addAgent.fields.voiceType")}
                </label>

                <input
                  type="text"
                  readOnly
                  value={selectedVoice?.voice_name || ""}
                  onFocus={async () => {
                    // const lang = data?.language || "";
                    const lang = watch("language");

                    if (!lang) {
                      toast.error(t("addAgent.toast.selectLanguageFirst"));
                      return;
                    }

                    setOpenVoicePopup(true);
                    setLoadingVoiceSamples(true); // Start loader

                    try {
                      const token = localStorage.getItem("token") || "";
                      const res = await getLanguage({ language: lang, token });

                      setVoiceSamples(res.grouped_by_language?.[lang] || []);
                    } catch {
                      toast.error(t("addAgent.toast.voiceSamplesFailed"));
                    } finally {
                      setLoadingVoiceSamples(false); // Stop loader
                    }
                  }}
                  className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 
    focus:outline-none focus:border-[#3d4b52] cursor-pointer bg-white"
                  placeholder={t("editAgent.voicePlaceholder")}
                />
              </div>
            </div>

            {/* System Prompt */}
            <div>
              <label className="text-sm font-semibold text-[#3d4b52]">
                {t("addAgent.fields.systemPrompt")}
              </label>
              <textarea
                {...register("system_prompt", {
                  required: t("addAgent.validation.systemPromptRequired"),
                })}
                rows={5}
                className="w-full border-2 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
              />
            </div>

            {/* Save */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg transition cursor-pointer text-white
    ${isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#3d4b52] hover:bg-[#2d3b42]"
                }
  `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  {t("editAgent.saving")}
                </span>
              ) : (
                t("editAgent.saveChanges")
              )}
            </button>

            {/* <button
            type="submit"
            className="w-full bg-[#3d4b52] text-white py-3 rounded-lg hover:bg-[#2d3b42] transition cursor-pointer"
          >
            Save Changes
          </button> */}
          </form>
        </div>
      </div>
      {openVoicePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white w-[90%] md:w-[500px] p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-bold mb-3 text-[#3d4b52]">
              {t("editAgent.voiceModal.title")}
            </h3>

            {/* <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
              {voiceSamples.length > 0 ? (
                voiceSamples.map((voice, i) => (
                  <div
                    key={i}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedVoice(voice);
                      setOpenVoicePopup(false);
                    }}
                  >
                    <p className="font-semibold">{voice.voice_name}</p>
                    <audio
                      controls
                      src={voice.audio_url}
                      className="mt-2 w-full"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No voices available</p>
              )}
            </div> */}
            <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
              {loadingVoiceSamples ? (
                <div className="col-span-full flex justify-center items-center py-10">
                  <svg
                    className="animate-spin h-8 w-8 text-[#3d4b52]"
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
              ) : voiceSamples.length > 0 ? (
                voiceSamples.map((voice, i) => (
                  <div
                    key={i}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedVoice(voice);
                      setOpenVoicePopup(false);
                    }}
                  >
                    <p className="font-semibold">{voice.voice_name}</p>
                    <audio
                      controls
                      src={voice.audio_url}
                      className="mt-2 w-full"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">{t("editAgent.voiceModal.noVoices")}</p>
              )}
            </div>

            <button
              onClick={() => setOpenVoicePopup(false)}
              className="mt-4 bg-[#3d4b52] hover:bg-[#2d3b42] cursor-pointer text-white px-4 py-2 rounded-lg w-full"
            >
              {t("addAgent.voiceModal.close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAgent;
