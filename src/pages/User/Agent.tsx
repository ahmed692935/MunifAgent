import Navbar from '../../components/Navbar'

function Agent() {
  return (
    <div className="bg-[#F9FAFB] py-10 pt-25 px-5 h-screen">
            <Navbar />
            <div className="max-w-[1216px] mx-auto bg-white p-6 border border-[#0000001A] rounded-[14px]">
                <div className="flex gap-5 justify-between">
                    <h1>Agents</h1>
                </div>
            </div>
        </div>
  )
}

export default Agent