import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import useFetchSections from "../hooks/sections/useFetchSections";
import useFetchDashboard from "../hooks/useFetchDashboard";

export default function Dashboard(props: any) {
    const { data: dashboard, isLoading } = useFetchDashboard();

    return isLoading ? (
        <div />
    ) : (
        <AuthenticatedLayout>
            {/*     <Head title="Dashboard"/> */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Count of sections: {dashboard.countOfSections}
                        </div>
                        <div className="p-6 text-gray-900">
                            Count of topics: {dashboard.countOfTopics}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
