import {
    Alert,
    Label,

} from "flowbite-react";

import {FormEvent, useState} from "react";
import {Utils} from "@/Tools/Utils";
import {router, useForm} from "@inertiajs/react";
import {Dialog} from 'primereact/dialog';
import {Editor} from "primereact/editor";
import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import {ColorPicker} from "primereact/colorpicker";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";

export interface ISection {
    id: number;
    title: string;
    description: string;
    slug: string;
    visible: boolean;
    image: File | string | null;
    color: string;
}

interface ISectionModal {
    onClose: () => any;
    isVisible: boolean;
    section: ISection | null;
    image: string | null;
}

const defaultSection = {
    id: 0,
    title: "",
    description: "",
    slug: "",
    image: null,
    visible: true,
    color: "",
};

export const SectionModal = ({
                                 onClose,
                                 isVisible,
                                 section = null,
                                 image = null,
                             }: ISectionModal) => {
    const {data, setData, post, put, progress, errors, clearErrors} =
        useForm<ISection>(
            section !== null
                ? {
                    ...section,
                    image: image,
                }
                : defaultSection,
        );

    function submit(e: FormEvent) {
        e.preventDefault();

        if (section === null) {
            post("/admin/sections", {
                onSuccess: onClose,
            });
        } else {
            post(`/admin/sections/${data.id}`, {
                onSuccess: onClose,
            });
        }
    }

    console.log(data.image);
    return (
        <Dialog
            header={section !== null ? "Upravit sekci" : "Přidat sekci"}
            visible={isVisible} onHide={() => {
            setData(defaultSection);
            onClose();
        }} maximizable
            style={{width: '50vw'}}>

            <form
                className="flex flex-col gap-4 p-4"
                onSubmit={submit}
            >
                <div className='columns-2 gap-4'>

                    <div className='flex flex-col'>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Název sekce"/>
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
                            disabled={section !== null}
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
                {section === null ? (
                    <Alert color="warning" withBorderAccent>
                            <span>
                                <p>
                                    Pečlivě zkontroluj slug! Slug je automaticky
                                    vygenerované slovo z názvu.
                                    <br/>
                                    Toto slovo bude použito pro identifikaci
                                    sekce v url adrese.
                                    <br/>
                                    Např.
                                    "www.pruvodcestudenta.utb.cz/<b>sluzby</b>/menza-utb".
                                    <br/>
                                    "www.pruvodcestudenta.utb.cz/<b>{(data.slug == undefined || data.slug == '') ? '_slug_' : data.slug}</b>/menza-utb".
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
                            value="Popis sekce"
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
                            <Label htmlFor="color" value="Barva sekce"/>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <ColorPicker inputId="cp-hex" format="hex" value={data.color.split('#')[1]}
                                         onChange={(e) => setData({
                                             ...data,
                                             color: '#' + e.value?.toString() ?? '',
                                         })}/>

                            <InputText
                                id="colorInput"
                                placeholder="#000FFF"
                                value={data.color}
                                type="text"
                                onChange={(val) =>
                                    setData({
                                        ...data,
                                        color: val.target.value,
                                    })
                                }

                                invalid={!data.color.startsWith('#')}

                                aria-describedby="color-help"

                            />
                        </div>
                    </div>


                    <div className='flex flex-col max-w-max'>
                        <div className="mb-2 block">
                            <Label htmlFor="image" value="Obrázek sekce"/>
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

                <Button
                    type="submit" label={section === null ? "Vytvořit" : "Uložit"}>

                </Button>
            </form>
        </Dialog>
    );
};
