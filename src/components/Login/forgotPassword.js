import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Social icons
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@mui/material"; // For dialog
import { FaShoppingCart, FaWarehouse, FaBoxOpen } from "react-icons/fa"; // Icons for visuals

const ForgotPasswordPage = () => {
  const [inputValue, setInputValue] = useState(""); // Single input for email or phone
  const [resetMethod, setResetMethod] = useState(""); // To manage if it's email or phone
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // For dialog
  const [timeLeft, setTimeLeft] = useState(300); // 5-minute timer in seconds
  const navigate = useNavigate(); // Hook for navigation

  // Handle input change and detect email or phone
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.includes("@")) {
      setResetMethod("email");
    } else {
      setResetMethod("phone");
    }
  };

  // Open the dialog box and start the timer
  const handleSendOtp = () => {
    if (!inputValue) {
      setError("Please enter an email or phone number");
      return;
    }
    setError("");
    setIsDialogOpen(true);
    setTimeLeft(300); // Reset the timer to 5 minutes
  };

  // Close the dialog box
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Countdown timer logic
  useEffect(() => {
    if (isDialogOpen && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isDialogOpen, timeLeft]);

  // Format the time left into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex min-h-screen overflow-hidden relative">
      {/* Full Page Background with 3D Effect */}
      <div className="absolute w-full h-full bg-gradient-to-r from-[#003A5C] to-[#00B4D8] opacity-40 z-0">
        <div className="absolute w-full h-full bg-[#00B4D8] opacity-20 animate-pulse transform rotate-45"></div>
      </div>

      {/* Left Section with Forgot Password Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-12 relative z-10">
        <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-semibold text-center text-[#006F83] mb-6">
            Forgot Password
          </h2>

          {/* Input for Email or Phone */}
          <input
            type="text"
            className="w-full p-4 mb-4 border border-[#00B4D8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006F83] transition-all duration-300 ease-in-out"
            placeholder="Email address or Phone number"
            value={inputValue}
            onChange={handleInputChange}
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Send OTP Button */}
          <button
            onClick={handleSendOtp}
            className="w-full py-4 bg-[#00B4D8] text-white font-semibold rounded-lg mb-6 hover:bg-[#006F83] shadow-lg transform hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
          >
            Send OTP
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm">
            Remember your password?{" "}
            <Link to="/LoginPage" className="text-[#006F83] hover:underline transition duration-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section with Visuals */}
      <div className="w-1/2 flex flex-col justify-center items-center relative z-10">
        <div className="absolute top-20 left-20 animate-bounce opacity-50 transform rotate-45">
          <div className="w-32 h-32 bg-[#00B4D8] rounded-lg shadow-lg">
            <FaShoppingCart className="text-white w-full h-full" size={40} />
          </div>
        </div>
        <div className="absolute bottom-20 right-16 animate-bounce opacity-50 transform rotate-45">
          <div className="w-32 h-32 bg-[#006F83] rounded-lg shadow-lg">
            <FaWarehouse className="text-white w-full h-full" size={40} />
          </div>
        </div>
        <div className="top-40 right-40 animate-pulse opacity-40 transform rotate-15">
          <div className="w-32 h-32 bg-[#003A5C] rounded-lg shadow-lg">
            <FaBoxOpen className="text-white w-full h-full" size={40} />
          </div>
        </div>
        <div className="text-center text-white z-20">
          <h1 className="text-6xl font-bold mb-6 text-shadow-md">
            Reset Your Password
          </h1>
          <p className="text-xl font-light text-shadow-md">
            Securely retrieve access to your account.
          </p>
        </div>
      </div>

      {/* OTP Dialog Box */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle className="text-center text-[#006F83] font-semibold">
          Enter OTP
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-500">
              Please enter the OTP sent to your {resetMethod}.
            </p>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-2">
              {Array(6)
                .fill("")
                .map((_, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center border border-[#00B4D8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F83] text-lg"
                  />
                ))}
            </div>

            {/* Timer */}
            <p className="text-center text-gray-500 text-sm mt-4">
              Time remaining: <span className="font-bold text-red-500">{formatTime(timeLeft)}</span>
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCloseDialog}
            className="w-full mt-6 py-3 bg-[#00B4D8] text-white font-semibold rounded-lg hover:bg-[#006F83] shadow-md transform hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
          >
            Submit OTP
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgotPasswordPage;
