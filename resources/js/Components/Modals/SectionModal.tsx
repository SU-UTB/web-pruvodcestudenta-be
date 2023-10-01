import {
    Alert,
    Button,
    Checkbox,
    FileInput,
    Label,
    Modal,
    Select,
    Textarea,
    TextInput,
} from "flowbite-react";
import { TwitterPicker } from "react-color";

import { FormEvent, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Utils } from "@/Tools/Utils";
import { router, useForm } from "@inertiajs/react";

export interface ISection {
    id: number;
    title: string;
    description: string;
    slug: string;
    image: File | null;
    color: string;
}

interface IStoryModal {
    onClose: () => any;
    isVisible: boolean;
    section: ISection | null;
}

export const SectionModal = ({
    onClose,
    isVisible,
    section = null,
}: IStoryModal) => {
    const { data, setData, post, put, progress, errors, clearErrors } = useForm(
        section ?? {
            id: 0,
            title: "",
            description: "",
            slug: "",
            image: null,
            color: "",
        },
    );

    function submit(e: FormEvent) {
        e.preventDefault();

        if (section === null) {
            post("/admin/sections", {
                onSuccess: onClose,
            });
        } else {
            put(`/admin/sections/${data.id}`, {
                onSuccess: onClose,
            });
        }
    }

    return (
        <Modal show={isVisible} onClose={onClose}>
            <Modal.Header>
                {section !== null ? "Edit story" : "Add Story"}
            </Modal.Header>
            <Modal.Body>
                <form
                    className="flex max-w-md flex-col gap-4"
                    onSubmit={submit}
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
                            color={errors.title ? "failure" : ""}
                            helperText={
                                errors.title ? <>{errors.title}</> : null
                            }
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
                        <div>
                            {errors.description ? (
                                <>
                                    <br />
                                    <Alert color="failure">
                                        <span>
                                            <p>{errors.description}</p>
                                        </span>
                                    </Alert>
                                </>
                            ) : null}
                        </div>
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
                            <Label htmlFor="image" value="Upload image" />
                        </div>
                        <FileInput
                            id="image"
                            name="image"
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    image:
                                        val.target.files !== null
                                            ? val.target.files[0]
                                            : null,
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
                            color={errors.slug ? "failure" : ""}
                            helperText={errors.slug ? <>{errors.slug}</> : null}
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
