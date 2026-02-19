"use client";

import { useEffect } from "react";
import LoginPage from "@/../talkto-taste-login-page/app/page";

export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[90%] max-w-6xl bg-white rounded-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl"
          >
            ✕
          </button>

          {/* EXACT SAME LOGIN PAGE */}
          <LoginPage />
        </div>
      </div>
    </div>
  );
}
