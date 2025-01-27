import {Descriptions, Flex, Result, Spin, Timeline} from "antd";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Error from "../Components/Common/Error";
import {UserOutlined} from "@ant-design/icons";

const ReaderDetails = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useSWR(`/api/readers/${id}`);
    const { data: borrowings, isLoading: isLoadingBorrowings } = useSWR(`/api/readers/${id}/borrowings`);

    if (isLoading || isLoadingBorrowings) {
        return <Spin spinning size="large" />
    }

    if (error) {
        return <Error message={error.message} />
    }
    console.log(borrowings)

    const returnedBorrowings = []
    const openBorrowings = borrowings.map(x => {
        if (x.returnedDate) {
            returnedBorrowings.push(
                ({
                    label: x.returnedDate,
                    children: `Возврат книги "${x.book.title}"`,
                    color: "gray"
                }))
        }
        return ({
            label: x.borrowedDate,
            children: `Аренда книги "${x.book.title}"`,
        })
    })
    const overdueBorrowings = [];
    borrowings.map(x => {
        if (x.returnedDate == null && new Date(x.deadline) < Date.now()) {
            return overdueBorrowings.push({
                label: x.deadline,
                children: `Аренда просрочена "${x.book.title}"`,
                color: "red"
            })
        }
    })

    console.log(overdueBorrowings)

    const c = [...returnedBorrowings, ...openBorrowings, ...overdueBorrowings].sort((b, a) => new Date(b.label) - new Date(a.label))
        .map(x=> ({...x, label: new Date(x.label).toLocaleDateString()}))

    const items = [
        {
            key: '1',
            label: 'ИД',
            children: data.id,
        },
        {
            key: '2',
            label: 'ФИО',
            children: `${data.lastName} ${data.firstName} ${data.patronymic}`,
        },
        {
            key: '3',
            label: 'Телефон',
            children: data.phone,
        },
        {
            key: '8',
            label: 'Дата регистрации',
            children: new Date(data.joinDate).toLocaleDateString(),
        },
        {
            key: '9',
            label: 'Всего выдач',
            children: (<>
                {borrowings?.length} (<Link to={`/borrowings?readerId=${data.id}`}>Просмотреть</Link>)
            </>),
        },
        {
            key: '10',
            label: 'Таймлайн',
            children: <Timeline
                mode="left"
                items={[
                    {
                        label: new Date(data.joinDate).toLocaleDateString(),
                        children: `Регистрация читателя`,
                        color: "green"
                    }, ...c
                ]}
            />,
        },
    ]

    return (
        <Flex justify='center' vertical>
            <Result
                icon={<UserOutlined />}
                title={`${data.lastName} ${data.firstName} ${data.patronymic}`}
                subTitle={"Сведения о читателе"}/>
            <Descriptions
                layout="vertical"
                bordered items={items} />
        </Flex>
    )
}

export default ReaderDetails;