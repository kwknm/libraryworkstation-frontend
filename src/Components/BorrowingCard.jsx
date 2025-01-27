import { Button, Card, Descriptions } from "antd";
import {Axios} from "../Api/api";
import { Link } from "react-router-dom";

const BorrowingCard = ({ id, reader, book, borrowedDate, deadline, returnedDate, reval }) => {
    const items = [
        {
            key: '1',
            label: 'Читатель',
            children: <Link to={`/readers/${reader.id}`}>{reader.firstName} {reader.patronymic} {reader.lastName}</Link>,
        },
        {
            key: '2',
            label: 'Книга',
            children: <Link to={`/books/${book.id}`}>{book.title}</Link>,
        },
        {
            key: '3',
            label: 'Дата выдачи',
            children: new Date(borrowedDate).toLocaleDateString(),
        },
        {
            key: '4',
            label: 'Срок сдачи',
            children: new Date(deadline).toLocaleDateString(),
        },
        {
            key: '5',
            label: 'Дата возврата',
            children: !returnedDate ? "нет" : new Date(returnedDate).toLocaleDateString()
        },
    ];

    const returnBook = async (borrowingId) => {
        await Axios.post(`/api/borrowings/${borrowingId}/return`).then(res => res.data).catch(err => console.log(err))
    }

    return (
        <Card style={{
            width: 500,
        }}
            actions={[
                !returnedDate ? <Button onClick={async () => {await returnBook(id); reval()}} type="primary">Закрыть выдачу</Button> : <Button type="dashed" disabled>Выдача закрыта</Button>
            ]}
            title={`Информация о выдаче #${id.substring(0, 8)}`}
            extra={returnedDate && `закрыта спустя ${Math.abs(new Date(returnedDate) - new Date(borrowedDate)) / (1000 * 60 * 60 * 24)} дней`}>
            <Descriptions column={1} items={items} />
        </Card>
    )
}

export default BorrowingCard