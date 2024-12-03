import { Button, Card, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSWR from "swr";

const ReaderCard = ({ id, firstName, patronymic, lastName, phone, joinDate }) => {
    const [borrowingCount, setBorrowingCount] = useState(0)

    const { data: borrowings } = useSWR(`/api/readers/${id}/borrowings`, null, { revalidateOnFocus: false, revalidateIfStale: true, revalidateOnReconnect: true })

    useEffect(() => {
        setBorrowingCount(borrowings?.length || 0);
    }, [borrowings])

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
        <Card 
            style={{
                width: 500,
            }}
            extra={[
                <Link to={`/readers/${id}`}>Подробнее</Link>
            ]}
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