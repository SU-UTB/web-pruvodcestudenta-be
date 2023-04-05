import {Head, router} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({auth, sections}) {
    function handleSubmit(e) {
        e.preventDefault()
        router.put('/admin/sections/id', values)
    }

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

                        <tr id={s.id.toString()}>
                            <form name="add-blog-post-form" id="add-blog-post-form" method="post"
                                  action="{{ route('admin.sections.update', $s->id) }}">
                                <input type="hidden" name="_method" value="put"/>
                                @csrf
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <input name='title' value={s.title}/>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <input name='description' value={s.description}/>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Save</a>
                                </td>
                            </form>
                        </tr>)
                }

                </tbody>
            </table>

        </AuthenticatedLayout>
    );
}
