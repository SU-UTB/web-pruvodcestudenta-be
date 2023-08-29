import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import SectionsTable from "@/Components/Tables/SectionsTable";
import { Button, Pagination, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { TopicModal } from "@/Components/Modals/TopicModal";
import { SectionModal } from "@/Components/Modals/SectionModal";
import LocationsTable from "@/Components/Tables/LocationsTable";
import { LocationModal } from "@/Components/Modals/LocationModal";

export default function Locations({ auth, paginationLocations, search }: any) {
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Locations
                </h2>
            }
        >
            <Head title="Locations" />
            <br />
            <div className="mx-auto flex justify-center items-center px-4">
                <form
                    className="flex max-w-md flex-row gap-4"
                    name="search-locations-form"
                    id="search-locations-form"
                    method="POST"
                    action="{{route('search-locations')}}"
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
                    Add Location
                </Button>
            </div>
            <br />
            <LocationsTable locations={paginationLocations.data} />
            <br />
            {/*TODO generic pagination*/}
            <div className="mx-auto flex justify-center items-center px-4">
                <Pagination
                    currentPage={paginationLocations.current_page}
                    onPageChange={(page) => {
                        router.visit(
                            paginationLocations.path + "?page=" + page
                        );
                    }}
                    totalPages={paginationLocations.last_page}
                />
            </div>
            <br />
            <LocationModal
                isVisible={showModal}
                setOpenModal={setShowModal}
                location={null}
            />
        </AuthenticatedLayout>
    );
}
