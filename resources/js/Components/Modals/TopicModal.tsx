import {
    Alert,
    Button,
    Checkbox,
    FileInput,
    Label,
    Modal,
    Select,
    TextInput,
    ToggleSwitch,
} from "flowbite-react";

import { FormEvent, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Utils } from "@/Tools/Utils";
import { useForm } from "@inertiajs/react";

export interface ITopic {
    id: number;
    title: string;
    description: string;
    location: string;
    slug: string;
    visible: boolean;
    url: string;
    section_id: number;
    location_id: number;
    image: File | string | null;
}

interface ITopicModal {
    onClose: () => any;
    isVisible: boolean;
    topic: ITopic | null;
    sections: any;
    locations: any;
    image: string | null;
}

export const TopicModal = ({
    onClose,
    isVisible,
    topic = null,
    sections,
    locations,
    image = null,
}: ITopicModal) => {
    const { data, setData, post, put, progress, errors, clearErrors } =
        useForm<ITopic>(
            topic !== null
                ? {
                      ...topic,
                      image: image,
                  }
                : {
                      id: 0,
                      title: "",
                      description: "",
                      location: "",
                      slug: "",
                      url: "",
                      visible: true,
                      section_id: 1,
                      location_id: 1,
                      image: null,
                  },
        );

    function submit(e: FormEvent) {
        e.preventDefault();

        if (topic === null) {
            post("/admin/topics", {
                onSuccess: onClose,
            });
        } else {
            post(`/admin/topics/${data.id}`, {
                onSuccess: onClose,
            });
        }
    }

    return (
        <Modal show={isVisible} onClose={onClose} size="2xl">
            <Modal.Header>Add Topic</Modal.Header>
            <Modal.Body>
                <form
                    className="flex max-w-md flex-col gap-4 justify-center align-items-center"
                    onSubmit={submit}
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
                            <Label htmlFor="location" value="Topic location" />
                        </div>
                        <TextInput
                            id="location"
                            placeholder="Location"
                            value={data.location}
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    location: val.target.value,
                                })
                            }
                            type="text"
                            color={errors.location ? "failure" : ""}
                            helperText={
                                errors.location ? <>{errors.location}</> : null
                            }
                        />
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
                            <Label htmlFor="image" value="Upload image" />
                        </div>
                        {typeof data.image === "string" ? (
                            <>
                                <img
                                    width={250}
                                    src={"../images/topics/" + image}
                                    alt={image ?? ""}
                                />
                                <br />
                                <Button
                                    size={"xs"}
                                    onClick={() =>
                                        setData({
                                            ...data,
                                            image: null,
                                        })
                                    }
                                >
                                    <p>Remove image</p>
                                </Button>
                            </>
                        ) : (
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
                        )}
                    </div>
                    <div>
                        <br />
                        <br />
                        <ToggleSwitch
                            checked={data.visible}
                            label="Display on website"
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    visible: val,
                                })
                            }
                        />
                        <br />
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
                            color={errors.slug ? "failure" : ""}
                            helperText={errors.slug ? <>{errors.slug}</> : null}
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
