import { useEffect, useState } from "react";
import { Api } from "../../api/Api";
import { ISection } from "../../lib/interfaces/ISection";
import { IContent } from "../../lib/interfaces/IContent";

const useFetchTopics = () => {
    const [data, setData] = useState<IContent[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const abortController = new AbortController();

        const getData = async () => {
            try {
                const { data } = await Api.Instance.topics.getTopics();
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

export default useFetchTopics;
