import {Button, Table, Textarea, TextInput} from "flowbite-react";
import {formatDateFromString} from "@/Tools/DateFormatter";
import {IconContext} from "react-icons";
import {FaEye, FaEyeSlash} from "react-icons/fa6";

const UsersTable = ({
                        users,
                    }: any) => {
    //TODO types
    return (
        <Table striped={true}>
            <Table.Head>
                <Table.HeadCell>Jméno</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Vytvořeno</Table.HeadCell>
                <Table.HeadCell>Upraveno</Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y">
                {users.map((user: any, index: number) => (
                    <Table.Row
                        key={index.toString()}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {user.name}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                       {user.roles[0].name}
                        </Table.Cell>
                        <Table.Cell
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.email}
                    </Table.Cell>

                        <Table.Cell>
                            {formatDateFromString(user.created_at)[0]}
                            <br/>
                            {formatDateFromString(user.created_at)[1]}
                        </Table.Cell>
                        <Table.Cell>
                            {formatDateFromString(user.updated_at)[0]}
                            <br/>
                            {formatDateFromString(user.updated_at)[1]}
                        </Table.Cell>


                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default UsersTable;
