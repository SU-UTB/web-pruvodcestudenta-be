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
import { ITopic } from "@/Components/Modals/TopicModal";

export interface ILocation {
    id: number;
    name: string;
}

interface ILocationModal {
    onClose: () => any;
    onSubmit: (data: ILocation, createNew: boolean) => any;
    isVisible: boolean;
}

export const LocationModal = ({
    onClose,
    onSubmit,
    isVisible,
}: ILocationModal) => {
    const [errors, setErrors] = useState<string | null>(null);
    const [data, setData] = useState<ILocation>({
        id: 0,
        name: "",
    });

    return (
        <Modal show={isVisible} onClose={onClose}>
            <Modal.Header>Add Location</Modal.Header>
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
                    onSubmit={() => onSubmit(data, true)}
                >
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Location name" />
                        </div>
                        <TextInput
                            id="name"
                            placeholder="Name"
                            value={data.name}
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    name: val.target.value,
                                })
                            }
                            required
                            type="text"
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};
