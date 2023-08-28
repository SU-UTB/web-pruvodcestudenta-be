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

interface ILocation {
    name: string;
}

interface ILocationModal {
    setOpenModal: (value: boolean) => any;
    isVisible: boolean;
    location: ILocation | null;
}

export const LocationModal = ({
    setOpenModal,
    isVisible,
    location = null,
}: ILocationModal) => {
    const [errors, setErrors] = useState<string | null>(null);
    const [data, setData] = useState(
        location ?? {
            name: "",
        }
    );

    return (
        <Modal show={isVisible} onClose={() => setOpenModal(false)}>
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

                <form className="flex max-w-md flex-col gap-4">
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
