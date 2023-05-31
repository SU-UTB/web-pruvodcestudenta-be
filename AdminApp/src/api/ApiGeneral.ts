import { AxiosInstance } from "axios";

import { Constants } from "../tools/Constants";
import { ITopic } from "../lib/interfaces/ITopic";
import { IDashboard } from "../lib/interfaces/IDashboard";

export class ApiGeneral {
    #client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.#client = client;
    }

    getDashboard = async () => {
        return await this.#client.get<IDashboard>(Constants.DASHBOARD);
    };
}
