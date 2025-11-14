import { useTranslation } from "react-i18next";

function Footer() {

    // Add Translate
    const { t } = useTranslation();

    return (
        <footer className="bg-[#3d4b52] py-8 px-5">
            <p className="text-center text-sm text-white">
                ©{new Date().getFullYear()} | {t("footer.rights")}
            </p>
        </footer>
    )
}

export default Footer
