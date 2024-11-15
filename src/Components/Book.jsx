import { Button, Card, Flex, Popconfirm, Statistic, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import BorrowingModal from "./BorrowingModal";
import { useState } from "react";
import axios from "axios"

const Book = ({ id, title, description, isbn, availableCount, yearPublished, genres, author, mutate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {setIsModalOpen(false)}

    return (
        <>
            <Card
                key={id}
                title={title}
                extra={<Link to={`/books/${id}`}>Подробнее</Link>}
                actions={[
                    <Button type="link" disabled={availableCount === 0} onClick={() => {
                        setIsModalOpen(true);
                    }}>Новая выдача</Button>,
                    <Popconfirm
                        title="Удалить книгу"
                        description="Вы уверены?"
                        onConfirm={async () => {
                            await axios.delete(`https://localhost:7035/api/books/${id}`);
                            mutate();
                        }}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button danger type="link">Удалить</Button>
                    </Popconfirm>,
                ]}>
                <Card.Meta
                    title={<Link to={`/authors/${author.id}`}>{author.firstName} {author.lastName} {author?.patronymic || ""}</Link>}
                    description={<Typography.Paragraph
                        ellipsis={{
                            rows: 1,
                            expandable: true,
                            symbol: "Больше",
                        }}
                    >
                        {description || "Нет описания."}
                    </Typography.Paragraph>} />
                <Flex wrap gap="16px" style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <Statistic title="ISBN" value={isbn} groupSeparator="" />
                    <Statistic title="В наличии" value={availableCount} suffix="шт." />
                    <Statistic title="Год публикации" value={yearPublished} groupSeparator="" />
                </Flex>
                <Flex gap="4px 0" wrap>
                    {genres.map(genre => (
                        <Tag color="geekblue" key={genre}>{genre}</Tag>
                    ))}
                </Flex>
            </Card>

            <BorrowingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bookTitle={title} bookId={id} closeModal={closeModal} mutate={mutate} />
        </>
    )
}

export default Book;