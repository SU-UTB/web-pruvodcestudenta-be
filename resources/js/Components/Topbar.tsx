import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import {Link} from "@inertiajs/react";
import {PropsWithChildren, ReactNode, useState} from "react";
import {User} from "@/types";
import {HiHome} from "react-icons/hi";
import {Breadcrumb} from "flowbite-react";
import {IBreadCrumb} from "@/Layouts/AuthenticatedLayout";
import {FaHome} from "react-icons/fa";


export default function Topbar({
                                   user,
                                   breadCrumbs,
                               }: PropsWithChildren<{ user: User; breadCrumbs?: IBreadCrumb[] }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (<nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-2">
                <div className="flex justify-between h-16">


                    <div className="hidden sm:flex sm:items-center sm:ml-2">
                        <div className="relative">
                            <Breadcrumb aria-label="Default breadcrumb example">
                                <Breadcrumb.Item
                                    href={route("dashboard")} icon={FaHome}>
                                    Dashboard
                                </Breadcrumb.Item>

                                {breadCrumbs?.map(bc =>
                                    <Breadcrumb.Item href={bc.href} icon={bc.icon}>
                                        {bc.label}
                                    </Breadcrumb.Item>)}

                            </Breadcrumb>
                        </div>
                    </div>

                </div>
            </div>
        </nav>

    );
}
