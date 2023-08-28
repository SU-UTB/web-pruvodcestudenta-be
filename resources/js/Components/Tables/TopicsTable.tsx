import PrimaryButton from "@/Components/PrimaryButton";
import { Dropdown, Select, Table, Textarea, TextInput } from "flowbite-react";
import { Link } from "@inertiajs/react";
import { formatDateFromString } from "@/Tools/DateFormatter";

const TopicsTable = ({ topics, sections, locations }: any) => {
    //TODO types
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Section</Table.HeadCell>
                <Table.HeadCell>Location</Table.HeadCell>
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
                            <TextInput
                                value={topic.title}
                                onChange={() => {}}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Textarea
                                cols={50}
                                rows={3}
                                value={topic.description}
                                onChange={() => {}}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Select
                                value={topic.section_id}
                                onChange={() => {}}
                            >
                                {sections.map((section: any) => (
                                    <option
                                        key={section.id.toString()}
                                        value={section.id}
                                    >
                                        {section.title}
                                    </option>
                                ))}
                            </Select>
                        </Table.Cell>
                        <Table.Cell>
                            <Select
                                value={topic.location_id}
                                onChange={() => {}}
                            >
                                {locations.map((location: any) => (
                                    <option
                                        key={location.id.toString()}
                                        value={location.id}
                                    >
                                        {location.name}
                                    </option>
                                ))}
                            </Select>
                        </Table.Cell>
                        <Table.Cell>
                            <TextInput value={topic.url} onChange={() => {}} />
                        </Table.Cell>
                        <Table.Cell className="w-{200px} overflow-hidden">
                            {topic.slug}
                        </Table.Cell>
                        <Table.Cell>
                            {formatDateFromString(topic.updated_at)[0]}
                            <br />
                            {formatDateFromString(topic.updated_at)[1]}
                        </Table.Cell>
                        <Table.Cell>
                            <a
                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                href="/tables"
                            >
                                <p>Save</p>
                            </a>
                            <br />
                            <a
                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                href="/tables"
                            >
                                <p>Delete</p>
                            </a>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default TopicsTable;
