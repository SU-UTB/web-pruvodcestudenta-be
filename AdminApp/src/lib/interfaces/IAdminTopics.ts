import {ITopic} from "./ITopic";
import {ISection} from "./ISection";
import {ILocation} from "./ILocation";

export interface IAdminTopics {
    topics: Array<ITopic>
    sections: Array<ISection>
    locations: Array<ILocation>
}
