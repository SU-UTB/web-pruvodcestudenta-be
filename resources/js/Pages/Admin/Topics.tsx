import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import SectionsTable from "@/Components/Tables/SectionsTable";
import { Button, Pagination, TextInput } from "flowbite-react";
import React, { FormEvent, useState } from "react";
import TopicsTable from "@/Components/Tables/TopicsTable";
import { ITopic, TopicModal } from "@/Components/Modals/TopicModal";
import { ISection } from "@/Components/Modals/SectionModal";

export default function Topics({
    auth,
    paginationTopics,
    sections,
    locations,
    search,
}: any) {
    const [modalData, setModalData] = useState<{
        isVisible: boolean;
        topic: ITopic | null;
    }>({
        isVisible: false,
        topic: null,
    });
    const [searchInput, setSearchInput] = useState<string>(search);

    function submitSearch(e: FormEvent) {
        e.preventDefault();
        router.post("/admin/topics/search", { search: searchInput });
    }

    function onModalSubmit(data: ITopic, createNew: boolean) {
        setModalData({
            isVisible: false,
            topic: null,
        });
        if (createNew) {
            router.post("/admin/topics", {
                ...data,
            });
        } else {
            router.put(`/admin/topics/${data.id}`, {
                ...data,
            });
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Topics
                </h2>
            }
        >
            <Head title="Topics" />
            <br />
            <div className="mx-auto flex justify-center items-center px-4">
                <form
                    className="flex max-w-md flex-row gap-4"
                    name="search-topics-form"
                    id="search-topics-form"
                    method="POST"
                    action="{{route('search-topics')}}"
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
                <Button
                    className="ml-auto"
                    onClick={() =>
                        setModalData({
                            ...modalData,
                            isVisible: true,
                        })
                    }
                >
                    Add Topic
                </Button>
            </div>
            <br />
            <TopicsTable
                topics={paginationTopics.data}
                sections={sections}
                locations={locations}
            />
            <br />
            <div className="mx-auto flex justify-center items-center px-4">
                <Pagination
                    currentPage={paginationTopics.current_page}
                    onPageChange={(page) => {
                        router.visit(paginationTopics.path + "?page=" + page);
                    }}
                    totalPages={paginationTopics.last_page}
                />
            </div>
            <br />
            <TopicModal
                key={modalData.topic?.toString()}
                isVisible={modalData.isVisible}
                onClose={() =>
                    setModalData({
                        isVisible: false,
                        topic: null,
                    })
                }
                topic={modalData.topic}
                onSubmit={onModalSubmit}
                locations={locations}
                sections={sections}
            />
        </AuthenticatedLayout>
    );
}
