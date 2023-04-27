import isDev from "./DevDetect";

export class Constants {
    static API_BASE_URL: string = "https://rezervacesutb.wz.cz/api/admin";
    static API_TEST_URL: string = "http://localhost/api/admin";
    static API_URL = isDev() ? Constants.API_TEST_URL : Constants.API_BASE_URL;
    static SECTIONS: string = "sections";
    static TOPICS: string = "topics";
    static PAGES_LANDING: string = "pages/landing";
}
