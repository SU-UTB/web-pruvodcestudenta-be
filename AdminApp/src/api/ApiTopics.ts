import { AxiosInstance } from "axios";

import { Constants } from "../tools/Constants";
import { IContent } from "../lib/interfaces/IContent";
import { ISection } from "../lib/interfaces/ISection";

export class ApiTopics {
    #client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.#client = client;
    }

    getTopics = async () => {
        return await this.#client.get<Array<IContent>>(Constants.TOPICS);
    };
    getTopic = async (id: number) => {
        return await this.#client.get<IContent>(`${Constants.TOPICS}/${id}`);
    };

    async createTopic(topicData: IContent | undefined) {
        return await this.#client.post<Object, any>(
            `${Constants.TOPICS}`,
            topicData
        );
    }
}
