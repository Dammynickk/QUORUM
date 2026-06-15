import React, { useState } from "react";
import {
  CardIcon,
  BankIcon,
  UssdIcon,
  EWalletIcon,
  BackArrowIcon,
} from "../../assets/Icon";
import { useNavigate, useLocation } from "react-router-dom";

const WalletPay = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMethod, setSelectedMethod] = useState(null);

  const coins = location.state?.coins || 100;
  const amount = location.state?.amount || 5000;

  const handlePayment = () => {
    if (!selectedMethod) return;

    navigate("/payment-process", {
      state: {
        coins,
        amount,
        paymentMethod: selectedMethod,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A12] text-[#F8FAFC] px-6 pt-8 pb-24">
      {/* Header */}
      <div
        className="absolute top-10 left-4 text-[#D1BCFF] cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <BackArrowIcon />
      </div>

      <div>
        <h1 className="text-2xl pt-22 font-semibold">
          Select Payment Method
        </h1>

        <p className="mt-4 text-gray-400">
          You are purchasing{" "}
          <span className="font-semibold text-white">
            {coins} Coins
          </span>
        </p>

        <p className="mt-2 text-[#F4B400] font-semibold text-lg">
          Amount: NGN {amount.toLocaleString()}
        </p>
      </div>

      {/* Card */}
      <div className="mt-10 space-y-4">
        <div
          onClick={() => setSelectedMethod("card")}
          className={`border border-[#7B3FF2] rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer
          ${selectedMethod === "card" ? "bg-[#7B3FF2]" : ""}`}
        >
          <div className="flex items-center gap-4">
            <CardIcon />
            <span className="font-semibold">Card Payment</span>
          </div>

          <div
            className={`w-5 h-5 rounded-full border-2 border-white ${
              selectedMethod === "card" ? "bg-white" : ""
            }`}
          />
        </div>

        {/* Bank */}
        <div
          onClick={() => setSelectedMethod("bank")}
          className={`border border-[#7B3FF2] rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer
          ${selectedMethod === "bank" ? "bg-[#7B3FF2]" : ""}`}
        >
          <div className="flex items-center gap-4">
            <BankIcon />
            <span className="font-semibold">Bank Transfer</span>
          </div>

          <div
            className={`w-5 h-5 rounded-full border-2 border-white ${
              selectedMethod === "bank" ? "bg-white" : ""
            }`}
          />
        </div>

        {/* USSD */}
        <div
          onClick={() => setSelectedMethod("ussd")}
          className={`border border-[#7B3FF2] rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer
          ${selectedMethod === "ussd" ? "bg-[#7B3FF2]" : ""}`}
        >
          <div className="flex items-center gap-4">
            <UssdIcon />
            <span className="font-semibold">USSD</span>
          </div>

          <div
            className={`w-5 h-5 rounded-full border-2 border-white ${
              selectedMethod === "ussd" ? "bg-white" : ""
            }`}
          />
        </div>

        {/* E-Wallet */}
        <div
          onClick={() => setSelectedMethod("ewallet")}
          className={`border border-[#7B3FF2] rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer
          ${selectedMethod === "ewallet" ? "bg-[#7B3FF2]" : ""}`}
        >
          <div className="flex items-center gap-4">
            <EWalletIcon />
            <span className="font-semibold">E-Wallet</span>
          </div>

          <div
            className={`w-5 h-5 rounded-full border-2 border-white ${
              selectedMethod === "ewallet" ? "bg-white" : ""
            }`}
          />
        </div>
      </div>

      {/* Pay Button */}
      <div className="mt-16">
        <button
          onClick={handlePayment}
          disabled={!selectedMethod}
          className={`w-full py-4 rounded-lg font-medium transition
          ${
            selectedMethod
              ? "bg-[#7B3FF2] hover:bg-purple-700 text-white"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
        >
          Pay NGN {amount.toLocaleString()}
        </button>
      </div>
    </div>
  );
};

export default WalletPay;
