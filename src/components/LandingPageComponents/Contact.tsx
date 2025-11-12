import LandingHookForm from "../../components/LandingPageComponents/LandingHookForm"

function Contact() {
    return (
        <section id="contact" className="max-w-6xl mx-auto scroll-mt-20 py-14 px-5">
            <div className="flex flex-col md:flex-row w-full gap-10 justify-between">

                {/* Left Content */}
                <div className="md:w-[50%] md:max-w-2xs w-full">
                    <h2 className="md:text-5xl text-4xl text-[#3d4b52] font-bold mb-10">Get in touch with us</h2>
                    <p className="text-gray-700 leading-relaxed">Are you interested in collaborating? Please fill out the form and we will get back to you shortly. We look forward to hearing from you.</p>
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
