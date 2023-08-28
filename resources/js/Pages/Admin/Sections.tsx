import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import SectionsTable from "@/Components/Tables/SectionsTable";
import { Button, Pagination, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { TopicModal } from "@/Components/Modals/TopicModal";
import { StoryModal } from "@/Components/Modals/StoryModal";

export default function Sections({ auth, paginationSections, search }: any) {
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sections
                </h2>
            }
        >
            <Head title="Sections" />
            <br />
            <div className="mx-auto flex justify-center items-center px-4">
                <form
                    className="flex max-w-md flex-row gap-4"
                    name="search-reservation-form"
                    id="search-reservation-form"
                    method="POST"
                    action="{{route('search-sections')}}"
                >
                    <TextInput
                        type="text"
                        className="form-control"
                        id="search"
                        name="search"
                        placeholder="Search..."
                        value={search}
                        onChange={() => {}}
                    />
                </form>
                <Button className="ml-auto" onClick={() => setShowModal(true)}>
                    Add Section
                </Button>
            </div>
            <br />
            <SectionsTable sections={paginationSections.data} />
            <br />
            <div className="mx-auto flex justify-center items-center px-4">
                <Pagination
                    currentPage={paginationSections.current_page}
                    onPageChange={(page) => {
                        router.visit(paginationSections.path + "?page=" + page);
                    }}
                    totalPages={paginationSections.last_page}
                />
            </div>
            <br />
            <StoryModal
                isVisible={showModal}
                setOpenModal={setShowModal}
                story={null}
            />
        </AuthenticatedLayout>
    );
}
