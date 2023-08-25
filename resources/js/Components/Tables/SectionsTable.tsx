import PrimaryButton from "@/Components/PrimaryButton";
import {Table, Textarea, TextInput} from 'flowbite-react';
import {Link} from "@inertiajs/react";
import {formatDateFromString} from "@/Tools/DateFormatter";

const SectionsTable = (sections: any) => {
    //TODO types
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>
                    Title
                </Table.HeadCell>
                <Table.HeadCell>
                    Description
                </Table.HeadCell>
                <Table.HeadCell>
                    Color
                </Table.HeadCell>
                <Table.HeadCell>
                    Slug
                </Table.HeadCell>
                <Table.HeadCell>
                    Updated At
                </Table.HeadCell>
                <Table.HeadCell>
          <span className="sr-only">
            Actions
          </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {sections.sections.map((section: any, index: number) =>
                    <Table.Row
                        key={index.toString()}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <TextInput value={section.title} onChange={() => {
                            }}/>
                        </Table.Cell>
                        <Table.Cell>
                            <Textarea
                                cols={50}
                                rows={3}
                                value={section.description} onChange={() => {
                            }}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TextInput value={section.color} onChange={() => {
                            }}/>
                        </Table.Cell>
                        <Table.Cell>
                            {section.slug}
                        </Table.Cell>
                        <Table.Cell>
                            {formatDateFromString(section.updated_at)[0]}
                            <br/>
                            {formatDateFromString(section.updated_at)[1]}
                        </Table.Cell>
                        <Table.Cell>

                            <a
                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                href="/tables"
                            >
                                <p>
                                    Save
                                </p>
                            </a>
                            <br/>
                            <a
                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                href="/tables"
                            >
                                <p>
                                    Delete
                                </p>
                            </a>
                        </Table.Cell>
                    </Table.Row>)}

            </Table.Body>
        </Table>
    );
};

export default SectionsTable;
