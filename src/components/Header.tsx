import React from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full sticky top-0 bg-white/80 backdrop-blur shadow z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Huvudnavigering */}
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
