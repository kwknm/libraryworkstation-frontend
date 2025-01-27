import { AppstoreAddOutlined, BookOutlined, EditOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const menuItems = [
    {
        key: "books",
        icon: <BookOutlined />,
        label: <Link to="/books">Книги</Link>,
    },
    {
        key: "authors",
        icon: <TeamOutlined />,
        label: <Link to="/authors">Авторы</Link>,
    },
    {
        key: "genres",
        icon: <AppstoreAddOutlined />,
        label: <Link to="/genres">Жанры</Link>
    },
    {
        key: "readers",
        icon: <UserOutlined />,
        label: <Link to="/readers">Читатели</Link>,
    },
    {
        key: "borrowings",
        icon: <EditOutlined />,
        label: <Link to="/borrowings">Аренда книг</Link>,
    },
]

const Navigation = () => {
    return (
        <Menu
            selectable={false}
            mode="horizontal"
            style={{
                height: '100%',
                justifyContent: 'center',
            }}
            items={menuItems} />
    )
}

export default Navigation;