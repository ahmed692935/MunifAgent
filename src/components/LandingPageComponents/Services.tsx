// import { useTranslation } from "react-i18next";

// function Services() {
//   // Add Translate
//   const { t } = useTranslation();

//   // Get translated array from JSON
//   const servicesData = t("services.items") as unknown as {
//     id: number;
//     title: string;
//     desc: string;
//   }[];

//   return (
//     <section
//       id="services"
//       className="max-w-7xl mx-auto scroll-mt-20 py-14 px-5"
//     >
//       <h2 className="md:text-5xl text-4xl text-[#3d4b52] font-bold text-center">
//         {t("services.title")}
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
//         {servicesData.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 p-6 transition-all duration-300"
//           >
//             <h3 className="text-xl font-bold text-[#3d4b52] mb-3">
//               {item.title}
//             </h3>
//             <p className="text-gray-700 leading-relaxed">{item.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Services;

import { useTranslation } from "react-i18next";

function Services() {
  const { t } = useTranslation();

  // Legal requirements data
  const legalData = [
    {
      id: 1,
      title: t("legal.impressum.title"),
      desc: t("legal.impressum.desc"),
    },
    {
      id: 2,
      title: t("legal.privacy.title"),
      desc: t("legal.privacy.desc"),
    },
    {
      id: 3,
      title: t("legal.notEnough.title"),
      desc: t("legal.notEnough.desc"),
    },
    {
      id: 4,
      title: t("legal.risks.title"),
      desc: t("legal.risks.desc"),
    },
    {
      id: 5,
      title: t("legal.recommendation.title"),
      desc: t("legal.recommendation.desc"),
    },
  ];

  return (
    <section
      id="services"
      className="max-w-7xl mx-auto scroll-mt-20 py-14 px-5"
    >
      <h2 className="md:text-5xl text-4xl text-[#3d4b52] font-bold text-center">
        {t("legal.title")}
      </h2>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10"> */}
      <div className="mt-10 flex flex-col gap-4">
        {legalData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 p-6 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-[#3d4b52] mb-3">
              {item.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
