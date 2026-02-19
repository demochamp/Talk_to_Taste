"use client";

import { useEffect, useState } from "react";
import LoginModal from "./login-modal";

export default function ScrollGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) return;

    const triggerLogin = () => {
      setOpen(true);
      window.removeEventListener("scroll", triggerLogin);
      window.removeEventListener("click", triggerLogin);
    };

    window.addEventListener("scroll", triggerLogin);
    window.addEventListener("click", triggerLogin);

    return () => {
      window.removeEventListener("scroll", triggerLogin);
      window.removeEventListener("click", triggerLogin);
    };
  }, []);

  return <LoginModal open={open} onClose={() => setOpen(false)} />;
}
