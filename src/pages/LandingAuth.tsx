import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowRight } from "react-icons/fa";

function LandingAuth() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const correctPassword = import.meta.env.VITE_LANDING_PASSWORD;

    // Check on mount if user already authenticated in this session
    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem("landingAuth");
        if (isAuthenticated === "true") {
            navigate("/landing", { replace: true });
        }
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password.trim() === correctPassword) {
            setError("");
            // Save authentication in sessionStorage
            sessionStorage.setItem("landingAuth", "true");
            navigate("/landing", { replace: true }); // replace to prevent back
        } else {
            setError("Incorrect password. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div
                className="px-8 py-10 bg-[#fffeff] rounded-2xl shadow-xl text-center w-full max-w-sm"
                style={{ boxShadow: "4px 5px 10px 3px #6e6c6e, 4px 4px 4px 1px #6e6c6e" }}
            >
                <FaLock className="text-4xl mb-4 text-[#3d4b52] mx-auto" />
                <h2 className="text-xl mb-6 font-semibold text-[#3d4b52]">Enter Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="relative rounded-md bg-[#3d4b52] flex items-center">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#fffeff] text-[#3d4b52] border border-[#3d4b52] outline-none"
                        />
                        {error && <p className="text-red-500 text-sm absolute -bottom-5">{error}</p>}

                        <button
                            type="submit"
                            className="flex items-center justify-center bg-[#3d4b52] rounded-full transition cursor-pointer absolute w-8 h-8 right-3"
                        >
                            <FaArrowRight color="#fffeff" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LandingAuth;
