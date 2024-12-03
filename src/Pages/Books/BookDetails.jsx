import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Descriptions, Flex, InputNumber, notification, Space, Spin, Typography } from 'antd';
import Error from '../../Components/Common/Error';
import useSWR from 'swr';
import { Axios } from '../../Api/api';


const BookDetails = () => {
    const [qtyValue, setQtyValue] = useState(1);
    const { id } = useParams();
    const { data, isLoading, error, mutate } = useSWR(`/api/books/${id}`);
    const [api, contextHolder] = notification.useNotification();

    if (isLoading) {
        return <Spin spinning size="large" />
    }

    if (error) {
        return <Error message={error.message} />
    }

    const items = [
        {
            key: '1',
            label: 'ИД',
            children: data.id,
            span: 3
        },
        {
            key: '2',
            label: 'Описание',
            children: data.description,
            span: 3
        },
        {
            key: '3',
            label: 'Доступно копий',
            children: data.availableCount,
            span: 1
        },
        {
            key: '4',
            label: 'Копий в аренде',
            children: data.borrowedBooks,
            span: 2
        },
        {
            key: '5',
            label: 'Автор',
            children: <Link to={`/books?authorId=${data.author.id}`}>{data.author.firstName} {data.author.lastName} {data.author?.patronymic || ""}</Link>,
        },
        {
            key: '6',
            label: 'Жанры',
            children: data.genres.join(", "),
            span: 2
        },
        {
            key: '7',
            label: 'ISBN',
            children: data.isbn,
        },
        {
            key: '8',
            label: 'Год публикации',
            children: data.yearPublished,
        },
    ]

    return (
        <>
        {contextHolder}
        <Flex justify='center' vertical>
            <Typography.Text>Сведения о книге</Typography.Text>
            <Descriptions
                extra={[
                    <Space direction='vertical'>
                        <InputNumber style={{ maxWidth: 160 }} addonAfter="шт." defaultValue={qtyValue} onChange={value => setQtyValue(value)} />
                        <Button type="primary" onClick={async () => {
                            try {
                                await Axios.post(`/api/books/${id}/replenish?qty=${qtyValue}`);
                                api.success({message: "Успех", description: `Наличие успешно пополнено на ${qtyValue}`, placement: "topLeft"})
                            } catch(e) {
                                api.error({message: "Ошибка", description: `Произошла неизвестная ошибка ${error}`, placement: "topLeft"})
                            }
                            mutate();
                        }}>Пополнить наличие</Button>
                    </Space>
                ]}
                title={<Typography.Title level={3}>{data.title}</Typography.Title>} bordered items={items} />
        </Flex>
        </>
    )
}

export default BookDetails