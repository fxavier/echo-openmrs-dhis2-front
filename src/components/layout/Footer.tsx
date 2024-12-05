import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#02BBCA] flex items-center justify-center h-11 text-gray-100 font-poppins">
            Copyright &copy;{new Date().getFullYear()} Desenvolvido pela equipa do ECHO.
        </footer>
    );
};

export default Footer;
