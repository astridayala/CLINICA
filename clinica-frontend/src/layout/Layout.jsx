import React from "react";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return(
        <div className="flex  h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="flex-none">
                <SideNav />
            </div>
            <div className="flex-grow h-screen overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}