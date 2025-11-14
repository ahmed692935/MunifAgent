import { useEffect, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/Images/MrBot_Logo.webp";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import { FaChevronDown, FaRegUserCircle } from "react-icons/fa";


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

    // Logged In user
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const [openDropdown, setOpenDropdown] = useState(false);


    return (
        <header
            className={`fixed top-0 left-0 w-full h-16 sm:h-20 z-50 transition-all duration-300 px-4 md:px-8 ${isScrolled ? "bg-[#fffeff] shadow-md" : "bg-[#fffeff] shadow-xl"
                }`}
        >
            <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="w-20 h-16 sm:h-20">
                    <img
                        src={Logo}
                        alt="Logo"
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                </Link>

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

                    {/* IF USER IS LOGGED IN */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setOpenDropdown(!openDropdown)}
                                className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer"
                            >

                                {/* 5 Characters + ... */}
                                <span className="font-semibold text-[#3d4b52]">
                                    {user.email.slice(0, 5)}...
                                </span>

                                <FaRegUserCircle />
                                <FaChevronDown className="text-[#3d4b52]" size={12} />
                            </button>


                            {/* DROPDOWN */}
                            {openDropdown && (
                                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">

                                    {/* FULL EMAIL SHOW */}
                                    <div className="px-4 py-2 border-b border-gray-200 text-[#3d4b52]/70">
                                        {user.email}
                                    </div>

                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 hover:bg-gray-100 text-[#3d4b52]"
                                    >
                                        Dashboard
                                    </Link>

                                    <button
                                        onClick={() => dispatch(logout())}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[#3d4b52]"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}

                        </div>
                    ) : (
                        <>
                            {/* IF USER IS NOT LOGGED IN → SHOW SIGNUP + LOGIN */}
                            <Link
                                to="/signup"
                                className={`h-9 sm:h-10 px-3 sm:px-5 text-sm sm:text-base rounded-md font-semibold flex items-center justify-center transition-all duration-300 ${isScrolled
                                    ? "bg-white text-[#3d4b52] border border-[#3d4b52]"
                                    : "bg-white text-[#3d4b52] border border-[#3d4b52]"
                                    }`}
                            >
                                {t("auth.signup")}
                            </Link>

                            <Link
                                to="/signin"
                                className={`h-9 sm:h-10 px-3 sm:px-5 text-sm sm:text-base rounded-md font-semibold flex items-center justify-center transition-all duration-300 ${isScrolled
                                    ? "bg-white text-[#3d4b52] border border-[#3d4b52]"
                                    : "bg-white text-[#3d4b52] border border-[#3d4b52]"
                                    }`}
                            >
                                {t("auth.login")}
                            </Link>
                        </>
                    )}

                    {/* Language Switcher */}
                    <select
                        onChange={(e) => changeLanguage(e.target.value)}
                        value={i18n.language}
                        className="h-9 sm:h-10 px-2 text-base rounded-md bg-white text-[#3d4b52] border border-[#3d4b52] font-semibold cursor-pointer"
                    >
                        <option value="en">English</option>
                        <option value="de">German</option>
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

                        {user ? (
                            <>
                                <div className="flex items-center gap-3 bg-white border border-[#3d4b52] p-3 rounded-md">
                                    <FaRegUserCircle />
                                    <span className="font-semibold text-[#3d4b52]">
                                        {user.email}
                                    </span>
                                </div>

                                <Link
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-[#3d4b52] text-white py-2 rounded-md font-semibold text-center"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={() => {
                                        dispatch(logout());
                                        setMenuOpen(false);
                                    }}
                                    className="bg-white border border-[#3d4b52] text-[#3d4b52] py-2 rounded-md font-semibold"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-[#3d4b52] text-white py-2 rounded-md font-semibold text-center"
                                >
                                    {t("auth.signup")}
                                </Link>

                                <Link
                                    to="/signin"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-white border border-[#3d4b52] text-[#3d4b52] py-2 rounded-md font-semibold text-center"
                                >
                                    {t("auth.login")}
                                </Link>
                            </>
                        )}

                        <select
                            onChange={(e) => {
                                changeLanguage(e.target.value);
                                setMenuOpen(false);
                            }}
                            value={i18n.language}
                            className="h-10 px-2 text-base rounded-md border border-[#3d4b52] bg-white text-[#3d4b52] font-semibold cursor-pointer"
                        >
                            <option value="en">English</option>
                            <option value="de">German</option>
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
