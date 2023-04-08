import mainLogo from '../../../public/logo.png';

export default function ApplicationLogo(props) {
    return (
        <div className='w-10'>
            <img src={mainLogo} alt="logo"/>
        </div>
    );
}
