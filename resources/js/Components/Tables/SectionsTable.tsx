import { Button, Table, Textarea, TextInput } from "flowbite-react";
import { formatDateFromString } from "@/Tools/DateFormatter";

const SectionsTable = ({
    sections,
    sectionImages,
    onDeleteSection,
    onEditSection,
}: any) => {
    //TODO types
    console.log(sectionImages);
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Color</Table.HeadCell>
                <Table.HeadCell>Slug</Table.HeadCell>
                <Table.HeadCell>Updated At</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Actions</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {sections.map((section: any, index: number) => (
                    <Table.Row
                        key={index.toString()}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {section.title}
                        </Table.Cell>
                        <Table.Cell>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: section.description,
                                }}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            {sectionImages.filter(
                                (i: any) => i.section_id === section.id,
                            )[0] !== undefined ? (
                                <img
                                    width={250}
                                    src={
                                        "../images/sections/" +
                                            sectionImages.filter(
                                                (i: any) =>
                                                    i.section_id === section.id,
                                            )[0]?.name ?? ""
                                    }
                                    alt={
                                        sectionImages.filter(
                                            (i: any) =>
                                                i.section_id === section.id,
                                        )[0]?.name ?? ""
                                    }
                                />
                            ) : (
                                <div />
                            )}
                        </Table.Cell>
                        <Table.Cell>{section.color}</Table.Cell>
                        <Table.Cell>{section.slug}</Table.Cell>
                        <Table.Cell>
                            {formatDateFromString(section.updated_at)[0]}
                            <br />
                            {formatDateFromString(section.updated_at)[1]}
                        </Table.Cell>
                        <Table.Cell>
                            <Button
                                size={"xs"}
                                onClick={() => onEditSection(section)}
                            >
                                <p>Edit</p>
                            </Button>
                            <br />
                            <Button
                                size={"xs"}
                                color="failure"
                                onClick={() => onDeleteSection(section.id)}
                            >
                                <p>Delete</p>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default SectionsTable;
