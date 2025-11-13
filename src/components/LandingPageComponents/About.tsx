import AssisstantImg from "../../assets/Images/assisstant-img.webp"
import { useTranslation } from "react-i18next";

function About() {

    // Add Translate
    const { t } = useTranslation();

    return (
        <section id="about" className="max-w-6xl mx-auto scroll-mt-20 py-14 px-5">
            <div className="flex flex-col md:flex-row w-full items-center md:gap-10 gap-6">

                {/* Left content */}
                <div className="md:w-[50%] w-full h-90">
                    <img src={AssisstantImg} alt="Img" loading="lazy" className="w-full h-full object-cover" />
                </div>

                {/* Right Content */}
                <div className="md:w-[50%] w-full">
                    <h2 className="md:text-5xl text-4xl font-semibold text-center md:text-left py-3 text-[#3d4b52]">
                        {t("about.title")}
                    </h2>
                    <h3 className="md:text-2xl text-3xl font-bold text-center md:text-left text-black py-3">
                        {t("about.subtitle")}
                    </h3>
                    <p className="text-base font-normal leading-relaxed text-center md:text-left py-3 text-gray-700">
                        {t("about.desc")}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About
