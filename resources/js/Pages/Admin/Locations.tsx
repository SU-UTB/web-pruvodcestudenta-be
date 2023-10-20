import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import SectionsTable from "@/Components/Tables/SectionsTable";
import { Button, Pagination, TextInput } from "flowbite-react";
import React, { FormEvent, useState } from "react";
import { ITopic, TopicModal } from "@/Components/Modals/TopicModal";
import { SectionModal } from "@/Components/Modals/SectionModal";
import LocationsTable from "@/Components/Tables/LocationsTable";
import { ILocation, LocationModal } from "@/Components/Modals/LocationModal";

export default function Locations({ auth, paginationLocations, search }: any) {
    const [modalData, setModalData] = useState<{
        isVisible: boolean;
        location: ILocation | null;
    }>({
        isVisible: false,
        location: null,
    });
    const [searchInput, setSearchInput] = useState<string>(search);

    function submitSearch(e: FormEvent) {
        e.preventDefault();
        router.post("/admin/locations/search", { search: searchInput });
    }

    function onModalSubmit(data: ILocation, createNew: boolean) {
        setModalData({
            isVisible: false,
            location: null,
        });
        console.log(data);
        if (createNew) {
            router.post("/admin/locations", {
                ...data,
            });
        }
    }

    function onDeleteLocation(id: number) {
        router.delete(`/admin/locations/${id}`);
    }

    function onSaveLocation(location: ILocation) {
        router.put(`/admin/locations/${location.id}`, {
            ...location,
        });
    }

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
                    onSubmit={submitSearch}
                >
                    <TextInput
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(val) => setSearchInput(val.target.value)}
                    />
                    <Button type="submit">Search</Button>
                </form>
                <Button
                    className="ml-auto"
                    onClick={() =>
                        setModalData({
                            ...modalData,
                            isVisible: true,
                        })
                    }
                >
                    Add Location
                </Button>
            </div>
            <br />
            <LocationsTable
                key={paginationLocations.data.length.toString()}
                locations={paginationLocations.data}
                onDeleteLocation={onDeleteLocation}
                onSaveLocation={onSaveLocation}
            />
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
                isVisible={modalData.isVisible}
                onClose={() =>
                    setModalData({
                        isVisible: false,
                        location: null,
                    })
                }
                onSubmit={onModalSubmit}
            />
        </AuthenticatedLayout>
    );
}
