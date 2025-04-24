import React, { memo } from "react";

const Footer = memo(() => {
  return (
    <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-md py-3 text-center text-sm text-slate-600">
      © {new Date().getFullYear()} Built with 💙 by IEM-UEM GROUP
    </footer>
  );
});

export default Footer;