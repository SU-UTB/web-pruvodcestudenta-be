import { AxiosInstance } from "axios";

import { Constants } from "../tools/Constants";
import { IContent } from "../lib/interfaces/IContent";
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
