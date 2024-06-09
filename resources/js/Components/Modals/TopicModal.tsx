import {
    Alert,
    Label,

} from "flowbite-react";


import {FormEvent, useState} from "react";
import {Dialog} from 'primereact/dialog';
import {Editor} from "primereact/editor";
import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import {ColorPicker} from "primereact/colorpicker";
import {Checkbox} from "primereact/checkbox";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Utils} from "@/Tools/Utils";
import {useForm} from "@inertiajs/react";

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

const defaultTopic: ITopic = {
    id: 0,
    title: '',
    description: '',
    location: '',
    slug: '',
    visible: true,
    url: '',
    section_id: 0,
    location_id: 0,
    image: null,
};
export const TopicModal = ({
                               onClose,
                               isVisible,
                               topic = null,
                               sections,
                               locations,
                               image = null,
                           }: ITopicModal) => {
    const {data, setData, post, put, progress, errors, clearErrors} =
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
        <Dialog header={topic !== null ? "Upravit článek" : "Přidat článek"}
                visible={isVisible} onHide={() => {
            setData(defaultTopic);
            onClose();
        }}
                maximizable
                style={{width: '50vw'}}>
            <form
                className="flex flex-col gap-4 p-4"
                onSubmit={submit}
            >
                <div className='columns-2 gap-4'>
                    <div className='flex flex-col'>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Název článku"/>
                        </div>
                        <InputText
                            id="title"
                            placeholder="Název..."
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
                            invalid={errors.title !== undefined}
                            aria-describedby="title-help"
                        />

                        <small id="title-help">
                            {
                                errors.title ? <>{errors.title}</> : ''
                            }
                        </small>
                    </div>
                    <div className='flex flex-col'
                    >
                        <div className="mb-2 block">
                            <Label htmlFor="slug" value="Slug"/>
                        </div>
                        <InputText
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
                            invalid={errors.slug !== undefined}

                            aria-describedby="slug-help"

                        />
                        <small id="slug-help">
                            {
                                errors.slug ? <>{errors.slug}</> : ''
                            }
                        </small>

                    </div>

                </div>

                {topic === null ? (
                    <Alert color="warning" withBorderAccent>
                            <span>
                                <p>
                                    Pečlivě zkontroluj slug! Slug je automaticky
                                    vygenerované slovo z názvu.
                                    <br/>
                                    Toto slovo bude použito pro identifikaci
                                    článku v url adrese.
                                    <br/>
                                    Např.
                                    "www.pruvodcestudenta.utb.cz/sluzby/<b>menza-utb</b>".
                                    <br/>
                                    "www.pruvodcestudenta.utb.cz/sluzby/<b>{(data.slug == undefined || data.slug == '') ? '_slug_' : data.slug}</b>".
                                    <br/>
                                    Slug musí být unikátní, slug nelze později
                                    změnit.
                                </p>
                            </span>
                    </Alert>
                ) : (
                    <></>
                )}


                <div className='mt-4 mb-4'>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="description"
                            value="Popis článku"
                        />
                    </div>
                    <Editor
                        id="description"
                        value={data.description}
                        onTextChange={(event) => {
                            setData({
                                ...data,
                                description: event.htmlValue ?? event.textValue,
                            });
                        }}
                    />
                    <div>
                        {errors.description ? (
                            <>
                                <br/>
                                <Alert color="failure">
                                        <span>
                                            <p>{errors.description}</p>
                                        </span>
                                </Alert>
                            </>
                        ) : null}
                    </div>
                </div>


                <div className='columns-2 gap-4'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="section_id" value="Sekce článku"/>
                        </div>
                        <Dropdown
                            id="section_id"
                            className='w-full'
                            value={sections.find(l => l.id === data.section_id)}
                            required
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    section_id:
                                    e.value.id,
                                })
                            }
                            optionLabel={'title'}
                            options={sections}
                        />

                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="location_id"
                                value="Lokace"
                            />
                        </div>
                        <Dropdown
                            id="location_id"
                            className='w-full'
                            value={locations.find(l => l.id === data.location_id)}
                            required
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    location_id:
                                    e.value.id,
                                })
                            }
                            optionLabel={'name'}
                            options={locations}
                        />

                    </div>
                </div>

                <div className='columns-2 gap-4'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="location" value="URL Mapy"/>
                        </div>
                        <InputText
                            id="location"
                            className='w-full'
                            placeholder="https://maps.app.goo.gl/xxx"
                            value={data.location}
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    location: val.target.value,
                                })
                            }
                            type="text"
                            color={errors.location ? "failure" : ""}
                            invalid={errors.location !== undefined}

                            aria-describedby="location-help"
                        />
                        <small id="location-help">
                            {
                                errors.location ? <>{errors.location}</> : ''
                            }
                        </small>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="url" value="URL Místa"/>
                        </div>
                        <InputText
                            id="url"
                            className='w-full'
                            placeholder="www.utb.cz"
                            type="text"
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    url: val.target.value,
                                })
                            }
                        />
                    </div>
                </div>


                <div className='columns-2 gap-4'>
                    <div className='mt-4 mb-4 flex flex-col '>
                        <div className="mb-2 block">
                            <Label htmlFor="color" value="Viditelnost"/>
                        </div>

                        <div className="flex align-items-center mt-3">
                            <Checkbox
                                inputId='visible'
                                checked={data.visible}
                                onChange={(val) =>
                                    setData({
                                        ...data,
                                        visible: val.checked ?? false,
                                    })
                                }
                            />
                            <label htmlFor="visible" className="ml-2">Viditelné na webu</label>
                        </div>

                    </div>


                    <div className='flex flex-col max-w-max'>
                        <div className="mb-2 block">
                            <Label htmlFor="image" value="Obrázek článku"/>
                        </div>
                        <FileUpload mode="basic" name="image" id='image' accept="image/*"
                                    chooseLabel={'Vybrat obrázek'}
                                    cancelLabel={'Odebrat'}
                                    uploadLabel={'ss'}
                                    onUpload={(val) =>
                                        setData({
                                            ...data,
                                            image:
                                                val.files !== null
                                                    ? val.files[0]
                                                    : null,
                                        })
                                    }/>


                    </div>

                </div>


                {data.image !== null ? (
                    <>
                        <img
                            width={250}
                            src={"../images/sections/" + image}
                            alt={image ?? ""}
                        />
                        <br/>
                        <Button
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
                    <></>
                )}


                <Button
                    type="submit" label={topic === null ? "Vytvořit" : "Uložit"}>

                </Button>
            </form>
        </Dialog>
    );
};
