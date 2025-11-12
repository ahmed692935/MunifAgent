function Services() {
    const services = [
        {
            title: "Customer Calls",
            description:
                "MrBot answers every call politely – even after work hours or when your team is busy.",
        },
        {
            title: "Intelligent Conversation Management",
            description:
                "The AI assistant understands concerns, answers frequently asked questions, and gathers all important information – all in compliance with GDPR.",
        },
        {
            title: "Forwarding & Notification",
            description:
                "Important calls or messages are automatically forwarded to you or your team – via email, SMS, or chat. Appointments are entered and managed in your existing CRM system.",
        },
    ];

    return (
        <section id="services" className="max-w-6xl mx-auto scroll-mt-20 py-14 px-5">
            <h2 className="md:text-5xl text-4xl text-[#3d4b52] font-bold text-center">
                How MrBot Works
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {services.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 p-6 transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold text-[#3d4b52] mb-3">
                            {item.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;
