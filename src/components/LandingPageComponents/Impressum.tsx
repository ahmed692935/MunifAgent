import { useState } from "react";
import { useTranslation } from "react-i18next";

type ImpressumData = {
  owner: string;
  address: string;
  email: string;
  phone: string;
  responsible: string;
};

type ImpressumLabels = {
  owner: string;
  address: string;
  contact: string;
  email: string;
  phone: string;
  responsible: string;
};

const Impressum = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const impressumData = t("legal.impressum.data", {
    returnObjects: true,
  }) as ImpressumData;

  const labels = t("legal.impressum.labels", {
    returnObjects: true,
  }) as ImpressumLabels;

  return (
    <>
      <div className="">
        <button
          onClick={() => setOpen(true)}
          className="px-20 py-3 bg-white font-bold text-[#3d4b52] rounded-xl shadow-md hover:bg-gray-300 transition-all"
        >
          {t("legal.impressum.button")}
        </button>
      </div>
      <section className="max-w-7xl mx-auto py-5 px-5">
        {/* ---------- Button to open Modal ---------- */}

        {/* ---------- POPUP MODAL ---------- */}
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[90vh]">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#3d4b52]">
                  {t("legal.impressum.title")}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-600 text-xl hover:text-black"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-lg">{labels.owner}</h3>
                  <p>{impressumData.owner}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{labels.address}</h3>
                  <p>{impressumData.address}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{labels.contact}</h3>
                  <p>
                    {labels.email}: {impressumData.email}
                  </p>
                  <p>
                    {labels.phone}: {impressumData.phone}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {labels.responsible}
                  </h3>
                  <p>{impressumData.responsible}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Impressum;
