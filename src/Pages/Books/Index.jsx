import {Button, Col, Divider, Input, List, Row, Select, Space, Spin, Statistic} from "antd";
import {useSearchParams} from "react-router-dom";
import Book from "../../Components/Book";
import {PlusOutlined} from "@ant-design/icons"
import {useState} from "react";
import CreateBookModal from "../../Components/CreateBookModal";
import useSWR from "swr";

const {Search} = Input;

const Index = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search");
    const authorId = searchParams.get("authorId")
    const genreId = searchParams.get("genreId")

    const {data: authors, isLoadingAuthors} = useSWR("/api/authors")
    const {data: genres, isLoadingGenres} = useSWR("/api/genres")

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (authorId) params.append('authorId', authorId);
    if (genreId) params.append('genreid', genreId);
    const queryString = params.toString();

    const {
        data,
        isLoading,
        isValidating,
        mutate
    } = useSWR(`/api/books?${queryString}`, null, {revalidateOnFocus: false})

    if (isLoading || isValidating || isLoadingAuthors || isLoadingGenres) {
        return <Spin spinning size="large"/>
    }

    return (
        <Spin tip="Loading" size="large" spinning={isLoading}>
            <CreateBookModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} mutate={mutate}/>
            <Row gutter={16} justify={"center"}>
                <Col span={3}>
                    <Statistic title="Всего книг" value={data?.length}/>
                </Col>
                <Col span={6}>
                    <Space direction="vertical">
                        <Search
                            allowClear
                            loading={isLoading}
                            defaultValue={search}
                            placeholder="Поиск книг по названию"
                            style={{width: 300}}
                            onSearch={async (value, _e, _info) => {
                                if (!value) {
                                    searchParams.delete("search")
                                } else {
                                    searchParams.set("search", value)
                                }
                                setSearchParams(searchParams)
                            }}/>
                        <Select
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            style={{width: 300}}
                            placeholder="Фильтр по автору"
                            defaultValue={searchParams.get("authorId")}
                            onSelect={value => {
                                searchParams.set("authorId", value);
                                setSearchParams(searchParams);
                                mutate()
                            }}
                            onClear={() => {
                                searchParams.delete("authorId");
                                setSearchParams(searchParams);
                            }}
                            options={authors?.map((x) => ({
                                label: `${x.firstName} ${x.patronymic ?? ""} ${x.lastName}`,
                                value: x.id
                            }))}/>
                        <Select
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            style={{width: 300}}
                            placeholder="Фильтр по жанру"
                            defaultValue={searchParams.get("genreId")}
                            onSelect={async value => {
                                searchParams.set("genreId", value);
                                setSearchParams(searchParams);
                                await mutate()
                            }}
                            onClear={() => {
                                searchParams.delete("genreId");
                                setSearchParams(searchParams);
                            }}
                            options={genres?.map((x) => ({label: x.name, value: x.id}))}/>
                    </Space>
                </Col>
                <Col span={3}>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={() => setIsModalOpen(true)}>Добавить
                        книгу</Button>
                </Col>
            </Row>

            <Divider orientation="left" plain>
                Список книг:
            </Divider>

            <List
                grid={{gutter: 16, column: 3}}
                dataSource={data}
                renderItem={b => (
                    <List.Item>
                        <Book
                            author={b.author}
                            id={b.id}
                            description={b.description}
                            availableCount={b.availableCount}
                            genres={b.genres}
                            isbn={b.isbn}
                            title={b.title}
                            yearPublished={b.yearPublished}
                            mutate={mutate}
                        />
                    </List.Item>
                )}
            />
        </Spin>
    )
}

export default Index;