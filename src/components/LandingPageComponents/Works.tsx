import { useTranslation } from "react-i18next";


function Works() {

    // Add translate
    const { t } = useTranslation();

    // Get translated array from JSON
    const works = t("works.items") as unknown as {
        title: string;
        description: string;
    }[];



    return (
        <section className="max-w-6xl mx-auto scroll-mt-20 py-14 px-5">
            <h2 className="md:text-5xl text-4xl text-[#3d4b52] font-bold text-center">
                {t("works.heading")}
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                {works.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 p-6 transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold text-[#3d4b52] mb-3">
                            {item.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Works;
