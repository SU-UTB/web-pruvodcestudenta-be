import React, {useState, PropsWithChildren, ReactNode} from "react";

import {User} from "@/types";
import {Aside} from "@/Components/Aside";
import Topbar from "@/Components/Topbar";
import {IconType} from "react-icons/lib";

export interface  IBreadCrumb{
    href: string;
    icon: IconType;
    label: string;
}

export default function Authenticated({
                                          user,
                                          breadCrumbs,
                                          header,
                                          children,
                                      }: PropsWithChildren<{ user: User; breadCrumbs?:IBreadCrumb[], header?: ReactNode }>) {
    return <div>
        <div className="overflow-auto">

            <div className="flex h-screen">


                <Aside user={user}/>

                <div className="flex-1 h-screen max-h-screen overflow-y-auto">
                    <Topbar
                        user={user}
                        breadCrumbs={breadCrumbs}
                    />
                    <div className="px-10">

                        <div
                            className="w-full flex justify-center py-5 bg-[#EEF2F8] rounded-t-3xl shadow-xl mt-10">
                            <main className="w-full md:w-11/12 lg:w-11/12 pt-10 no-scrollbar overflow-y-scroll">
                                <slot className="w-full md:w-11/12 lg:w-11/12 p-6">
                                    {children}
                                </slot>
                            </main>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    {/*
        </div>*/
    }
}
