import ApplicationLogo from './components/ApplicationLogo';
import {NavbarBrand} from "flowbite-react/lib/esm/components/Navbar/NavbarBrand";
import {Link} from "react-router-dom";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <NavbarBrand href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </NavbarBrand>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
