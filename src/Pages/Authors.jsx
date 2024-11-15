import { Button, Col, Divider, Input, List, Row, Spin, Statistic } from "antd"
import { useSearchParams } from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons"
import { useState } from "react";
import CreateAuthorModal from "../Components/CreateAuthorModal";
import useSWR from "swr";

const Authors = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search");

	const { data, isLoading } = useSWR(search ? `/api/authors?search=${search}` : "/api/authors")

	if (isLoading) {
		return <Spin spinning size="large"/>
	}

    return (
        <Spin tip="Loading" size="large" spinning={isLoading}>
            <CreateAuthorModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
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
				style={{maxWidth: 600}}
                bordered
				dataSource={data}
				renderItem={a => (
					<List.Item>
						{a.firstName} {a.patronymic ?? ""} {a.lastName}
					</List.Item>
				)}
			/>
		</Spin>
    )
}

export default Authors;