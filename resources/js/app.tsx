import "./bootstrap";
import "../css/app.css";

import {createRoot} from "react-dom/client";
import {createInertiaApp} from "@inertiajs/react";
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import {PrimeReactProvider} from "primereact/api";
import {Flowbite} from "flowbite-react";

const appName = import.meta.env.VITE_APP_NAME || "PruvodceStudenta UTB | Admin";

const customTheme = {
    button: {
        color: {
            primary: "bg-[#E37222] hover:bg-[#E65014] text-white",
        },
    },
    sidebar: {
        item: {
            base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-orange-100 dark:text-white dark:hover:bg-gray-700",
            icon: {
                "base": "h-4 w-4 flex-shrink-0 text-[#E37222] transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                "active": "text-[#E37222] dark:text-gray-100"
            },
            active: "bg-gray-200 dark:bg-gray-700",

        },
        collapse: {
            button: "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-orange-100 dark:text-white dark:hover:bg-gray-700",

            icon: {
                base: "h-4 w-4 text-[#E37222] transition duration-75 group-hover:text-[#E37222] dark:text-gray-400 dark:group-hover:text-white",

            },

        },

    },
};


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(
            <PrimeReactProvider>
                <Flowbite theme={{theme: customTheme}}>
                    <App {...props} />
                </Flowbite>
            </PrimeReactProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
