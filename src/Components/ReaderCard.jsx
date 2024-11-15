import { Button, Card, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { Axios } from "../Api/api"
import { useState } from "react";

const ReaderCard = ({ id, firstName, patronymic, lastName, phone, joinDate, reval }) => {
    const [borrowingCount, setBorrowingCount] = useState(0)
    if (id)
        Axios.get(`/api/readers/${id}/borrowings`).then(res => setBorrowingCount(res.data.length))

    const items = [
        {
            key: '1',
            label: 'ИД',
            children: id,
        },
        {
            key: '2',
            label: 'Телефон',
            children: phone,
        },
        {
            key: '3',
            label: 'Дата регистрации',
            children: new Date(joinDate).toLocaleDateString(),
        },
        {
            key: '3',
            label: 'Всего выдач',
            children: borrowingCount,
        }
    ];

    return (
        <Card style={{
            width: 500,
        }}
            actions={[
                <Link to={`/borrowings?readerId=${id}`}><Button type="primary">Список всех выдач</Button></Link>,
                <Link to={`/borrowings?readerId=${id}&type=overdue`}><Button type="dashed">Список задолженностей</Button></Link>,
            ]}
            title={`${firstName} ${patronymic ?? ""} ${lastName}`}
            >
            <Descriptions column={1} items={items} />
        </Card>
    )
}

export default ReaderCard;