import React from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Flex, Spin, Typography } from 'antd';
import Error from '../../Components/Common/Error';


const BookDetails = () => {
    const { id } = useParams();

    const { isPending, isError, data, error } = useQuery({
        refetchOnReconnect: false,
        queryKey: ["bookDetail"],
        queryFn: () => axios.get(`https://localhost:7035/api/books/${id}`)
            .then(res => res.data)
    })

    if (isPending) {
        return <Spin spinning size="large" />
    }

    if (isError) {
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
            key: '8',
            label: 'Копий в аренде',
            children: data.borrowedBooks,
            span: 2
        },
        {
            key: '4',
            label: 'Автор',
            children: <Link to={`/authors/${data.author.id}`}>{data.author.firstName} {data.author.lastName} {data.author?.patronymic || ""}</Link>,
        },
        {
            key: '5',
            label: 'Жанры',
            children: data.genres.join(", "),
            span: 2
        },
        {
            key: '6',
            label: 'ISBN',
            children: data.isbn,
        },
        {
            key: '7',
            label: 'Год публикации',
            children: data.yearPublished,
        },
        
    ]

    return (
        <Flex justify='center' vertical>
            <Typography.Text>Сведения о книге</Typography.Text>
            <Descriptions title={<Typography.Title level={3}>{data.title}</Typography.Title>} bordered items={items} />
        </Flex>
    )
}

export default BookDetails