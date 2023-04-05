import {Head, router, useForm} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({auth, sections}) {

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sections</h2>}
        >
            <Head title="Sections"/>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    sections.map(s =>
                        <SectionRow section={s}/>
                    )
                }

                </tbody>
            </table>

        </AuthenticatedLayout>
    );
}

const SectionRow = ({section}) => {
    const {data, setData, post, processing, errors} = useForm({
        title: section.title,
        description: section.description,
    })

    function submit(e) {
        e.preventDefault()
        router.put(`/admin/sections/${section.id}`, data)
    }

    return (
        <tr id={section.id.toString()}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <input name='title' value={data.title} onChange={e => setData('title', e.target.value)}/>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <input name='description' value={data.description}
                       onChange={e => setData('description', e.target.value)}/>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={submit} className="text-indigo-600 hover:text-indigo-900">Save</button>
            </td>
        </tr>
    );
}
