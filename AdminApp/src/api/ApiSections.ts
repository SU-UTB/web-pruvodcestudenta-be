import { AxiosInstance } from "axios";

import { Constants } from "../tools/Constants";
import { IContent } from "../lib/interfaces/IContent";
import { ISection } from "../lib/interfaces/ISection";

export class ApiSections {
    #client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.#client = client;
    }

    getSections = async () => {
        return await this.#client.get<Array<ISection>>(Constants.SECTIONS);
    };
    getSection = async (id: number) => {
        const response = await this.#client.get<Object, any>(
            `${Constants.SECTIONS}/${id}`
        );
        const model: Section = {
            ...response.data.section,
            topics: response.data.topics,
        };
        return model;
    };

    async createSection(sectionData: ISection | undefined) {
        return await this.#client.post<Object, any>(
            `${Constants.SECTIONS}`,
            sectionData
        );
    }
}

class Section implements ISection {
    bgColor: string;
    description: string;
    id: number;
    link: string;
    title: string;
    topics: IContent[];
    //TODO remove!!!
    section_id: number;

    constructor(
        bgColor: string,
        description: string,
        id: number,
        link: string,
        title: string,
        topics: IContent[],
        section_id: number
    ) {
        this.bgColor = bgColor;
        this.description = description;
        this.id = id;
        this.link = link;
        this.title = title;
        this.topics = topics;
        this.section_id = section_id;
    }
}
