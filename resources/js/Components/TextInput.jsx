import {forwardRef, useEffect, useRef} from 'react';

export default forwardRef(function TextInput({
                                                 type = 'text',
                                                 className = '',
                                                 isFocused = false,
                                                 isDisabled = false,
                                                 ...props
                                             }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input disabled={isDisabled}
                   {...props}
                   type={type}
                   className={
                       isDisabled ?
                           'border-gray-300 bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm '
                           :'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                       className
                   }
                   ref={input}
            />
        </div>
    );
});
