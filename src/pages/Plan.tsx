import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiUserAddFill } from "react-icons/ri";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import {
  getUsersAgent,
  postAddPlan,
  getSubscriptionPlanByUserId,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
} from "../api/api";
import toast from "react-hot-toast";
import type { PlanFormData } from "../Interface/AddPlan";

const Plan = () => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<any>({
    defaultValues: {
      user_id: "",
      user: null,
      name: "",
      price: "",
      features: "",
      included_minutes: "",
      is_active: "false",
      currency: "EUR",
    },
  });

  const selectedUserId = watch("user_id");

  const clearPlanFields = () => {
    setValue("name", "");
    setValue("price", "");
    setValue("features", "");
    setValue("included_minutes", "");
    setValue("is_active", "false");
    setValue("currency", "EUR");
  };

  const onSubmit = async (data: PlanFormData) => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error(t("addAgent.toast.tokenMissing"));
        return;
      }

      const res = hasPlan
        ? await updateSubscriptionPlan(token, data)
        : await postAddPlan(token, data);

      toast.success(
        res?.message ||
          (hasPlan
            ? "Plan updated successfully"
            : t("plan.toast.agentCreated")),
      );

      setHasPlan(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          (hasPlan ? "Plan update failed" : t("plan.toast.createFailed")),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePlan = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error(t("addAgent.toast.tokenMissing"));
      return;
    }

    if (!selectedUserId) {
      toast.error("Please select user first");
      return;
    }

    setIsDeleting(true);

    try {
      const res = await deleteSubscriptionPlan(token, Number(selectedUserId));

      toast.success(res?.message || "Plan deleted successfully");

      setHasPlan(false);
      clearPlanFields();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Plan delete failed",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoadingUsers(true);

      try {
        const response = await getUsersAgent(token);

        if (response?.success) {
          setUsersList(response.users || []);
        } else if (response?.data?.success) {
          setUsersList(response.data.users || []);
        }
      } catch (error) {
        toast.error(t("addAgent.toast.loadUsersFailed"));
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [t]);

  useEffect(() => {
    const fetchUserPlan = async () => {
      const token = localStorage.getItem("token");

      if (!token || !selectedUserId) {
        setHasPlan(false);
        clearPlanFields();
        return;
      }

      setLoadingPlan(true);

      try {
        const res = await getSubscriptionPlanByUserId(
          token,
          Number(selectedUserId),
        );

        const plan = res?.plan || res?.data || res;
        console.log(plan);

        if (plan && Object.keys(plan).length > 0) {
          setHasPlan(true);

          setValue("name", plan.name || "");
          setValue("price", plan.price ?? "");
          setValue("features", plan.features || "");
          setValue("included_minutes", plan.included_minutes ?? "");
          setValue("is_active", String(plan.is_active ?? false));
          setValue("currency", plan.currency || "USD");
        } else {
          setHasPlan(false);
          clearPlanFields();
        }
      } catch {
        setHasPlan(false);
        clearPlanFields();
      } finally {
        setLoadingPlan(false);
      }
    };

    fetchUserPlan();
  }, [selectedUserId]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="p-3 flex mb-4 justify-center mt-16!">
              <RiUserAddFill size={30} className="mt-2 mx-5" color="#3d4b52" />

              <h1 className="text-4xl font-bold text-[#3d4b52] mb-2">
                {t("plan.title")}
              </h1>
            </div>

            <p className="text-gray-600">{t("plan.subtitle")}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("addAgent.fields.selectUser")}
                  </label>

                  <select
                    {...register("user_id", {
                      required: t("plan.validate.user"),
                    })}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const user = usersList.find(
                        (u) => String(u.id) === String(selectedId),
                      );

                      setValue("user_id", selectedId);
                      setValue("user", user || null);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors bg-white"
                  >
                    <option value="">
                      {loadingUsers
                        ? t("plan.loadingUsers")
                        : t("plan.validate.user")}
                    </option>

                    {usersList.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username} ({user.email})
                      </option>
                    ))}
                  </select>

                  {errors.user_id && (
                    <p className="mt-1 text-sm text-red-600">
                      {String(errors.user_id.message)}
                    </p>
                  )}

                  {loadingPlan && (
                    <p className="mt-2 text-sm text-gray-500">
                      {t("plan.checkUserPlan")}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("plan.fields.name")}
                    </label>

                    <input
                      type="text"
                      {...register("name", {
                        required: t("plan.validate.planName"),
                      })}
                      placeholder={t("plan.placeholders.name")}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    />

                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(errors.name.message)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("plan.fields.price")}
                    </label>

                    <input
                      type="number"
                      step="0.01"
                      {...register("price", {
                        required: t("plan.validate.planPrice"),
                      })}
                      placeholder={t("plan.placeholders.price")}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    />

                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(errors.price.message)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("plan.fields.features")}
                    </label>

                    <input
                      type="text"
                      {...register("features", {
                        required: t("plan.validate.features"),
                      })}
                      placeholder={t("plan.placeholders.features")}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    />

                    {errors.features && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(errors.features.message)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("plan.fields.minutes")}
                    </label>

                    <input
                      type="number"
                      {...register("included_minutes", {
                        required: t("plan.validate.minutes"),
                      })}
                      placeholder={t("plan.placeholders.minutes")}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    />

                    {errors.included_minutes && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(errors.included_minutes.message)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Currency
                    </label>

                    <input
                      type="text"
                      {...register("currency")}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("plan.fields.isActive")}
                    </label>

                    <select
                      {...register("is_active", {
                        required: t("plan.validate.isActive"),
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3d4b52] focus:ring-0 outline-none transition-colors bg-white"
                    >
                      <option value="true">Active</option>
                      <option value="false">Deactive</option>
                    </select>

                    {errors.is_active && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(errors.is_active.message)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || loadingPlan}
                    className="w-full py-4 px-6 cursor-pointer text-white font-semibold rounded-lg shadow-lg bg-[#3d4b52] hover:bg-[#2d3b42] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? t("plan.bting")
                      : hasPlan
                        ? t("plan.updateBtn")
                        : t("plan.btn")}
                  </button>

                  {hasPlan && (
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={handleDeletePlan}
                      className="w-full py-4 px-6 cursor-pointer text-white font-semibold rounded-lg shadow-lg bg-red-600 hover:bg-red-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? t("plan.deleting") : t("plan.delete")}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
