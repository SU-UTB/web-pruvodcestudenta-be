import PrimaryButton from "@/Components/PrimaryButton";
import { Button, Table, Textarea, TextInput } from "flowbite-react";
import { Link } from "@inertiajs/react";
import { formatDateFromString } from "@/Tools/DateFormatter";
import { Utils } from "@/Tools/Utils";
import { useState } from "react";

const LocationsTable = ({
    locations,
    onDeleteLocation,
    onSaveLocation,
}: any) => {
    //TODO types
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Updated At</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Actions</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {locations.map((location: any, index: number) => {
                    const [name, setName] = useState<string>(location.name);
                    return (
                        <Table.Row
                            key={index.toString()}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <TextInput
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(val) =>
                                        setName(val.target.value)
                                    }
                                    required
                                    type="text"
                                />
                            </Table.Cell>

                            <Table.Cell>
                                {formatDateFromString(location.updated_at)[0]}
                                <br />
                                {formatDateFromString(location.updated_at)[1]}
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    size={"xs"}
                                    onClick={() =>
                                        onSaveLocation({
                                            ...location,
                                            name: name,
                                        })
                                    }
                                >
                                    <p>Save</p>
                                </Button>
                                <br />
                                <Button
                                    size={"xs"}
                                    color="failure"
                                    onClick={() =>
                                        onDeleteLocation(location.id)
                                    }
                                >
                                    <p>Delete</p>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default LocationsTable;
