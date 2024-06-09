import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, router} from "@inertiajs/react";
import {PageProps} from "@/types";
import SectionsTable from "@/Components/Tables/SectionsTable";
import {Button, Pagination, TextInput} from "flowbite-react";
import React, {FormEvent, useState} from "react";
import TopicsTable from "@/Components/Tables/TopicsTable";
import {ITopic, TopicModal} from "@/Components/Modals/TopicModal";
import {ISection} from "@/Components/Modals/SectionModal";
import {FaBox, FaNewspaper} from "react-icons/fa6";

export default function Topics({
                                   auth,
                                   paginationTopics,
                                   topicImages,
                                   sections,
                                   locations,
                                   search,
                               }: any) {
    const [modalData, setModalData] = useState<{
        isVisible: boolean;
        topic: ITopic | null;
        image: string | null;
    }>({
        isVisible: false,
        topic: null,
        image: null,
    });

    const breadCrumbs = [{
        href: route("topics"),
        icon: FaNewspaper,
        label: 'Články'
    }]
    const [searchInput, setSearchInput] = useState<string>(search);

    function submitSearch(e: FormEvent) {
        e.preventDefault();
        router.post("/admin/topics/search", {search: searchInput});
    }

    function onDeleteTopic(id: number) {
        router.delete(`/admin/topics/${id}`);
    }

    function onEditTopic(topic: ITopic) {
        setModalData({
            isVisible: true,
            topic: topic,
            image: topicImages.find((i: any) => i.topic_id === topic.id)?.name,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Topics
                </h2>
            }
            breadCrumbs={breadCrumbs}

        >
            <Head title="Topics"/>
            <div className="mx-auto flex justify-center items-center">
                <form
                    className="flex max-w-md flex-row gap-4"
                    name="search-topics-form"
                    id="search-topics-form"
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
                    Přidat článek
                </Button>
            </div>
            <br/>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-full">
                <TopicsTable
                    topics={paginationTopics.data}
                    sections={sections}
                    locations={locations}
                    onDeleteTopic={onDeleteTopic}
                    onEditTopic={onEditTopic}
                    topicImages={topicImages}
                />
            </div>
            <br/>
            <div className="mx-auto flex justify-center items-center px-4">
                <Pagination
                    currentPage={paginationTopics.current_page}
                    onPageChange={(page) => {
                        router.visit(paginationTopics.path + "?page=" + page);
                    }}
                    totalPages={paginationTopics.last_page}
                />
            </div>
            <br/>
            <TopicModal
                key={modalData.topic?.toString()}
                isVisible={modalData.isVisible}
                onClose={() =>
                    setModalData({
                        isVisible: false,
                        topic: null,
                        image: null,
                    })
                }
                topic={modalData.topic}
                locations={locations}
                sections={sections}
                image={modalData.image}
            />
        </AuthenticatedLayout>
    );
}
