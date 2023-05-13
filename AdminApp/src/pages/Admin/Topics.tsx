import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import {
    Button,
    Modal,
    Spinner,
    Textarea,
    TextInput,
    Toast,
} from "flowbite-react";
import useFetchTopics from "../../hooks/topics/useFetchTopics";
import { ISection } from "../../lib/interfaces/ISection";
import React, { useState } from "react";
import { IContent } from "../../lib/interfaces/IContent";
import { Api } from "../../api/Api";

export default function Topics() {
    const { data: topics, isLoading } = useFetchTopics();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [topicData, setTopicData] = useState<IContent>({
        id: 0,
        title: "",
        link: "",
        bgColor: "",
        description: "",
    });

    const [buttonLoading, setButtonLoading] = useState(false);
    const [modalError, setModalError] = useState(null);

    async function onAddTopic() {
        setButtonLoading(true);
        setModalError(null);
        try {
            const response = await Api.Instance.topics.createTopic(topicData);
            setButtonLoading(false);
            setIsModalVisible(false);
            window.location.reload();
        } catch (e: any) {
            setModalError(e.response.data.message.toString());
        } finally {
            setButtonLoading(false);
        }
    }

    const updateModalFields = (fields: Partial<IContent>) => {
        setTopicData((prev) => {
            return { ...prev, ...fields };
        });
    };
    return isLoading ? (
        <div />
    ) : (
        <React.Fragment>
            <AuthenticatedLayout
                actions={
                    <Button
                        onClick={() => setIsModalVisible(true)}
                        className={"ml-auto"}
                    >
                        Add Topic
                    </Button>
                }
                header={"Topics"}
            >
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

                <Modal
                    show={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                >
                    //TODO Section pick dropdown
                    <Modal.Header>Add Topic</Modal.Header>
                    <Modal.Body>
                        <Toast
                            className={
                                modalError !== null ? "visible" : "hidden"
                            }
                        >
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                {/*
                                <HiX className="h-5 w-5" />
*/}
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {modalError}
                            </div>
                            <Toast.Toggle />
                        </Toast>
                        <br />

                        <TextInput
                            name="title"
                            required
                            defaultValue={topicData.title}
                            placeholder="Title"
                            onBlur={(e) =>
                                updateModalFields({ title: e.target.value })
                            }
                        />
                        <br />

                        <Textarea
                            rows={5}
                            required
                            name="description"
                            defaultValue={topicData.description}
                            placeholder="Description"
                            onBlur={(e) =>
                                updateModalFields({
                                    description: e.target.value,
                                })
                            }
                        />
                        <br />

                        <TextInput
                            name="link"
                            required
                            defaultValue={topicData.link}
                            placeholder="Link (e.g. pruvodce.cz/NejakaSekce/_link_)"
                            onBlur={(e) =>
                                updateModalFields({ link: e.target.value })
                            }
                        />
                        <br />
                        <TextInput
                            name="bg_color"
                            defaultValue={topicData.bgColor}
                            placeholder="Background color (e.g. #FFF111)"
                            onBlur={(e) =>
                                updateModalFields({ bgColor: e.target.value })
                            }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onAddTopic} disabled={buttonLoading}>
                            {buttonLoading ? <Spinner /> : "Add"}
                        </Button>
                        <Button
                            color="gray"
                            onClick={() => setIsModalVisible(false)}
                        >
                            Decline
                        </Button>
                    </Modal.Footer>
                </Modal>
            </AuthenticatedLayout>
        </React.Fragment>
    );
}

const ContentRow = (topic: IContent) => {
    const [data, setData] = useState<IContent>(topic);

    // @ts-ignore
    async function submit(e) {
        e.preventDefault();
        await Api.Instance.client.put(`/topics/${topic.id}`, data);
        window.location.reload();
    }

    async function deleteTopic(e: any) {
        e.preventDefault();
        await Api.Instance.client.delete(`/topics/${topic.id}`);
        window.location.reload();
    }
    const updateFields = (fields: Partial<IContent>) => {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    };

    //TODO Section pick dropdown
    return (
        <tr id={topic.id.toString()}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <TextInput
                    name="title"
                    defaultValue={topic.title}
                    onBlur={(e) => updateFields({ title: e.target.value })}
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Textarea
                    rows={5}
                    name="description"
                    defaultValue={topic.description}
                    onBlur={(e) =>
                        updateFields({ description: e.target.value })
                    }
                />
            </td>
            <td>
                <TextInput
                    name="link"
                    disabled={true}
                    defaultValue={topic.link}
                    onBlur={(e) => updateFields({ link: e.target.value })}
                />
            </td>
            <td>
                <TextInput
                    name="bg_color"
                    defaultValue={topic.bgColor}
                    onBlur={(e) => updateFields({ bgColor: e.target.value })}
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button onClick={submit}>Save</Button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button onClick={deleteTopic} color="failure">
                    Delete
                </Button>
            </td>
        </tr>
    );
};
