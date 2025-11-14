import { useTranslation } from "react-i18next";
import LandingHookForm from "../../components/LandingPageComponents/LandingHookForm"

function Contact() {

    // Add translate
    const { t } = useTranslation();

    return (
        <section id="contact" className="max-w-6xl mx-auto scroll-mt-20 py-14 px-5">
            <div className="flex flex-col md:flex-row w-full gap-10 justify-between">

                {/* Left Content */}
                <div className="md:w-[50%] md:max-w-[40%] w-full">
                    <h2 className="md:text-5xl text-4xl text-[#3d4b52] font-bold mb-10">
                        {t("contact.title")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t("contact.description")}
                    </p>
                </div>

                {/* Right Content Hook Form */}
                <div className="md:w-[50%] w-full">
                    <LandingHookForm />
                </div>
            </div>
        </section>
    )
}

export default Contact
