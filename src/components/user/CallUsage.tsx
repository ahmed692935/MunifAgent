

function CallUsage() {

    const percentage = 82;
    const usedMinutes = 410;
    const totalMinutes = 500;
    const resetDays = 8;

    return (
        <div className="border border-[#0000001A] rounded-[14px] bg-white p-6 w-full max-w-2xl shadow-sm">
            {/* Title */}
            <h2 className="text-base font-semibold text-gray-900">
                Plan Usage
            </h2>

            {/* Percentage Section */}
            <div className="mt-3 flex items-baseline justify-between">
                <h2 className="text-3xl font-semibold text-[#0A0A0A] tracking-tight">
                    {percentage}%
                </h2>
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Used
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 w-full bg-[#03021333] rounded-full h-3">
                <div
                    className="bg-[#0A0A0B] h-full rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            {/* Footer Info */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500 font-medium">
                <span>{usedMinutes} / {totalMinutes} Minutes</span>
                <span>Resets in {resetDays} days</span>
            </div>
        </div>
    )
}

export default CallUsage
