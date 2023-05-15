import { useEffect, useState } from "react";
import { Api } from "../../api/Api";

export interface IUserData {
    token: string;
    user: IUser;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
}

const useCheckLogin = () => {
    const [data, setData] = useState<IUser | null>({
        id: 0,
        name: "",
        email: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const abortController = new AbortController();

        const getData = async () => {
            try {
               // localStorage.setItem("user", JSON.stringify(person));

                const stringifiedPerson = localStorage.getItem("user");
                if (stringifiedPerson === null) {
                    setData(null);
                    setError(null);
                    setIsLoading(false);
                    return;
                }

                const personAsObjectAgain =
                    JSON.parse(stringifiedPerson);
                const { data } = await Api.Instance.user.getUser();
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

export default useCheckLogin;
