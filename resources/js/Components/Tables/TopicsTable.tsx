import PrimaryButton from "@/Components/PrimaryButton";
import {
    Button,
    Dropdown,
    Select,
    Table,
    Textarea,
    TextInput,
} from "flowbite-react";
import { Link } from "@inertiajs/react";
import { formatDateFromString } from "@/Tools/DateFormatter";

const TopicsTable = ({
    topics,
    sections,
    locations,
    onDeleteTopic,
    onEditTopic,
}: any) => {
    //TODO types
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Section</Table.HeadCell>
                <Table.HeadCell>Location</Table.HeadCell>
                <Table.HeadCell>Location URL</Table.HeadCell>
                <Table.HeadCell>Url</Table.HeadCell>
                <Table.HeadCell>Slug</Table.HeadCell>
                <Table.HeadCell>Updated At</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Actions</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {topics.map((topic: any, index: number) => (
                    <Table.Row
                        key={index.toString()}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {topic.title}
                        </Table.Cell>
                        <Table.Cell>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: topic.description,
                                }}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            {
                                sections.find(
                                    (s: any) => s.id === topic.section_id,
                                ).title
                            }
                        </Table.Cell>
                        <Table.Cell>
                            {
                                locations.find(
                                    (l: any) => l.id === topic.location_id,
                                ).name
                            }
                        </Table.Cell>
                        <Table.Cell>{topic.location}</Table.Cell>
                        <Table.Cell>{topic.url}</Table.Cell>
                        <Table.Cell className="w-{200px} overflow-hidden">
                            {topic.slug}
                        </Table.Cell>
                        <Table.Cell>
                            {formatDateFromString(topic.updated_at)[0]}
                            <br />
                            {formatDateFromString(topic.updated_at)[1]}
                        </Table.Cell>
                        <Table.Cell>
                            <Button
                                size={"xs"}
                                onClick={() => onEditTopic(topic)}
                            >
                                <p>Edit</p>
                            </Button>
                            <br />
                            <Button
                                size={"xs"}
                                color="failure"
                                onClick={() => onDeleteTopic(topic.id)}
                            >
                                <p>Delete</p>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default TopicsTable;
