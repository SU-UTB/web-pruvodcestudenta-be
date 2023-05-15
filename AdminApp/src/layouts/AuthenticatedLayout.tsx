import { ReactNode, useState } from "react";
import ApplicationLogo from "../components/ApplicationLogo";
import { NavbarBrand } from "flowbite-react/lib/esm/components/Navbar/NavbarBrand";
import { NavbarLink } from "flowbite-react/lib/esm/components/Navbar/NavbarLink";
import { Button } from "flowbite-react";

export interface Props {
    children?: ReactNode;
    actions?: ReactNode;
    header: string;
    // any props that come into the component
}

export default function Authenticated({
    children,
    actions,
    header,
    ...props
}: Props) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // @ts-ignore
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <NavbarBrand>
                                    <ApplicationLogo />
                                </NavbarBrand>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavbarLink href="/">Dashboard</NavbarLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavbarLink href="/sections">
                                    Sections
                                </NavbarLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavbarLink href="/topics">Topics</NavbarLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                {/*                                 <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >


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
                                        <Dropdown.Link href="profile/edit">
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href="logout">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown> */}
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
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
                        <NavbarLink href="/">Dashboard</NavbarLink>
                        <NavbarLink href="/sections">Sections</NavbarLink>
                        <NavbarLink href="/topics">Topics</NavbarLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {/*TODO
                                {auth.auth.user.name}
*/}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {/*TODO
                                {auth.auth.user.email}
*/}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <NavbarLink href="profile/edit">Profile</NavbarLink>
                            {/*     <NavbarLink

                                href="logout"

                            >
                                Log Out
                            </NavbarLink>*/}
                        </div>
                    </div>
                </div>
            </nav>

            <header className="bg-white shadow ">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-row justify-center items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {header}
                    </h2>
                    {actions}
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}
