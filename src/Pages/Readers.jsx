import { Button, Col, Divider, Empty, Flex, Input, Row, Spin, Statistic } from "antd"
import { useSearchParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react";
import useSWR from "swr";
import CreateReaderModal from "../Components/CreateReaderModal";
import ReaderCard from "../Components/ReaderCard";

const Readers = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search");

	const params = new URLSearchParams();
	if (search) params.append('search', search);
	const queryString = params.toString();

	const { data: readers, isLoading, isValidating, mutate } = useSWR("/api/readers?" + queryString)

	if (isLoading || isValidating) {
		return <Spin spinning size="large" />
	}

	return (
		<Spin tip="Loading" size="large" spinning={isLoading}>
			<CreateReaderModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} mutate={mutate} />
			<Row gutter={16} justify={"center"}>
				<Col span={3}>
					<Statistic title="Всего читателей" value={readers?.length} />
				</Col>
				<Col span={6}>
					<Input.Search
						allowClear
						loading={isLoading}
						defaultValue={search}
						placeholder="Поиск читателя"
						onSearch={(value, _e, _info) => {
							if (!value) {
								setSearchParams({});
							} else {
								setSearchParams({ "search": value });
							}
						}} />
				</Col>
				<Col span={3}>
					<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>Зарегистрировать читателя</Button>
				</Col>
			</Row>

			<Divider orientation="left" plain>
				Список читателей:
			</Divider>

			{
				!readers?.length && <Empty />
			}

			<Flex wrap gap="large">
				{readers && readers.map(r => (
					<ReaderCard key={r.id} reval={mutate} {...r} />
				))}
			</Flex>
		</Spin>
	)
}

export default Readers;