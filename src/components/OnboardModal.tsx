import { useState } from "react";
import { RiUserAddFill } from "react-icons/ri";
import { adminCreateUser } from "../api/api";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onUserAdded?: () => void;
}

interface FormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const OnboardModal = ({ open, onClose, onUserAdded }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);

    try {
      const res = await adminCreateUser(token, formData);
      if (res.success || res) { // Adjust based on actual API response structure
        toast.success(res.message || "User created successfully!");
        setFormData({
            username: "",
            email: "",
            first_name: "",
            last_name: "",
        });
        if (onUserAdded) onUserAdded();
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[550px] rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#3d4b52] flex items-center gap-2">
            <RiUserAddFill />
            Onboard New User
          </h2>
          <button
            disabled={isLoading}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl cursor-pointer disabled:cursor-not-allowed"
          >
            ✕
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-[#3d4b52] mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4b52]/20 focus:border-[#3d4b52] transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-[#3d4b52] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4b52]/20 focus:border-[#3d4b52] transition-all"
              required
            />
          </div>

          <div className="flex md:flex-row flex-col gap-4">
            {/* first name */}
            <div className="w-full">
              <label className="block text-sm font-semibold text-[#3d4b52] mb-1.5">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4b52]/20 focus:border-[#3d4b52] transition-all"
              />
            </div>

            {/* last name */}
            <div className="w-full">
              <label className="block text-sm font-semibold text-[#3d4b52] mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4b52]/20 focus:border-[#3d4b52] transition-all"
              />
            </div>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3d4b52] text-white py-3 rounded-lg font-semibold hover:bg-[#2d3b42] transition-colors cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                </>
            ) : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardModal;
