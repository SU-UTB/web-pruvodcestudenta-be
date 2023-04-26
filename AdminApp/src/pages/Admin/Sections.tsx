import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import {Button, TextInput} from "flowbite-react";
import useFetchSections from "../../hooks/sections/useFetchSections";
import {ISection} from "../../lib/interfaces/ISection";

export default function Sections(auth: any) {
    const {data: sections, isLoading} = useFetchSections();

    return (isLoading ? <div/> :
            <AuthenticatedLayout
                auth={auth}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sections</h2>}
            >
                {/*
            <Head title="Sections"/>
*/}
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
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Link
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Color
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {
                        sections.map((s: any) =>
                            {console.log(s.link);
                               return  <SectionRow key={s.link.toString()}  section={s} >
                                    {s}
                                </SectionRow>
                            }
                        )
                    }

                    </tbody>
                </table>

            </AuthenticatedLayout>
    );
}

const SectionRow = (section:any) => {
    console.log(section)
    // @ts-ignore
    /*
        function submit(e) {
            e.preventDefault()
            router.put(`/admin/sections/${section.id}`, data)
        }*/

    return (<></>
/*        <tr id={section.id.toString()}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <TextInput name='title' value={data.title} onChange={e => setData('title', e.target.value)}/>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <textarea rows={5} name='description' value={data.description}
                          onChange={e => setData('description', e.target.value)}/>
            </td>
            <td>
                <TextInput name='link' value={data.link}
                           onChange={e => setData('link', e.target.value)}/>

            </td>
            <td>
                <TextInput name='bg_color' value={data.bg_color} onChange={e => setData('bg_color', e.target.value)}/>

            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button onClick={submit}>Save</Button>
            </td>
        </tr>*/
    );
}


