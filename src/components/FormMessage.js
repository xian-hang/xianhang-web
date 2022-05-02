const FormMessage = ({ message, succ = false }) => {
    if (message) {
        if (succ) {
            return (
                <>
                    <div className="form-succ">
                        {message}
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="form-err">
                        {message}
                    </div>
                </>
            )
        }
    }
}

export default FormMessage