import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import { Button, TextInput } from "flowbite-react";
import useFetchTopics from "../../hooks/topics/useFetchTopics";
import { ISection } from "../../lib/interfaces/ISection";
import { useState } from "react";
import { IContent } from "../../lib/interfaces/IContent";
import { Api } from "../../api/Api";

export default function Topics() {
    const { data: topics, isLoading } = useFetchTopics();

    return isLoading ? (
        <div />
    ) : (
        <AuthenticatedLayout>
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
                    {topics.map((t: IContent) => (
                        <ContentRow
                            key={t.id.toString()}
                            description={t.description}
                            id={t.id}
                            link={t.link}
                            title={t.title}
                            bgColor={t.bgColor}
                        />
                    ))}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
}

const ContentRow = (topic: IContent) => {
    const [data, setData] = useState<IContent>(topic);

    // @ts-ignore
    function submit(e) {
        e.preventDefault();
        Api.Instance.client.put(`/topics/${topic.id}`, data);
    }

    return (
        <tr id={topic.id.toString()}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <TextInput
                    name="title"
                    value={data.title}
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
                    value={data.description}
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
                    value={data.link}
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
                    value={data.bgColor}
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
