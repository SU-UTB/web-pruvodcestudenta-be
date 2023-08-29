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
import { TwitterPicker } from "react-color";

import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Utils } from "@/Tools/Utils";

export interface ISection {
    id: number;
    title: string;
    description: string;
    slug: string;
    color: string;
}

interface IStoryModal {
    onClose: () => any;
    onSubmit: (data: ISection, createNew: boolean) => any;
    isVisible: boolean;
    section: ISection | null;
}

export const SectionModal = ({
    onClose,
    onSubmit,
    isVisible,
    section = null,
}: IStoryModal) => {
    const [errors, setErrors] = useState<string | null>(null);
    const [data, setData] = useState<ISection>(
        section ?? {
            id: 0,
            title: "",
            description: "",
            slug: "",
            color: "",
        }
    );
    return (
        <Modal show={isVisible} onClose={onClose}>
            <Modal.Header>
                {section !== null ? "Edit story" : "Add Story"}
            </Modal.Header>
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
                    onSubmit={() => onSubmit(data, section === null)}
                >
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Story title" />
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
                                value="Story description"
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
                            <Label htmlFor="color" value="Story color" />
                        </div>
                        <br />
                        <TwitterPicker
                            color={data.color}
                            onChange={(color) =>
                                setData({
                                    ...data,
                                    color: color.hex,
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
                            disabled={section !== null}
                            type="text"
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    slug: val.target.value,
                                })
                            }
                        />
                    </div>
                    {section === null ? (
                        <Alert color="warning" withBorderAccent>
                            <span>
                                <p>
                                    Pečlivě zkontroluj slug! Slug je automaticky
                                    vygenerované slovo z názvu.
                                    <br />
                                    Toto slovo bude použito pro identifikaci
                                    sekce v url adrese.
                                    <br />
                                    Např.
                                    "www.pruvodcestudenta.utb.cz/sekce/nazevSekce/_slug_".
                                    <br />
                                    Slug musí být unikátní, slug nelze později
                                    změnit.
                                </p>
                            </span>
                        </Alert>
                    ) : (
                        <></>
                    )}

                    <Button type="submit">
                        {section === null ? "Create" : "Save"}
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};
