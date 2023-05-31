import {ITopic} from "./ITopic";

export interface ISection extends ITopic {
    topics: ITopic[]
}
