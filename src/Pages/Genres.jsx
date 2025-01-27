import { Button, Col, Divider, Input, List, Popconfirm, Row, Spin, Statistic } from "antd"
import { useSearchParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react";
import useSWR from "swr";
import CreateGenreModal from "../Components/CreateGenreModal";
import { Axios } from "../Api/api";

const Genres = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search");

	const { data, isLoading, mutate } = useSWR(search ? `/api/genres?search=${search}` : "/api/genres")

	if (isLoading) {
		return <Spin spinning size="large" />
	}

	return (
		<Spin tip="Loading" size="large" spinning={isLoading}>
			<CreateGenreModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} mutate={mutate} />
			<Row gutter={16} justify={"center"}>
				<Col span={3}>
					<Statistic title="Всего жанров" value={data?.length} />
				</Col>
				<Col span={6}>
					<Input.Search
						allowClear
						loading={isLoading}
						defaultValue={search}
						placeholder="Поиск жанра"
						onSearch={(value, _e, _info) => {
							if (!value) {
								setSearchParams({});
							} else {
								setSearchParams({ "search": value });
							}
						}} />
				</Col>
				<Col span={3}>
					<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>Добавить жанр</Button>
				</Col>
			</Row>

			<Divider orientation="left" plain>
				Список жанров:
			</Divider>

			<List
				style={{ maxWidth: 400 }}
				bordered
				dataSource={data}
				renderItem={g => (
					<List.Item
						actions={[
							<Popconfirm
								title="Удалить жанр"
								description="Вы уверены?"
								onConfirm={async () => {
									await Axios.delete(`/api/genres/${g.id}`);
									mutate();
								}}
								okText="Да"
								cancelText="Нет">
								<Button danger type="link">Удалить</Button>
							</Popconfirm>
						]}>
						{g.name}
					</List.Item>
				)}
			/>
		</Spin>
	)
}

export default Genres;