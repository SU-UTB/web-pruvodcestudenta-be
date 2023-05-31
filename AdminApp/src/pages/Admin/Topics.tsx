import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import {
    Button,
    Dropdown,
    Modal,
    Select,
    Spinner,
    Textarea,
    TextInput,
    Toast,
} from "flowbite-react";
import useFetchTopics from "../../hooks/topics/useFetchTopics";
import {ISection} from "../../lib/interfaces/ISection";
import React, {useState} from "react";
import {IContent} from "../../lib/interfaces/IContent";
import {Api} from "../../api/Api";
import useFetchSections from "../../hooks/sections/useFetchSections";
import {TwitterPicker} from "react-color";


export default function Topics() {
    const {data: topics, isLoading: isTopicsLoading} = useFetchTopics();
    const {data: sections, isLoading: isSectionsLoading} = useFetchSections();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [topicData, setTopicData] = useState<IContent>({
        id: 0,
        title: "",
        link: "",
        url: "",
        bg_color: "",
        description: "",
        section_id: 0,
    });

    const [buttonLoading, setButtonLoading] = useState(false);
    const [modalError, setModalError] = useState(null);

    async function onAddTopic() {
        setButtonLoading(true);
        setModalError(null);
        try {
            await Api.Instance.topics.createTopic(topicData);
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
            return {...prev, ...fields};
        });
    };
    return isTopicsLoading && isSectionsLoading ? (
        <div/>
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
                            Section
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Url
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Color
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {topics.map((t: IContent) => (
                        <TopicRow
                            key={t.id.toString()}
                            topic={t}
                            sections={sections}
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
                            <div
                                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                {/*
                                <HiX className="h-5 w-5" />
*/}
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {modalError}
                            </div>
                            <Toast.Toggle/>
                        </Toast>
                        <br/>

                        <TextInput
                            name="title"
                            required
                            defaultValue={topicData.title}
                            placeholder="Title"
                            onBlur={(e) =>
                                updateModalFields({title: e.target.value})
                            }
                        />
                        <br/>

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
                        <br/>
                        <Select
                            id="section_id"
                            name="section_id"
                            defaultValue={topicData.section_id}
                            required={true}
                            onChange={(e) =>
                                updateModalFields({section_id: parseInt(e.target.value)})
                            }
                        >
                            {sections.map((s) => (
                                <option key={"option-" + s.id} value={s.id}>
                                    {s.title}
                                </option>
                            ))}
                        </Select>

                        <br/>
                        <TextInput
                            name="url"
                            required
                            defaultValue={topicData.url}
                            placeholder="www.someAddress.com"
                            onBlur={(e) =>
                                updateModalFields({url: e.target.value})
                            }
                        />
                        <br/>
                        <TextInput
                            name="bg_color"
                            defaultValue={topicData.bg_color}
                            placeholder="Background color (e.g. #FFF111)"
                            onBlur={(e) =>
                                updateModalFields({bg_color: e.target.value})
                            }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onAddTopic} disabled={buttonLoading}>
                            {buttonLoading ? <Spinner/> : "Add"}
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


interface ITopicRowProps {
    topic: IContent;
    sections: Array<ISection>;
}

const TopicRow = ({topic, sections}: ITopicRowProps) => {
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
            return {...prev, ...fields};
        });
    };

    return (
        <>
            <tr id={topic.id.toString()}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <TextInput
                        name="title"
                        defaultValue={topic.title}
                        onBlur={(e) => updateFields({title: e.target.value})}
                    />
                </td>


                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Select
                        id="row_section_id"
                        name="section_id"
                        defaultValue={topic.section_id}
                        required={true}
                        onChange={(e) =>
                            updateFields({section_id: parseInt(e.target.value)})
                        }
                    >
                        {sections.map((s) => (
                            <option key={"row-option-" + s.id} value={s.id}>
                                {s.title}
                            </option>
                        ))}
                    </Select>

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <TextInput
                        name="url"
                        defaultValue={topic.url}
                        onBlur={(e) => updateFields({url: e.target.value})}
                    />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">

                    <TwitterPicker
                        color={topic.bg_color}
                        onChange={(e) => updateFields({bg_color: e.hex})}

                    />

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button onClick={submit}>Save</Button>
                    <br/>
                    <Button onClick={deleteTopic} color="failure">
                        Delete
                    </Button>
                </td>
            </tr>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={5}>
                    <Textarea
                        rows={3}
                        name="description"
                        defaultValue={topic.description}
                        onBlur={(e) =>
                            updateFields({description: e.target.value})
                        }
                    />
                </td>
            </tr>
        </>
    );
};
