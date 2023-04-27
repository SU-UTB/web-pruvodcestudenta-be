import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

export default function Dashboard(props : any) {

    return (
        <AuthenticatedLayout
        >
        {/*     <Head title="Dashboard"/> */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Count of sections: {props.countOfSections}</div>
                        <div className="p-6 text-gray-900">Count of topics: {props.countOfTopics}</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
