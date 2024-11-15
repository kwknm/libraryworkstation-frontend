import { Result, Typography } from "antd";
import {SmileOutlined} from "@ant-design/icons"

const Home = () => {
    return (
        <Result
            icon={<SmileOutlined />}
            title="Система управления библиотекой"
            extra={
                <Typography.Title level={3}>Для начала работы выберите один из разделов в меню</Typography.Title>
            }
        />
    )
}

export default Home;