
import "./Dialog.css"
import Button from "./Button";

const Dialog = ({ children, show, setShow, confirm }) => {
    const clickConfirm = async (e) => {
        e.preventDefault() 

        confirm()
        setShow(false)
    }

    const clickCancel = async (e) => {
        e.preventDefault() 

        setShow(false)
    }

    if (show) {
        return (
            <>
                <div className="grey-screen"></div>
                <div className="dialog-container">
                    <form className="dialog-box" onSubmit={(e) => clickConfirm(e)}>
                        <div className="dialog-content-div">
                            {children}
                        </div>
                        <div className="dialog-button-div">
                            <div className="dialog-button-whitespace">

                            </div>
                            <div className="dialog-button-container">
                                <Button className="dialog-button button-confirm" onSubmit={(e) => clickConfirm(e)}>
                                    Confirm
                                </Button>
                            </div>
                            <div className="dialog-button-container">
                                <Button className="dialog-button button-cancel" onClick={(e) => clickCancel(e)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }

}

export default Dialog;