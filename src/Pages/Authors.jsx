import { Button, Col, Divider, Input, List, Popconfirm, Row, Spin, Statistic } from "antd"
import { Link, useSearchParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react";
import CreateAuthorModal from "../Components/CreateAuthorModal";
import useSWR from "swr";
import { Axios } from "../Api/api";

const Authors = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search");

	const { data, isLoading, mutate } = useSWR(search ? `/api/authors?search=${search}` : "/api/authors")

	if (isLoading) {
		return <Spin spinning size="large" />
	}

	return (
		<Spin tip="Loading" size="large" spinning={isLoading}>
			<CreateAuthorModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} mutate={mutate} />
			<Row gutter={16} justify={"center"}>
				<Col span={3}>
					<Statistic title="Всего авторов" value={data?.length} />
				</Col>
				<Col span={6}>
					<Input.Search
						allowClear
						loading={isLoading}
						defaultValue={search}
						placeholder="Поиск автора"
						onSearch={(value, _e, _info) => {
							if (!value) {
								setSearchParams({});
							} else {
								setSearchParams({ "search": value });
							}
						}} />
				</Col>
				<Col span={3}>
					<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>Добавить автора</Button>
				</Col>
			</Row>

			<Divider orientation="left" plain>
				Список авторов:
			</Divider>

			<List
				style={{ maxWidth: 500 }}
				bordered
				dataSource={data}
				renderItem={a => (
					<List.Item
						actions={[
							<Popconfirm
								title="Удалить автора"
								description="Вы уверены?"
								onConfirm={async () => {
									await Axios.delete(`/api/authors/${a.id}`);
									mutate();
								}}
								okText="Да"
								cancelText="Нет">
								<Button danger type="link">Удалить</Button>
							</Popconfirm>
						]}>
						<Link to={`/books?authorId=${a.id}`}>{a.firstName + " " + (a.patronymic ?? "") + " " + a.lastName}</Link>
					</List.Item>
				)}
			/>
		</Spin>
	)
}

export default Authors;