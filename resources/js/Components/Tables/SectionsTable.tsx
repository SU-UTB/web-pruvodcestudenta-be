import {Button, Table, Textarea, TextInput} from "flowbite-react";
import {formatDateFromString} from "@/Tools/DateFormatter";
import {IconContext} from "react-icons";
import {FaEye, FaEyeSlash} from "react-icons/fa6";

const SectionsTable = ({
                           sections,
                           sectionImages,
                           onDeleteSection,
                           onEditSection,
                       }: any) => {
    //TODO types
    return (
        <Table striped={true}>
            <Table.Head>
                <Table.HeadCell>Název</Table.HeadCell>
                <Table.HeadCell>Popis</Table.HeadCell>
                <Table.HeadCell>Obrázek</Table.HeadCell>
                <Table.HeadCell>Barva</Table.HeadCell>
                <Table.HeadCell>Slug</Table.HeadCell>
                <Table.HeadCell>Viditelné</Table.HeadCell>
                <Table.HeadCell>Upraveno</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Akce</span>
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
                                <div/>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            <div className='flex justify-content-center items-center gap-2'>
                                <div className={"w-6 h-6 rounded-full"} style={{backgroundColor: `${section.color}`}}/>
                                {section.color}
                            </div>
                        </Table.Cell>
                        <Table.Cell>{section.slug}</Table.Cell>
                        <Table.Cell>
                            {section.visible ? (
                                <IconContext.Provider
                                    value={{color: "green", size: "2em"}}
                                >
                                    <FaEye/>
                                </IconContext.Provider>
                            ) : (
                                <IconContext.Provider
                                    value={{color: "red", size: "2em"}}
                                >
                                    <FaEyeSlash/>
                                </IconContext.Provider>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {formatDateFromString(section.updated_at)[0]}
                            <br/>
                            {formatDateFromString(section.updated_at)[1]}
                        </Table.Cell>

                        <Table.Cell>
                            <Button
                                color={'primary'}
                                size={"xs"}
                                onClick={() => onEditSection(section)}
                            >
                                <p>Upravit</p>
                            </Button>
                            <br/>
                            <Button
                                size={"xs"}
                                color="failure"
                                onClick={() => onDeleteSection(section.id)}
                            >
                                <p>Smazat</p>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default SectionsTable;
