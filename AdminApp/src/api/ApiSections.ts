import {AxiosInstance} from "axios";

import {Constants} from "../tools/Constants";
import {ITopic} from "../lib/interfaces/ITopic";
import {ISection} from "../lib/interfaces/ISection";

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
    bg_color: string;
    description: string;
    id: number;
    link: string;
    title: string;
    topics: ITopic[];
    //TODO remove!!!
    section_id: number;
    location_id: number;
    url: string;

    constructor(
        bg_color: string,
        description: string,
        id: number,
        link: string,
        url: string,
        title: string,
        topics: ITopic[],
        section_id: number,
        location_id: number
    ) {
        this.bg_color = bg_color;
        this.description = description;
        this.id = id;
        this.link = link;
        this.url = url;
        this.title = title;
        this.topics = topics;
        this.section_id = section_id;
        this.location_id = location_id;
    }
}
