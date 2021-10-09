const LinkRender = (props) => {
    return (
        <>
            <i className={`lg:text-blueGray-200 text-blueGray-400 text-lg leading-lg ${props.language == "english" ? "mr-2" : "ml-2"} ${props.icon}`} />
            {props.language == "english" ? props.enText : props.faText}
        </>
    )
}
export default LinkRender