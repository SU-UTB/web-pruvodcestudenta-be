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

export interface ILog {
    message: string;
    context: string;
}

interface ILogModal {
    onClose: () => void;
    isVisible: boolean;
    log: ILog | null;
}

export const LogsModal = ({ onClose, isVisible, log }: ILogModal) => {
    const [errors, setErrors] = useState<string | null>(null);
    const [data, setData] = useState<ILog>(
        log ?? {
            message: "",
            context: "",
        },
    );

    return (
        <Modal show={isVisible} onClose={onClose} size="l">
            <Modal.Header>Log details</Modal.Header>
            <Modal.Body>
                <p>{data.message}</p>
                <br />
                <p>{data.context}</p>
            </Modal.Body>
        </Modal>
    );
};
