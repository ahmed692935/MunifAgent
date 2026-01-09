

function CallActivity() {
    return (
        <div className="border border-[#0000001A] rounded-[14px] bg-white p-6 w-full">
            <h2 className="text-base font-medium">
                Today's Activity
            </h2>

            {/* total Calls */}
            <div className="flex gap-4 justify-between item-center mt-3">
                <p className="text-base text-[#4A5565]">Total Calls</p>
                <p className="text-2xl font-semibold text-[#0A0A0A]">24</p>
            </div>

            {/* Missed Calls */}
            <div className="flex gap-4 justify-between item-center mt-3">
                <p className="text-base text-[#4A5565]">Missed</p>
                <p className="text-2xl font-semibold text-[#E7000B]">3</p>
            </div>
        </div>
    )
}

export default CallActivity
