import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import {
    Button,
    Modal,
    Spinner,
    Textarea,
    TextInput,
    Toast,
} from "flowbite-react";
import useFetchSections from "../../hooks/sections/useFetchSections";
import {ISection} from "../../lib/interfaces/ISection";
import {useState} from "react";
import {Api} from "../../api/Api";
import React from "react";
import {AxiosError} from "axios";

export default function Sections() {
    const {data: sections, isLoading} = useFetchSections();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sectionData, setSectionData] = useState<ISection>({
        id: 0,
        title: "",
        link: "",
        bgColor: "",
        description: "",
        topics: [],
        section_id: 0
    });
    const [buttonLoading, setButtonLoading] = useState(false);
    const [modalError, setModalError] = useState(null);

    async function onAddSection() {
        setButtonLoading(true);
        setModalError(null);
        try {
            const response = await Api.Instance.sections.createSection(
                sectionData
            );
            setButtonLoading(false);
            setIsModalVisible(false);
            window.location.reload();
        } catch (e: any) {
            setModalError(e.response.data.message.toString());
        } finally {
            setButtonLoading(false);
        }
    }

    const updateModalFields = (fields: Partial<ISection>) => {
        setSectionData((prev) => {
            return {...prev, ...fields};
        });
    };
    return isLoading ? (
        <div/>
    ) : (
        <React.Fragment>
            <AuthenticatedLayout
                actions={
                    <Button
                        onClick={() => setIsModalVisible(true)}
                        className={"ml-auto"}
                    >
                        Add Section
                    </Button>
                }
                header={"Sections"}
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
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Delete</span>
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
                         section_id={0}/>
                    ))}
                    </tbody>
                </table>

                <Modal
                    show={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                >
                    <Modal.Header>Add Section</Modal.Header>
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
                            defaultValue={sectionData.title}
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
                            defaultValue={sectionData.description}
                            placeholder="Description"
                            onBlur={(e) =>
                                updateModalFields({
                                    description: e.target.value,
                                })
                            }
                        />
                        <br/>

                        <TextInput
                            name="link"
                            required
                            defaultValue={sectionData.link}
                            placeholder="Link (e.g. pruvodce.cz/_link_/clanek1)"
                            onBlur={(e) =>
                                updateModalFields({link: e.target.value})
                            }
                        />
                        <br/>
                        <TextInput
                            name="bg_color"
                            defaultValue={sectionData.bgColor}
                            placeholder="Background color (e.g. #FFF111)"
                            onBlur={(e) =>
                                updateModalFields({bgColor: e.target.value})
                            }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onAddSection} disabled={buttonLoading}>
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

const SectionRow = (section: ISection) => {
    const [data, setData] = useState<ISection>(section);

    // @ts-ignore
    async function submit(e) {
        e.preventDefault();
        await Api.Instance.client.put(`/sections/${section.id}`, data);
        window.location.reload();
    }

    async function deleteSection(e: any) {
        e.preventDefault();
        await Api.Instance.client.delete(`/sections/${section.id}`);
        window.location.reload();
    }

    const updateFields = (fields: Partial<ISection>) => {
        setData((prev) => {
            return {...prev, ...fields};
        });
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <TextInput
                    name="title"
                    defaultValue={section.title}
                    onBlur={(e) => updateFields({title: e.target.value})}
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Textarea
                    rows={5}
                    name="description"
                    defaultValue={section.description}
                    onBlur={(e) =>
                        updateFields({description: e.target.value})
                    }
                />
            </td>
            <td>
                <TextInput
                    name="link"
                    disabled={true}
                    defaultValue={section.link}
                    onBlur={(e) => updateFields({link: e.target.value})}
                />
            </td>
            <td>
                <TextInput
                    name="bg_color"
                    defaultValue={section.bgColor}
                    onBlur={(e) => updateFields({bgColor: e.target.value})}
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button onClick={submit}>Save</Button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button onClick={deleteSection} color="failure">
                    Delete
                </Button>
            </td>
        </tr>
    );
};
