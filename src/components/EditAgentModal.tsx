// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import type { AgentFormData, AgentType } from "../Interface/AddAgent";
// import { RiUserAddFill } from "react-icons/ri";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   data: AgentType | null;
//   onSave: (updated: AgentFormData) => void;
// }

// const EditAgentModal = ({ open, onClose, data, onSave }: Props) => {
//   const [preview, setPreview] = useState<string | null>(null);

//   const { register, handleSubmit, reset } = useForm<AgentFormData>();

//   useEffect(() => {
//     if (data) {
//       reset({
//         agent_name: data.name,
//         phone_number: data.phone,
//         business_name: data.business,
//         system_prompt: data.prompt,
//         agent_image: data.image,
//         industry: "",
//         language: "",
//         voice_type: "male",
//       });

//       setPreview(data.image);
//     }
//   }, [data, reset]);

//   if (!open) return null;

//   const submitHandler = (form: AgentFormData) => {
//     onSave({
//       ...form,
//       agent_image: preview || form.agent_image,
//     });
//     onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white w-[95%] md:w-[600px] rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-[#3d4b52] flex items-center gap-2">
//             <RiUserAddFill />
//             Edit Agent
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-black text-xl cursor-pointer"
//           >
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
//           {/* Image */}
//           <div className="flex flex-col items-center">
//             <label className="block text-sm font-semibold mb-2">
//               Agent Image
//             </label>

//             <label className="relative w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#3d4b52]">
//               {preview ? (
//                 <img src={preview} className="w-full h-full object-cover" />
//               ) : (
//                 <span className="text-gray-500 text-sm text-[#3d4b52]">
//                   Upload +
//                 </span>
//               )}

//               <input
//                 type="file"
//                 accept="image/*"
//                 {...register("agent_image")}
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) setPreview(URL.createObjectURL(file));
//                 }}
//                 className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
//               />
//             </label>
//           </div>

//           {/* Name */}
//           <div>
//             <label className="text-sm font-semibold text-[#3d4b52]">
//               Agent Name
//             </label>
//             <input
//               {...register("agent_name")}
//               className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="text-sm font-semibold text-[#3d4b52]">
//               Phone
//             </label>
//             <input
//               {...register("phone_number")}
//               className="w-full border-2 px-3 py-2 rounded-lg mt-1 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
//             />
//           </div>

//           {/* Business */}
//           <div>
//             <label className="text-sm font-semibold text-[#3d4b52]">
//               Business Name
//             </label>
//             <input
//               {...register("business_name")}
//               className="w-full border-2 px-3 py-2 rounded-lg mt-1 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
//             />
//           </div>

//           {/* System Prompt */}
//           <div>
//             <label className="text-sm font-semibold text-[#3d4b52]">
//               System Prompt
//             </label>
//             <textarea
//               rows={4}
//               {...register("system_prompt")}
//               className="w-full border-2 px-3 py-2 rounded-lg mt-1 border-gray-300 rounded-lg focus:outline-none focus:border-[#3d4b52] transition-colors"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#3d4b52] text-white py-3 rounded-lg hover:bg-[#2d3b42] transition cursor-pointer"
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditAgentModal;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { AgentFormData, AgentType } from "../Interface/AddAgent";
import { RiUserAddFill } from "react-icons/ri";
import { updateAgent } from "../api/api";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

interface Props {
  open: boolean;
  onClose: () => void;
  data: AgentType | null;
  onSave: (updated: AgentFormData) => void;
}

const EditAgentModal = ({ open, onClose, data, onSave }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgentFormData>();

  useEffect(() => {
    if (data) {
      reset({
        agent_name: data.agent_name || "",
        phone_number: data.phone_number || "",
        business_name: data.owner_name || "",
        industry: data.industry || "",
        language: data.language || "",
        voice_type: data.voice_type || "",
        system_prompt: data.system_prompt || "",
        agent_image: data.avatar_presigned_url || "",
      });

      setPreview(data.avatar_presigned_url || null);
    }
  }, [data, reset]);

  if (!open) return null;

  // const submitHandler = (form: AgentFormData) => {
  //   onSave({
  //     ...form,
  //     agent_image: preview || form.agent_image,
  //   });
  //   onClose();
  // };

  const submitHandler = async (form: AgentFormData) => {
    const token = localStorage.getItem("token");
    if (!token || !data) return;
    setIsLoading(true);

    try {
      // Prepare FormData for image upload
      const formData = new FormData();
      formData.append("agent_name", form.agent_name);
      formData.append("phone_number", form.phone_number);
      formData.append("owner_name", form.business_name);
      formData.append("industry", form.industry);
      formData.append("language", form.language);
      formData.append("voice_type", form.voice_type);
      formData.append("system_prompt", form.system_prompt);

      if (
        form.agent_image &&
        typeof form.agent_image !== "string" &&
        form.agent_image[0]
      ) {
        formData.append("avatar", form.agent_image[0]);
      }

      // Call API
      const res = await updateAgent(token, data.id, formData);

      // Notify user
      toast.success(res?.message || "Agent updated successfully");

      onSave(res?.data || form);
      onClose();
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Failed to update agent");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            Edit Agent
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
              Agent Image
            </label>

            <label className="relative w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#3d4b52]">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-sm text-[#3d4b52]">
                  Upload +
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
                Agent Name
              </label>
              <input
                {...register("agent_name", {
                  required: "Agent name is required",
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
                Phone Number
              </label>
              <input
                {...register("phone_number", {
                  required: "Phone number is required",
                })}
                className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
              />
              {errors.phone_number && (
                <p className="text-sm text-red-600">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          {/* Business & Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-[#3d4b52]">
                Business Name
              </label>
              <input
                {...register("business_name")}
                className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#3d4b52]">
                Industry
              </label>
              <input
                {...register("industry")}
                className="w-full border-2 mt-1 px-3 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-[#3d4b52]"
              />
            </div>
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
                Language
              </label>

              <select
                {...register("language", {})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
      focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors bg-white"
              >
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="de">German</option>
                <option value="fr">French</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="pl">Polish</option>
                <option value="nl">Dutch</option>
              </select>
            </div>

            <div>
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
            </div>
          </div>

          {/* System Prompt */}
          <div>
            <label className="text-sm font-semibold text-[#3d4b52]">
              System Prompt
            </label>
            <textarea
              {...register("system_prompt", {
                required: "System prompt is required",
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
    ${
      isLoading
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
                Updating...
              </span>
            ) : (
              "Save Changes"
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
  );
};

export default EditAgentModal;
