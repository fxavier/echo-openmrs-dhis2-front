import React from "react";
import { FaComments, FaDatabase, FaUser } from "react-icons/fa";

const Header: React.FC = () => {
    return (
        <header className="bg-[#02BBCA] flex flex-row justify-evenly p-2 relative">
            <div>
                <span className="font-poppins text-gray-100 text-2xl">
                    Sistema de Automação de Processos de Importação de dados
                </span>
            </div>
            <div className="flex flex-row justify-end space-x-2 items-center">
                <span>
                    <FaUser />
                </span>
                <span>
                    <FaDatabase />
                </span>
                <span>
                    <FaComments />
                </span>
            </div>
        </header>
    );
};

export default Header;
