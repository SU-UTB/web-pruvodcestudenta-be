import {ImgHTMLAttributes, SVGAttributes} from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src='/images/utb.png' {...props}  alt='logo'/>
    );
}
