import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import SectionsTable from "@/Components/Tables/SectionsTable";
import { Button, Pagination, TextInput } from "flowbite-react";
import React, { FormEvent, useState } from "react";
import { TopicModal } from "@/Components/Modals/TopicModal";
import { ISection, SectionModal } from "@/Components/Modals/SectionModal";

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
            image: sectionImages.filter(
                (i: any) => i.section_id === section.id,
            )[0]?.name,
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
        >
            <Head title="Sections" />
            <br />
            <div className="mx-auto flex justify-center items-center px-4">
                <form
                    className="flex max-w-md flex-row gap-4"
                    name="search-reservation-form"
                    id="search-reservation-form"
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
                    Add Section
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
