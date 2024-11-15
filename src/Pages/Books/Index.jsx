import { Button, Col, Divider, Input, List, Row, Spin, Statistic } from "antd";
import { useSearchParams } from "react-router-dom";
import Book from "../../Components/Book";
import {PlusOutlined} from "@ant-design/icons"
import { useState } from "react";
import CreateBookModal from "../../Components/CreateBookModal";
import useSWR from "swr";

const { Search } = Input;

const Index = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search");

	const { data, isLoading, mutate } = useSWR(search ? `/api/books?search=${search}` : "/api/books")

	if (isLoading) {
		return <Spin spinning size="large"/>
	}

	return (
		<Spin tip="Loading" size="large" spinning={isLoading}>
			<CreateBookModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} mutate={mutate}/>
			<Row gutter={16} justify={"center"}>
				<Col span={3}>
					<Statistic title="Всего книг" value={data?.length} />
				</Col>
				<Col span={6}>
					<Search
						allowClear
						loading={isLoading}
						defaultValue={search}
						placeholder="Поиск книг по названию"
						onSearch={async (value, _e, _info) => {
							if (!value) {
								setSearchParams({});
							} else {
								setSearchParams({ "search": value });
							}
						}} />
				</Col>
				<Col span={3}>
					<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>Добавить книгу</Button>
				</Col>
			</Row>

			<Divider orientation="left" plain>
				Список книг:
			</Divider>
		
			<List
				grid={{ gutter: 16, column: 3 }}
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