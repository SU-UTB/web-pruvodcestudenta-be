import {useState, PropsWithChildren, ReactNode} from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import {Head, Link} from "@inertiajs/react";
import {User} from "@/types";
import {PanelMenu} from "primereact/panelmenu";
import {OverlayPanel} from "primereact/overlaypanel";
import {Button} from "primereact/button";
import {BreadCrumb} from "primereact/breadcrumb";

export default function Authenticated({
                                          user,
                                          header,
                                          children,
                                      }: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const asideMenuPt = {
        headerAction: '!h-10 border-0 !font-semibold',
        headerContent: ({context: e}) => (['!border-0 bg-white hover:!bg-bluecsa-sec hover:!text-white', {'!bg-bluecsa-sec text-white': e.active}]),
        menuContent: '!bg-slate-100 !border-0 !font-medium'
    };
    const breadcrumbs = [{label: 'Electronics'}, {label: 'Computer'}, {label: 'Accessories'}, {label: 'Keyboard'}, {label: 'Wireless'}];
    const home = {icon: 'pi pi-home', url: 'https://primereact.org'}
    return (
        <div>
            <Head title="GET TITLE FROM ROUTE"/>


            <div className="bg-white dark:bg-slate-500 overflow-auto">


                <div className="flex h-screen">

                    {/*ASIDE*/}
                    <div
                        className="hidden lg:flex flex-col justify-between bg-white transition-all duration-400 z-50 shadow-lg py-4 w-64"
                    >
                        <div>
                            <div className="flex justify-center items-center mb-5 h-20">
                                <ApplicationLogo className="w-2/4"/>
                            </div>

                            {/*
                    <PanelMenu
                    model={adminMenu}
                    className="mx-1"
                    ptPptions={{mergeProps: true}}
                    pt={asideMenuPt}
                    >
                </PanelMenu>*/}

                        </div>

                    </div>


                    {/*END ASIDE*/}
                    <div className="flex-1 h-screen max-h-screen overflow-y-auto">

                        {/*TOPBAR*/}
                        <div
                            className="bg-white h-16 lg:h-20 lg:pl-5 fixed top-0 inset-0 z-[30] items-center shadow-sm">
                            <div className="flex justify-between items-center h-full pl-64">

                                <div className="flex-auto items-center text-slate-700 hidden lg:flex">
                                    <div>
                                        <BreadCrumb home={home} model={breadcrumbs}>
                                            <Link href="item.route">

                                                {/*
                                        <span :className="[item.icon, 'text-color']" />
*/}

                                                <span
                                                    className="text-surface-600 dark:text-primary-400 font-semibold text-lg">LABEL</span>
                                            </Link>
                                            <a href="item.url" target="item.target">
                                                <span
                                                    className="text-surface-500 dark:text-primary-400 font-semibold text-lg">LABEL</span>
                                            </a>
                                        </BreadCrumb>
                                    </div>
                                </div>

                                <div className="hidden lg:flex items-center px-5 text-slate-600 fill-slate-600 mr-10">
                                    <div className="mx-3"/* v-if="layoutStore.appIsLoading"*/>
                                        {/*
                    <font-awesome-icon :icon="['fas', 'circle-notch']" className="animate-spin" v-if="layoutStore.appIsLoading" />
*/}
                                    </div>
                                    <div className="px-2 w-64 hover:w-80">
                                        <label className="relative text-gray-400 focus-within:text-gray-600 block">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                 className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 fill-slate-500">
                                                <path
                                                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                            </svg>
                                            {/*
                        <Input type="search" className="pl-9 h-11 font-medium" placeholder="Prohledat aplikaci.." v-model="layoutStore.appSearchInput"/>
*/}
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-2 gap-1 ml-3 border-l-2 border-bgcsa pl-3 ">
                                        {/* <a :href="route(layoutStore.webLinkRoute)" className="h-8 w-7 flex justify-center items-center" target="_blank" >
                    <IconWebsite />
                </a>*/}


                                        <OverlayPanel >
                                            <div className="w-64">
                                                <div>
                                                    <span
                                                        className="text-lg font-semibold text-slate-700">Upozornění</span>
                                                </div>
                                                <div className="mt-3">
                                                    <span className="text-slate-500">Žádné upozornění</span>
                                                </div>
                                            </div>
                                        </OverlayPanel>
                                    </div>

                                    <div className="text-md font-semibold px-3 mr-3 rounded flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 fill-slate-500"
                                             viewBox="0 0 512 512">
                                            <path
                                                d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                                        </svg>

                                        <div className="flex flex-col ml-4">
                                            <div className="text-bgcsa text-lg">
                                                "NAME"
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                "EMAIL"
                                            </div>
                                        </div>

                                    </div>
                                    <button className="h-8 w-8 flex justify-center items-center" onClick={() => {
                                        //layoutStore.logout()
                                    }}>
                                        {/*
        <IconLogout/>
*/}
                                    </button>
                                    {/*    <Teleport to="body">
        <LogoutModal />
    </Teleport>*/}
                                </div>
                            </div>
                        </div>

                        {/*END TOPBAR*/}

                        <div className="px-10 pt-5">

                            <div
                                className="w-full flex justify-center py-5 bg-[#EEF2F8] h-screen rounded-t-3xl shadow-xl mt-24">
                                <main className="w-full md:w-11/12 lg:w-11/12 pt-10 no-scrollbar overflow-y-scroll"
                                      key="$page.component">
                                    <slot className="w-full md:w-11/12 lg:w-11/12">
                                        {children}
                                    </slot>
                                </main>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            {/*<div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/admin/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route("sections")}
                                        active={route().current("sections")}
                                    >
                                        Sections
                                    </NavLink>
                                    <NavLink
                                        href={route("topics")}
                                        active={route().current("topics")}
                                    >
                                        Topics
                                    </NavLink>
                                    <NavLink
                                        href={route("locations")}
                                        active={route().current("locations")}
                                    >
                                        Locations
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route("logs")}>
                                                Logs
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("sections")}
                                active={route().current("sections")}
                            >
                                Sections
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("topics")}
                                active={route().current("topics")}
                            >
                                Topics
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("locations")}
                                active={route().current("locations")}
                            >
                                Locations
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("logs")}>
                                    Logs
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>*/}

        </div>
    );
}
