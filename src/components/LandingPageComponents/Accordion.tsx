import { useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Impressum from "../../components/LandingPageComponents/Impressum";
import PrivaryPolicy from "../../components/LandingPageComponents/PrivaryPolicy";

function Accordion() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqData = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
  ];

  return (
    <section className=" py-14 px-5 bg-[#3d4b52]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row w-full gap-10 justify-between">
          {/* Left content */}
          <div className="md:w-[40%] w-full">
            <h2 className="md:text-5xl text-4xl text-[#fffeff] font-bold leading-15">
              {t("faq.title")}
            </h2>
            <p className="text-[#fffeff] text-base pt-5">{t("faq.subtitle")}</p>
          </div>

          {/* Right content */}
          <div className="md:w-[50%] w-full">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border-b border-[#fffeff] overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between items-center w-full px-0 py-5 text-xl font-semibold text-[#fffeff] text-left transition cursor-pointer leading-relaxed"
                  >
                    <span>{item.question}</span>
                    <FiChevronDown
                      className={`text-[#fffeff] transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      size={22}
                    />
                  </button>

                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[index] = el;
                    }}
                    style={{
                      height: isOpen
                        ? `${contentRefs.current[index]?.scrollHeight}px`
                        : "0px",
                      transition: "height 0.3s ease, opacity 0.3s ease",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                    }}
                  >
                    {/* Inner wrapper for padding */}
                    <div className="pb-5 px-0 text-base leading-relaxed text-[#fffeff]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row">
          <Impressum />
          <PrivaryPolicy />
        </div>
      </div>
    </section>
  );
}

export default Accordion;
