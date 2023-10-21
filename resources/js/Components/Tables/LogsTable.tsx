import { Button, Table, Textarea, TextInput } from "flowbite-react";
import { formatDateFromString } from "@/Tools/DateFormatter";

const LogsTable = ({ logs, onLogDetail }: any) => {
    //TODO types
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Id</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
                <Table.HeadCell>Logged At</Table.HeadCell>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Context</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Actions</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {logs.map((log: any, index: number) => {
                    return (
                        <Table.Row
                            key={index.toString()}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {log.id}
                            </Table.Cell>

                            <Table.Cell>{log.message}</Table.Cell>
                            <Table.Cell>
                                {formatDateFromString(log.logged_at)[0]}
                                <br />
                                {formatDateFromString(log.logged_at)[1]}{" "}
                            </Table.Cell>
                            <Table.Cell>
                                {log.context.user ? (
                                    <>
                                        {log.context.user.name}
                                        <br />
                                        {log.context.user.email}
                                    </>
                                ) : (
                                    ""
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                {log.context.context ? (
                                    <>{JSON.stringify(log.context.context)}</>
                                ) : (
                                    ""
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    size={"xs"}
                                    onClick={() => onLogDetail(log)}
                                >
                                    <p>Detail</p>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default LogsTable;
