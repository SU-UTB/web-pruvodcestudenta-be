import { AxiosInstance } from "axios";

import { Constants } from "../tools/Constants";
import { ITopic } from "../lib/interfaces/ITopic";
import { ISection } from "../lib/interfaces/ISection";

export class ApiTopics {
    #client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.#client = client;
    }

    getTopics = async () => {
        return await this.#client.get<Array<ITopic>>(Constants.TOPICS);
    };
    getTopic = async (id: number) => {
        return await this.#client.get<ITopic>(`${Constants.TOPICS}/${id}`);
    };

    async createTopic(topicData: ITopic | undefined) {
        return await this.#client.post<Object, any>(
            `${Constants.TOPICS}`,
            topicData
        );
    }
}
