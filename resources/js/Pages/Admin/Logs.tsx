import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Button, Pagination, Tabs, TextInput } from "flowbite-react";
import React, { FormEvent, useState } from "react";
import { ILocation, LocationModal } from "@/Components/Modals/LocationModal";
import LogsTable from "@/Components/Tables/LogsTable";
import { ILog, LogsModal } from "@/Components/Modals/LogsModal";

export default function Logs({ auth, paginationLogs, search }: any) {
    const [modalData, setModalData] = useState<{
        isVisible: boolean;
        log: ILog | null;
    }>({
        isVisible: false,
        log: null,
    });

    function onLogDetail(log: any) {
        if (log.level_name === "NOTICE") {
            console.log(log);

            setModalData({
                isVisible: true,
                log: {
                    message: log.message + ", User: " + log.context.user.email,
                    context: JSON.stringify(log.context.context),
                },
            });
        } else {
            setModalData({
                isVisible: true,
                log: {
                    message: log.message,
                    context: log.context.exception,
                },
            });
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Logs
                </h2>
            }
        >
            <Head title="Logs" />
            <br />

            <Tabs.Group aria-label="Logs tabs" style="underline">
                <Tabs.Item title="User logs" active={true}>
                    <LogsTable
                        key={paginationLogs.data.length.toString()}
                        logs={paginationLogs.data.filter(
                            (l: any) => l.level_name === "NOTICE",
                        )}
                        onLogDetail={onLogDetail}
                    />
                </Tabs.Item>
                <Tabs.Item title="App logs" active={false}>
                    <LogsTable
                        key={paginationLogs.data.length.toString()}
                        logs={paginationLogs.data.filter(
                            (l: any) => l.level_name !== "NOTICE",
                        )}
                        onLogDetail={onLogDetail}
                    />
                </Tabs.Item>
            </Tabs.Group>

            <br />

            {/*TODO generic pagination*/}
            <div className="mx-auto flex justify-center items-center px-4">
                <Pagination
                    currentPage={paginationLogs.current_page}
                    onPageChange={(page) => {
                        router.visit(paginationLogs.path + "?page=" + page);
                    }}
                    totalPages={paginationLogs.last_page}
                />
            </div>
            <br />

            <LogsModal
                key={modalData.log?.toString()}
                isVisible={modalData.isVisible}
                onClose={() =>
                    setModalData({
                        isVisible: false,
                        log: null,
                    })
                }
                log={modalData.log}
            />
        </AuthenticatedLayout>
    );
}
