import React from "react";
import { HomePage } from "../../pages/HomePage";


const Main: React.FC = () => {
    return (
        <main className="container mx-auto bg-gray-100 h-[620vh]">
            <h2 className="m-4 text-red-700 text-4xl">
                <HomePage />
            </h2>
        </main>
    );
};

export default Main;
