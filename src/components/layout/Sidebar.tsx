import React, { useState } from "react";
import { HiMenu, HiOfficeBuilding } from "react-icons/hi";
import { MdDashboard, MdApproval, MdSummarize } from "react-icons/md";
import { FaTools, FaUser } from "react-icons/fa";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";


import { Link } from "react-router-dom";

interface MenuItem {
    name: string;
    link: string;
    icon: React.ComponentType<{ size: string | number }>;
    margin?: boolean;
}

const Sidebar: React.FC = () => {
    const menus: MenuItem[] = [
        { name: "Dashboard", link: "/dashboard", icon: MdDashboard },
        { name: "US Files", link: "/us-files", icon: HiOfficeBuilding },
        { name: "File Processing", link: "/file-processing", icon: HiOfficeBuilding },
        { name: "Mappings", link: "/mapping", icon: FaTools },
        { name: "Merge ECHO Files", link: "/merge-echo-files", icon: AiOutlineDeliveredProcedure },
        { name: "Upload to DHIS2", link: "/upload-to-dhis2", icon: MdApproval },
        { name: "Summary", link: "/summary", icon: MdSummarize },
        { name: "Users", link: "/users", icon: FaUser },
    ];

    const [open, setOpen] = useState(true);

    return (
        <section className="flex gap-6">
            <div
                className={`bg-[#052963] min-h-screen ${
                    open ? "w-72" : "w-16"
                } duration-500 text-gray-100 px-4`}
            >
                <div className="py-3 flex justify-end">
                    <HiMenu
                        size={26}
                        className="cursor-pointer hover:text-[#02BBCA]"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {menus.map((menu, i) => (
                        <Link
                            to={menu.link}
                            key={i}
                            className={`${
                                menu.margin && "mt-5"
                            } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#02BBCA] rounded-md`}
                        >
                            <div>{React.createElement(menu.icon, { size: "20" })}</div>
                            <h2
                                style={{ transitionDelay: `${i + 3}00ms` }}
                                className={`whitespace-pre duration-500 ${
                                    !open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                            >
                                {menu.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sidebar;
