import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Result
            status="warning"
            title="404"
            subTitle="Похоже, эта страница не существует."
            extra={<Link to="/" replace><Button type="primary">На главную</Button></Link>} />
    )
}

export default NotFound;