import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import SectionsTable from "@/Components/Tables/SectionsTable";
import { Button, Pagination, TextInput } from "flowbite-react";
import React, { FormEvent, useState } from "react";
import { TopicModal } from "@/Components/Modals/TopicModal";
import { ISection, SectionModal } from "@/Components/Modals/SectionModal";
import {FaBox} from "react-icons/fa6";

export default function Sections({
    auth,
    paginationSections,
    sectionImages,
    search,
}: any) {
    const [modalData, setModalData] = useState<{
        isVisible: boolean;
        section: ISection | null;
        image: string | null;
    }>({
        isVisible: false,
        section: null,
        image: null,
    });

    const breadCrumbs = [{
        href: route("sections"),
        icon: FaBox,
        label: 'Sekce'
    }]

    const [searchInput, setSearchInput] = useState<string>(search);

    function submitSearch(e: FormEvent) {
        e.preventDefault();
        router.post("/admin/sections/search", { search: searchInput });
    }

    function onDeleteSection(id: number) {
        router.delete(`/admin/sections/${id}`);
    }

    function onEditSection(section: ISection) {
        setModalData({
            isVisible: true,
            section: section,
            image: sectionImages.find((i: any) => i.section_id === section.id)
                ?.name,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sections
                </h2>
            }
            breadCrumbs={breadCrumbs}
        >

            <Head title="Sections" />
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
                <Button
                    color={'primary'}
                    className="ml-auto"
                    onClick={() =>
                        setModalData({
                            ...modalData,
                            isVisible: true,
                        })
                    }
                >
                    Přidat sekci
                </Button>
            </div>
            <br />
            <SectionsTable
                sections={paginationSections.data}
                onDeleteSection={onDeleteSection}
                onEditSection={onEditSection}
                sectionImages={sectionImages}
            />
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
            <SectionModal
                key={modalData.section?.toString()}
                isVisible={modalData.isVisible}
                onClose={() =>
                    setModalData({
                        isVisible: false,
                        section: null,
                        image: null,
                    })
                }
                section={modalData.section}
                image={modalData.image}
            />
        </AuthenticatedLayout>
    );
}
