import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AgentFormData } from "../Interface/AddAgent";
import { RiUserAddFill } from "react-icons/ri";

const AddAgents = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AgentFormData>();

  const onSubmit = async (data: AgentFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form Data:", data);
    setIsSubmitting(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="p-3 flex mb-4 justify-center">
            <RiUserAddFill size={30} className="mt-2 mx-5" color="#3d4b52" />
            <h1 className="text-4xl font-bold text-[#3d4b52] mb-2">
              Add New Agent
            </h1>
          </div>

          <p className="text-gray-600">Create and configure your AI agent </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Agent Name & Phone Number Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    {...register("agent_name", {
                      required: "Agent name is required",
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    // style={{ focusBorderColor: "#3d4b52" }}
                    placeholder="Enter agent name"
                  />
                  {errors.agent_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.agent_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phone_number", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-() ]+$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
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
                    Business Name
                  </label>
                  <input
                    type="text"
                    {...register("business_name", {})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    placeholder="Enter business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    {...register("industry", {})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    placeholder="e.g., Healthcare, Finance, Retail"
                  />
                </div>
              </div>

              {/* Language & Voice Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Language
                  </label>
                  <input
                    type="text"
                    {...register("language", {})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    placeholder="e.g., English, German"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Voice Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["male", "female", "binary"] as const).map((type) => (
                      <label
                        key={type}
                        className="relative flex items-center justify-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={type}
                          {...register("voice_type", {
                            required: "Voice type is required",
                          })}
                          className="sr-only peer"
                        />
                        <div
                          className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-center font-medium text-gray-700 peer-checked:border-2 peer-checked:text-white transition-all capitalize"
                          style={{
                            backgroundColor: "transparent",
                            borderColor: "#e5e7eb",
                          }}
                          onMouseOver={(e) => {
                            const input = e.currentTarget
                              .previousElementSibling as HTMLInputElement | null;
                            if (!input?.checked)
                              e.currentTarget.style.backgroundColor = "#f3f4f6";
                          }}
                          onMouseOut={(e) => {
                            const input = e.currentTarget
                              .previousElementSibling as HTMLInputElement | null;
                            if (!input?.checked)
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                          }}
                        >
                          {type}
                        </div>
                        <style>{`
                          input[type="radio"]:checked + div {
                            background-color: #3d4b52 !important;
                            border-color: #3d4b52 !important;
                          }
                        `}</style>
                      </label>
                    ))}
                  </div>
                  {errors.voice_type && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.voice_type.message}
                    </p>
                  )}
                </div>
                <div></div>
              </div>

              {/* System Prompt */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  System Prompt
                </label>
                <textarea
                  {...register("system_prompt", {
                    required: "System prompt is required",
                  })}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
           focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors resize-none"
                  placeholder="Define the agent's behavior, personality, and guidelines..."
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
                      Creating Agent...
                    </span>
                  ) : (
                    "Create Agent"
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
              className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
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
            <p className="text-sm text-gray-600">
              Configure your AI agent with specific instructions and
              characteristics. The system prompt defines how the agent will
              interact with users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAgents;
