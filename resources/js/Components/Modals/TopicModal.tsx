import {
    Alert,
    Button,
    Checkbox,
    Label,
    Modal,
    Select,
    Textarea,
    TextInput,
} from "flowbite-react";

import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Utils } from "@/Tools/Utils";
import { ISection } from "@/Components/Modals/SectionModal";

export interface ITopic {
    id: number;
    title: string;
    description: string;
    slug: string;
    url: string;
    section_id: number;
    location_id: number;
}

interface ITopicModal {
    onClose: () => any;
    onSubmit: (data: ITopic, createNew: boolean) => any;
    isVisible: boolean;
    topic: ITopic | null;
    sections: any;
    locations: any;
}

export const TopicModal = ({
    onClose,
    onSubmit,
    isVisible,
    topic = null,
    sections,
    locations,
}: ITopicModal) => {
    const [errors, setErrors] = useState<string | null>(null);
    const [data, setData] = useState(
        topic ?? {
            id: 0,
            title: "",
            description: "",
            slug: "",
            url: "",
            section_id: 1,
            location_id: 1,
        }
    );

    return (
        <Modal show={isVisible} onClose={onClose}>
            <Modal.Header>Add Topic</Modal.Header>
            <Modal.Body>
                {errors !== null ? (
                    <>
                        <Alert color="failure">
                            <span>
                                <p>
                                    <span className="font-medium">
                                        Info alert!
                                    </span>
                                    Change a few things up and try submitting
                                    again.
                                </p>
                            </span>
                        </Alert>
                        <br />
                    </>
                ) : (
                    <div />
                )}

                <form
                    className="flex max-w-md flex-col gap-4"
                    onSubmit={() => onSubmit(data, topic === null)}
                >
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Topic title" />
                        </div>
                        <TextInput
                            id="title"
                            placeholder="Title"
                            value={data.title}
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    title: val.target.value,
                                    slug: Utils.getSlug(val.target.value),
                                })
                            }
                            required
                            type="text"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="description"
                                value="Topic description"
                            />
                        </div>
                        <CKEditor
                            id="description"
                            editor={ClassicEditor}
                            data={data.description}
                            onChange={(event, editor) => {
                                setData({
                                    ...data,
                                    description: editor.getData(),
                                });
                            }}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="section_id" value="Topic section" />
                        </div>
                        <Select
                            id="section_id"
                            value={data.section_id}
                            required
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    section_id:
                                        sections[e.target.selectedIndex].id,
                                })
                            }
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
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="location_id"
                                value="Topic location"
                            />
                        </div>
                        <Select
                            id="location_id"
                            value={data.location_id}
                            required
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    location_id:
                                        locations[e.target.selectedIndex].id,
                                })
                            }
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
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="url" value="Topic url" />
                        </div>
                        <TextInput
                            id="url"
                            placeholder="www.topic.xxx"
                            type="text"
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    url: val.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="slug" value="Slug" />
                        </div>
                        <TextInput
                            id="slug"
                            placeholder=""
                            value={data.slug}
                            required
                            disabled={topic !== null}
                            type="text"
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    slug: val.target.value,
                                })
                            }
                        />
                    </div>
                    <Alert color="warning" withBorderAccent>
                        <span>
                            <p>
                                Pečlivě zkontroluj slug! Slug je automaticky
                                vygenerované slovo z názvu.
                                <br />
                                Toto slovo bude použito pro identifikaci sekce v
                                url adrese.
                                <br />
                                Např.
                                "www.pruvodcestudenta.utb.cz/sekce/nazevSekce/_slug_".
                                <br />
                                Slug musí být unikátní, slug nelze později
                                změnit.
                            </p>
                        </span>
                    </Alert>

                    <Button type="submit">
                        {topic === null ? "Create" : "Save"}
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};
