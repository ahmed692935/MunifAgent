import { useEffect, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/Images/MrBot_Logo.webp";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { key: "home", label: t("menu.home") },
        { key: "about", label: t("menu.about") },
        { key: "services", label: t("menu.services") },
        { key: "contact", label: t("menu.contact") }
    ];

    const changeLanguage = (lang: string) => i18n.changeLanguage(lang);

    return (
        <header
            className={`fixed top-0 left-0 w-full h-16 sm:h-20 z-50 transition-all duration-300 px-4 md:px-8 ${isScrolled ? "bg-[#fffeff] shadow-md" : "bg-[#fffeff] shadow-xl"
                }`}
        >
            <div className="max-w-6xl mx-auto w-full h-full flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="w-20 h-16 sm:h-20">
                    <img
                        src={Logo}
                        alt="Logo"
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                </a>

                {/* Desktop Nav */}
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {menuItems.map((item) => (
                        <li
                            key={item.key}
                            onClick={() => {
                                const section = document.getElementById(item.key);
                                if (section) {
                                    section.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className={`list-none cursor-pointer font-semibold transition-all duration-200 text-base ${isScrolled
                                ? "text-[#3d4b52] hover:text-[#3d4b52]/90"
                                : "text-[#3d4b52] hover:text-[#3d4b52]/90"
                                }`}
                        >
                            {item.label}
                        </li>
                    ))}
                </nav>


                {/* Desktop Auth Buttons + Language Switcher */}
                <div className="hidden md:flex items-center space-x-3">
                    <a
                        href="#"
                        className={`h-9 sm:h-10 px-3 sm:px-5 text-sm sm:text-base rounded-md font-semibold flex items-center justify-center transition-all duration-300 ${isScrolled
                            ? "bg-white text-[#3d4b52] border border-[#3d4b52] hover:bg-[#3d4b52]/10"
                            : "bg-white text-[#3d4b52]  border border-[#3d4b52] hover:bg-[#3d4b52]/10"
                            }`}
                    >
                        {t("auth.signup")}
                    </a>
                    <a
                        href="#"
                        className={`h-9 sm:h-10 px-3 sm:px-5 text-sm sm:text-base rounded-md font-semibold flex items-center justify-center transition-all duration-300 ${isScrolled
                            ? "bg-white text-[#3d4b52] border border-[#3d4b52] hover:bg-[#3d4b52]/10"
                            : "bg-white text-[#3d4b52]  border border-[#3d4b52] hover:bg-[#3d4b52]/10"
                            }`}
                    >
                        {t("auth.login")}
                    </a>

                    {/* Language Switcher */}
                    <select
                        onChange={(e) => changeLanguage(e.target.value)}
                        value={i18n.language}
                        className="h-9 sm:h-10 px-2 text-base rounded-md bg-white text-[#3d4b52] border border-[#3d4b52] hover:bg-[#3d4b52]/10 font-semibold cursor-pointer outline-0"
                    >
                        <option value="en">EN</option>
                        <option value="de">DE</option>
                    </select>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className={`md:hidden text-3xl focus:outline-none transition-colors duration-300 cursor-pointer ${isScrolled ? "text-[#3d4b52]" : "text-[#3d4b52]"
                        }`}
                >
                    <MdMenu />
                </button>
            </div>

            {/* Mobile Slide Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 sm:w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-5 left-5 text-3xl text-[#3d4b52] transition-all cursor-pointer"
                >
                    <MdClose />
                </button>

                <div className="flex flex-col items-center mt-20 space-y-6">
                    <ul className="flex flex-col items-center space-y-3">
                        {menuItems.map((item) => (
                            <li
                                key={item.key}
                                onClick={() => {
                                    const section = document.getElementById(item.key);
                                    if (section) {
                                        section.scrollIntoView({ behavior: "smooth" });
                                    }
                                    setMenuOpen(false);
                                }}
                                className="cursor-pointer text-[#3d4b52] font-semibold text-lg transition-colors duration-200"
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>


                    <div className="flex flex-col space-y-3 w-[80%] mt-7">
                        <a
                            href="#"
                            onClick={() => setMenuOpen(false)}
                            className="bg-[#3d4b52] text-white py-2 rounded-md font-semibold text-center transition-all"
                        >
                            {t("auth.signup")}
                        </a>
                        <a
                            href="#"
                            onClick={() => setMenuOpen(false)}
                            className="bg-white border border-[#3d4b52] text-[#3d4b52] py-2 rounded-md font-semibold text-center transition-all"
                        >
                            {t("auth.login")}
                        </a>

                        <select
                            onChange={(e) => {
                                changeLanguage(e.target.value);
                                setMenuOpen(false);
                            }}
                            value={i18n.language}
                            className="h-10 px-2 text-base rounded-md border border-[#3d4b52] bg-white text-[#3d4b52] outline-0 font-semibold cursor-pointer"
                        >
                            <option value="en">EN</option>
                            <option value="de">DE</option>
                        </select>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500"
                ></div>
            )}
        </header>
    );
}

export default Navbar;
