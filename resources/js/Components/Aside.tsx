import {CustomFlowbiteTheme, Sidebar} from "flowbite-react";
import {FaTable, FaBox, FaNewspaper, FaLocationDot, FaUser, FaUsers} from "react-icons/fa6";
import {PropsWithChildren, ReactNode} from "react";
import {User} from "@/types";

export function Aside({
                          user,
                      }: PropsWithChildren<{ user: User }>) {

    return (
        <Sidebar aria-label="Default sidebar example">
            <Sidebar.Logo href="#" img="/images/utb.png" imgAlt="UTB">
                UTB
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href={route("dashboard")}
                                  active={route().current("dashboard")}
                                  icon={FaTable}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href={route("sections")}
                                  active={route().current("sections")}
                                  icon={FaBox}>
                        Sekce
                    </Sidebar.Item>
                    <Sidebar.Item href={route("topics")}
                                  active={route().current("topics")}
                                  icon={FaNewspaper}>
                        Články
                    </Sidebar.Item>
                    <Sidebar.Item href={route("locations")}

                                  icon={FaLocationDot}>
                        Lokace
                    </Sidebar.Item>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                    <Sidebar.Item href={route("users")}

                                  icon={FaUsers}>
                        Uživatelé
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Collapse icon={FaUser} label={user.name}>
                        <Sidebar.Item href={route("profile.edit")}>Profil</Sidebar.Item>
                        <Sidebar.Item href={route("logs")}>Logy</Sidebar.Item>
                        <Sidebar.Item
                            href={route("logout")}>Odhlásit se</Sidebar.Item>
                    </Sidebar.Collapse>
                </Sidebar.ItemGroup>
                {/*           <Sidebar.Item href="#" icon={HiShoppingBag}>
                        Products
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiArrowSmRight}>
                        Sign In
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiTable}>
                        Sign Up
                    </Sidebar.Item>*/}
            </Sidebar.Items>
        </Sidebar>
    );
}
