import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="flex relative">
                <Sidebar />
                <div className="flex flex-col w-full">
                    <Header />
                    <div className="container mx-auto w-full h-[89vh]">{children}</div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Layout;
