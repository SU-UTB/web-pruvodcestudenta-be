import { AxiosInstance } from "axios";

import { Constants } from "../tools/Constants";
import { IContent } from "../lib/interfaces/IContent";
import { IDashboard } from "../lib/interfaces/IDashboard";
import { IUser } from "../hooks/user/useCheckLogin";

export class ApiUser {
    #client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.#client = client;
    }

    logIn = async (email: string, password: string) => {
        return await this.#client.post<IUser>(Constants.DASHBOARD, {
            email: email,
            password: password,
        });
    };
    /*  getUser = async () => {
        return await this.#client.get<IUser>(Constants.USER);
    };*/
}
