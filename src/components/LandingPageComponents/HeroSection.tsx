import BgVideo from "../../assets/Images/hero-video.mp4";
import { useTranslation } from "react-i18next";

function HeroSection() {
  // Add translate
  const { t } = useTranslation();

  return (
    <section id="home" className=" scroll-mt-20 pb-10">
      {/* Bg video */}
      <div className="relative mt-16 sm:mt-20 w-full min-h-[30rem] md:h-[100vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={BgVideo} />
        </video>

        {/* Black overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>

        {/* Content */}
        <div className="relative container mx-auto h-full min-h-[inherit] px-3 sm:px-4 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl sm:text-5xl text-white font-bold text-center">
            {t("hero.title")}
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
