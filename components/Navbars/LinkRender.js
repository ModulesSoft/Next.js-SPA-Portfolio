import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Link from "next/link";

LinkRender.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

LinkRender.defaultProps = {
    exact: false
};
function LinkRender({ href, exact, ...props }) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    return (
        <Link href={href}>
            <a className={`${props.text == "light" ? "lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 " : "hover:text-blueGray-500 text-blueGray-700 "}  px-3 py-4 lg:py-2`}>
                <i className={`${props.language == "english" ? "mr-2" : "ml-2"} ${props.icon} ${isActive?"text-teal-500":""}`} />
                <span className={isActive?"text-teal-500":""}>
                    {props.language == "english" ? props.enText : props.faText}
                </span>
            </a>
        </Link>
    )
}
export default LinkRender