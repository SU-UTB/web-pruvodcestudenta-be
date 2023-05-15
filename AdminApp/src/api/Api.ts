import axios, { AxiosInstance } from "axios";
import { ApiSections } from "./ApiSections";
import { Constants } from "../tools/Constants";
import { ApiTopics } from "./ApiTopics";
import { ApiGeneral } from "./ApiGeneral";
import { ApiUser } from "./ApiUser";

export class Api {
    private static _instance: Api;

    private constructor() {}

    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    client: AxiosInstance = axios.create({
        baseURL: Constants.API_URL,
        headers: { "Content-Type": "application/json" },
    });

    sections: ApiSections = new ApiSections(this.client);
    topics: ApiTopics = new ApiTopics(this.client);
    general: ApiGeneral = new ApiGeneral(this.client);
    user: ApiUser = new ApiUser(this.client);
}
