import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import { Button, TextInput } from "flowbite-react";
import useFetchSections from "../../hooks/sections/useFetchSections";
import { ISection } from "../../lib/interfaces/ISection";
import { useState } from "react";

export default function Sections(auth: any) {
    const { data: sections, isLoading } = useFetchSections();

    return isLoading ? (
        <div />
    ) : (
        <AuthenticatedLayout
    
        >
            {/*
            <Head title="Sections"/>
*/}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Description
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Link
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Color
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sections.map((s: ISection) => (
                        <SectionRow
                            key={s.id.toString()}
                            bgColor={""}
                            description={s.description}
                            id={s.id}
                            link={s.link}
                            title={s.title}
                            topics={s.topics}
                        />
                    ))}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
}

const SectionRow = (section: ISection) => {
    const [data, setData] = useState<ISection>(section);

    // @ts-ignore
    function submit(e) {
        e.preventDefault();
        /*
                    router.put(`/admin/sections/${section.id}`, data)
        */
    }

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <TextInput
                    name="title"
                    value={section.title}
                    onChange={(e) =>
                        setData({
                            ...data,
                            title: e.target.value,
                        })
                    }
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <textarea
                    rows={5}
                    name="description"
                    value={section.description}
                    onChange={(e) =>
                        setData({
                            ...data,
                            description: e.target.value,
                        })
                    }
                />
            </td>
            <td>
                <TextInput
                    name="link"
                    value={section.link}
                    onChange={(e) =>
                        setData({
                            ...data,
                            link: e.target.value,
                        })
                    }
                />
            </td>
            <td>
                <TextInput
                    name="bg_color"
                    value={section.bgColor}
                    onChange={(e) =>
                        setData({
                            ...data,
                            bgColor: e.target.value,
                        })
                    }
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button onClick={submit}>Save</Button>
            </td>
        </tr>
    );
};
