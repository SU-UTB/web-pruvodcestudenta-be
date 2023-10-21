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
import { IconContext } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const TopicsTable = ({
    topics,
    topicImages,
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
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Section</Table.HeadCell>
                <Table.HeadCell>Location</Table.HeadCell>
                <Table.HeadCell>Location URL</Table.HeadCell>
                <Table.HeadCell>Url</Table.HeadCell>
                <Table.HeadCell>Slug</Table.HeadCell>
                <Table.HeadCell>Updated At</Table.HeadCell>
                <Table.HeadCell>Visible</Table.HeadCell>
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
                            {topicImages.filter(
                                (i: any) => i.topic_id === topic.id,
                            )[0] !== undefined ? (
                                <img
                                    width={250}
                                    src={
                                        "../images/topics/" +
                                            topicImages.filter(
                                                (i: any) =>
                                                    i.topic_id === topic.id,
                                            )[0]?.name ?? ""
                                    }
                                    alt={
                                        topicImages.filter(
                                            (i: any) => i.topic_id === topic.id,
                                        )[0]?.name ?? ""
                                    }
                                />
                            ) : (
                                <div />
                            )}
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
                            {topic.visible ? (
                                <IconContext.Provider
                                    value={{ color: "green", size: "2em" }}
                                >
                                    <FaEye />
                                </IconContext.Provider>
                            ) : (
                                <IconContext.Provider
                                    value={{ color: "red", size: "2em" }}
                                >
                                    <FaEyeSlash />
                                </IconContext.Provider>
                            )}
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
