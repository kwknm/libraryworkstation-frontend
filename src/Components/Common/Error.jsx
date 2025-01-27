import { Alert } from "antd";

const Error = ({ message }) => {
    return (
        <Alert type="error" message={message} banner />
    )
}

export default Error;