import {Alert, Button, Checkbox, Label, Modal, Select, Textarea, TextInput} from "flowbite-react";
import {useState} from "react";

interface ITopic {

}

interface ITopicModal {
    setOpenModal: (value: boolean) => any,
    isVisible: boolean,
    topic: ITopic | null
}

export const TopicModal = ({setOpenModal, isVisible, topic = null}: ITopicModal) => {
    const [errors, setErrors] = useState<string | null>(null);
    const [data, setData] = useState({
        title: '',
        description: '',
        slug: '',
    });

    function getSlug(input1: string) {

        var str = input1;
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return (str);
    }

    return <Modal show={isVisible} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Topic</Modal.Header>
        <Modal.Body>

            {
                errors !== null ? <><Alert
                    color="failure">
                          <span>
                            <p>
                              <span className="font-medium">
                                Info alert!
                              </span>
                              Change a few things up and try submitting again.
                            </p>
                          </span>
                </Alert>
                    <br/>
                </> : <div/>
            }

            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="title"
                            value="Topic title"
                        />
                    </div>
                    <TextInput
                        id="title"
                        placeholder="Title"
                        value={data.title}
                        onChange={val => setData({
                            ...data,
                            title: val.target.value,
                            slug: getSlug(val.target.value)
                        })}
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
                    <Textarea
                        id="description"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="section_id"
                            value="Topic section"
                        />
                    </div>
                    <Select
                        id="section_id"
                        required
                    ></Select>
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
                        required
                    ></Select>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="url"
                            value="Topic url"
                        />
                    </div>
                    <TextInput
                        id="url"
                        placeholder="www.topic.xxx"
                        required
                        type="text"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="slug"
                            value="Slug"
                        />
                    </div>
                    <TextInput
                        id="slug"
                        placeholder=""
                        value={data.slug}
                        required
                        type="text"
                    />
                </div>
                <Alert
                    color="warning"
                    withBorderAccent
                >
                          <span>
        <p>
            Pečlivě zkontroluj slug!
            Slug je automaticky vygenerované slovo z názvu.
            <br/>
            Toto slovo bude použito pro identifikaci sekce v url
            adrese.
            <br/>
            Např. "www.pruvodcestudenta.utb.cz/sekce/nazevSekce/_slug_".
            <br/>
            Slug musí být unikátní, slug nelze později změnit.
        </p>
                          </span>
                </Alert>

                <Button type="submit">
                    Submit
                </Button>
            </form>

        </Modal.Body>

    </Modal>;
}
