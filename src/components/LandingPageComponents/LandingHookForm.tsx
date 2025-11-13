import { useForm } from "react-hook-form";
import type { IFormInput } from "../../Interface/LandingPage";

function LandingHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Subscribe to Our News
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* First Name */}
          <div className="w-full relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="w-full px-3 py-2 border rounded-full border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
              placeholder="First Name"
            />
          </div>

          {/* Last Name */}
          <div className="w-full relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="w-full px-3 py-2 border rounded-full border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
              placeholder="Last Name"
            />
          </div>
        </div>

        {/* Email */}
        <div className=" relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            className="w-full px-3 py-2 border rounded-full border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 absolute -bottom-5 pl-4">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* News */}
        <div className=" relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            News
          </label>
          <textarea
            {...register("news")}
            className="w-full px-3 py-2 border rounded-3xl border-[#3d4b52] text-[#3d4b52] focus:outline-none focus:border-[#3d4b52]/70"
            rows={3}
            placeholder="News..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#3d4b52] hover:bg-[#3d4b52]/80 text-white font-medium py-2 mt-4 px-5 rounded-full transition-all cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default LandingHookForm;
