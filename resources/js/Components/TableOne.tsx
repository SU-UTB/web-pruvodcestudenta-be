import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

const TableOne = (sections: any) => {
    //TODO types
    return (
        <div
            className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Title
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Description
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Color
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Slug
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Updated At
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Actions
                        </h5>
                    </div>
                </div>
            </div>
            {
                sections.sections.map((section: any, index: number) => {
                    return <div key={index.toString()}
                                className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6">
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <TextInput value={section.title} onChange={() => {
                            }}/>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <TextInput value={section.description} onChange={() => {
                            }}/>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <TextInput value={section.color} onChange={() => {
                            }}/>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black">{section.slug}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black">{section.updated_at}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <div className="d-flex flex-column gap-2">
                                <PrimaryButton className="mb-2"
                                >Save
                                </PrimaryButton>
                                <br/>
                                <PrimaryButton>
                                    <a href="{{ route('deleteSection', $section['id']) }}">Delete</a></PrimaryButton>
                            </div>
                        </div>
                    </div>

                })
            }


        </div>
    )
        ;
};

export default TableOne;
