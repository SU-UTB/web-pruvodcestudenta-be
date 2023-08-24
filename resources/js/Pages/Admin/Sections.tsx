import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import SectionsTable from "@/Components/SectionsTable";

export default function Sections({auth, paginationSections}: any) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sections</h2>}
        >
            <Head title="Sections"/>
            <SectionsTable sections={paginationSections.data}/>

        </AuthenticatedLayout>
    );
}
