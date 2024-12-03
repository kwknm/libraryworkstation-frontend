import { DatePicker, Form, Modal, Select, Typography, notification } from "antd";
import { UserOutlined } from '@ant-design/icons';
import useSWR from "swr";
import { Axios } from "../Api/api";

const BorrowingModal = ({ isModalOpen, setIsModalOpen, bookTitle, bookId, closeModal, mutate }) => {
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const readerId = Form.useWatch('readerId', form);
    const deadline = Form.useWatch('deadline', form);

    const { data : readers } = useSWR("/api/readers", (url) => Axios(url).then(res => res.data.map((x) => ({label: `${x.firstName} ${x.patronymic ?? ""} ${x.lastName}`, value: x.id}))))

    const handleSumbit = async () => {
        try {
            const { data } = await Axios.post("/api/borrowings", {
                readerId,
                deadline: deadline?.format("DD-MM-YYYY"),
                bookId
            })
            mutate();
            api.success({
                message: "Успех",
                description: `Книга зачислена в аренду читателю ${data.reader.lastName} ${data.reader.patronymic ?? ""} ${data.reader.firstName} `
            })
            closeModal();
        } catch (err) {
            api.error({
                message: "Произошла ошибка",
                description: err.response.data?.message || `Неизвестная ошибка (${err})`
            })
        }
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Новая аренда книги"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSumbit}>

                <Form form={form} layout="vertical" autoComplete="off">
                    <Form.Item name="bookTitle" label="Книга">
                        <Typography.Title level={4}>{bookTitle}</Typography.Title>
                    </Form.Item>
                    <Form.Item name="readerId" label="Читатель">
                        <Select allowClear showSearch options={readers} suffixIcon={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name="deadline" label="Крайний срок сдачи">
                        <DatePicker
                            format="DD-MM-YYYY" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default BorrowingModal;