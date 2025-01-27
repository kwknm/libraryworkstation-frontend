import { Col, Divider, Empty, Flex, Row, Select, Space, Spin, Statistic } from "antd"
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import BorrowingCard from "../Components/BorrowingCard";

const Borrowings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const readerId = searchParams.get("readerId");
    const borrowingTypeQuery = searchParams.get("type");

    const { data: readers, isLoading: isLoadingReaders } = useSWR("/api/readers")

    const params = new URLSearchParams();
    if (readerId) params.append('readerId', readerId);
    if (borrowingTypeQuery) params.append('type', borrowingTypeQuery);
    const queryString = params.toString();

    //const { data: borrowings, isLoading, mutate } = useSWR(readerId ? `/api/borrowings?readerId=${readerId}&type=${borrowingType}` : `/api/borrowings?type=${borrowingType}`)
    const { data: borrowings, isLoading, mutate } = useSWR(`/api/borrowings?${queryString}`)

    if (isLoading || isLoadingReaders) {
        return <Spin spinning size="large" />
    }

    return (
        <Spin tip="Loading" size="large" spinning={isLoading}>
            <Row gutter={16} justify={"center"}>
                <Col span={3}>
                    <Statistic title="Найдено выдач" value={borrowings?.length} />
                </Col>
                <Col span={4}>
                    <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        defaultValue={readerId}
                        options={readers.map(x => ({ label: `${x.firstName} ${x.patronymic ?? ""} ${x.lastName}`, value: x.id }))}
                        loading={isLoading || isLoadingReaders}
                        placeholder="Фильтр выдач по читателю"
                        onChange={(value) => {
                            if (!value) {
                                setSearchParams({});
                            } else {
                                setSearchParams({ "readerId": value });
                            }
                        }} />
                </Col>
                <Col span={3}>
                    <Space direction="vertical">
                        <p>Тип выдачи</p>
                        <Select
                            style={{ minWidth: 150 }}
                            defaultValue={searchParams.get("type") || "all"}
                            onSelect={value => { setSearchParams({ "type": value }); mutate() }}
                            options={[
                                {
                                    label: "Все",
                                    value: "all"
                                },
                                {
                                    label: "Открытые",
                                    value: "open"
                                },
                                {
                                    label: "Закрытые",
                                    value: "close"
                                },
                                {
                                    label: "Просроченные",
                                    value: "overdue"
                                },
                            ]} />
                    </Space>
                </Col>
            </Row>

            <Divider orientation="left" plain>
                Список выдач:
            </Divider>

            {
                !borrowings?.length && <Empty description="Не найдено" />
            }

            <Flex wrap gap="large">
                {borrowings && borrowings.map(b => (
                    <BorrowingCard key={b.id} reval={mutate} {...b} />
                ))}
            </Flex>
        </Spin>
    )
}

export default Borrowings;