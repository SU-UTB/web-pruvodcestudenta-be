import { useEffect, useState } from "react";
import { Api } from "../api/Api";
import { IDashboard } from "../lib/interfaces/IDashboard";

const useFetchDashboard = () => {
    const [data, setData] = useState<IDashboard>({
        countOfSections: 0,
        countOfTopics: 0,
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const abortController = new AbortController();

        const getData = async () => {
            try {
                const { data } = await Api.Instance.general.getDashboard();
                setData(data);
                setError(null);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unexpected error");
                }
            } finally {
                setIsLoading(false);
            }
        };

        getData();
        return () => abortController.abort();
    }, []);

    return { data, isLoading, error };
};

export default useFetchDashboard;
