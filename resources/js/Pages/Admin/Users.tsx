import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button, Pagination, TextInput } from "flowbite-react";
import React, { FormEvent, useState } from "react";
import { TopicModal } from "@/Components/Modals/TopicModal";
import {FaBox} from "react-icons/fa6";
import UsersTable from "@/Components/Tables/UsersTable";

export interface IUser {
    id: number;
    name: string;
    email: string;

}

export default function Users({
    auth,
    paginationUsers,
    userImages,
    search,
}: any) {
    const [modalData, setModalData] = useState<{
        isVisible: boolean;
        user: IUser | null;
        image: string | null;
    }>({
        isVisible: false,
        user: null,
        image: null,
    });

    const breadCrumbs = [{
        href: route("users"),
        icon: FaBox,
        label: 'Uživatelé'
    }]

    const [searchInput, setSearchInput] = useState<string>(search);

    function submitSearch(e: FormEvent) {
        e.preventDefault();
        router.post("/admin/users/search", { search: searchInput });
    }



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
            breadCrumbs={breadCrumbs}
        >

            <Head title="Users" />
            <div className="mx-auto flex justify-center items-center">
                <form
                    className="flex max-w-md flex-row gap-4"
                    name="search-reservation-form"
                    id="search-reservation-form"
                    method="POST"
                    onSubmit={submitSearch}
                >
                    <TextInput
                        color={'gray'}
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Výraz..."
                        value={searchInput}
                        onChange={(val) => setSearchInput(val.target.value)}
                    />
                    <Button type="submit" color={'primary'}>Hledat</Button>
                </form>
<div className={'ml-auto'}></div>
            </div>
            <br />
            <UsersTable
                users={paginationUsers.data}
            />
            <br />
            <div className="mx-auto flex justify-center items-center px-4">
                <Pagination
                    nextLabel={'Další'}
                    previousLabel={'Předchozí'}
                    currentPage={paginationUsers.current_page}
                    onPageChange={(page) => {
                        router.visit(paginationUsers.path + "?page=" + page);
                    }}
                    totalPages={paginationUsers.last_page}
                />
            </div>

        </AuthenticatedLayout>
    );
}
