import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import {PageProps} from '@/types';
import SectionsTable from "@/Components/Tables/SectionsTable";
import {Button, Pagination, TextInput} from "flowbite-react";
import React from "react";
import TopicsTable from "@/Components/Tables/TopicsTable";

export default function Topics({auth, paginationTopics, sections, locations, search}: any) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Topics</h2>}
        >
            <Head title="Topics"/>
            <br/>
            <div className="mx-auto flex justify-center items-center px-4">
                <form className="flex max-w-md flex-row gap-4" name="search-topics-form"
                      id="search-topics-form" method="POST"
                      action="{{route('search-topics')}}">

                    <TextInput type="text" className="form-control" id="search" name="search"
                               placeholder="Search..."
                               value={search}
                               onChange={() => {
                               }}/>
                </form>
                <Button className="ml-auto"
                        onClick={() => {
                        }}>
                    Add Topic
                </Button>
            </div>
            <br/>
            <TopicsTable topics={paginationTopics.data} sections={sections} locations={locations}/>
            <br/>
            <div className="mx-auto flex justify-center items-center px-4">

                <Pagination
                    currentPage={paginationTopics.current_page}
                    onPageChange={page => {
                        router.visit(paginationTopics.path + '?page=' + page)
                    }}
                    totalPages={paginationTopics.last_page}
                />
            </div>
            <br/>
        </AuthenticatedLayout>
    );
}
