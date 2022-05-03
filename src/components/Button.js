import "./Button.css"

const Button = ({children, className, onClick }) => {
    return (
        <>
            <button className={"button-1 " + className} onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default Button;