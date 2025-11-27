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

  const impressumData = t("legal.impressum.data", {
    returnObjects: true,
  }) as ImpressumData;
  const labels = t("legal.impressum.labels", {
    returnObjects: true,
  }) as ImpressumLabels;

  return (
    <section className="max-w-7xl mx-auto py-16 px-5">
      <h2 className="text-4xl md:text-5xl font-bold text-[#3d4b52] text-center mb-12">
        {t("legal.impressum.title")}
      </h2>

      <p className="text-center text-gray-600 mb-8">
        {t("legal.impressum.desc")}
      </p>

      <div className="bg-white shadow-xl rounded-3xl p-10 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Owner */}
          <div>
            <h3 className="text-xl font-semibold text-[#3d4b52] mb-2">
              {labels.owner}
            </h3>
            <p className="text-gray-700">{impressumData.owner}</p>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-semibold text-[#3d4b52] mb-2">
              {labels.address}
            </h3>
            <p className="text-gray-700">{impressumData.address}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-[#3d4b52] mb-2">
              {labels.contact}
            </h3>
            <p className="text-gray-700">
              {labels.email} {impressumData.email}
            </p>
            <p className="text-gray-700">
              {labels.phone} {impressumData.phone}
            </p>
          </div>

          {/* Responsible */}
          <div>
            <h3 className="text-xl font-semibold text-[#3d4b52] mb-2">
              {labels.responsible}
            </h3>
            <p className="text-gray-700">{impressumData.responsible}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impressum;
