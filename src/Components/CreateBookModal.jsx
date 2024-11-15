import { Form, Input, InputNumber, Modal, Select, notification } from "antd"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CreateBookModal = ({ isModalOpen, setIsModalOpen, mutate }) => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const { data: genres } = useQuery({
        refetchOnReconnect: false,
        queryKey: ["genres"],
        queryFn: () => axios.get("https://localhost:7035/api/genres").then(res => res.data.map((x) => ({ label: x.name, value: x.id }))),
    })

    const { data: authors } = useQuery({
        refetchOnReconnect: false,
        queryKey: ["authors"],
        queryFn: () => axios.get("https://localhost:7035/api/authors").then(res => {
            return res.data.map((x) => ({ label: `${x.firstName} ${x.patronymic ?? ""} ${x.lastName}`, value: x.id }))
        }
        ),
    })

    const handleOk = () => {
        axios.post("https://localhost:7035/api/books", form.getFieldsValue())
            .then(res => { console.log(res.data); mutate() })
            .catch(error => api.error({
                message: "Произошла ошибка",
                description: error.response.data?.message || `Проверьте правильность введенных данных`
            }))
        setIsModalOpen(false)
    }

    return (
        <>
            {contextHolder}
            <Modal title="Добавление новой книги" open={isModalOpen} onOk={() => handleOk()} onCancel={() => setIsModalOpen(false)}>
                <Form
                    layout="vertical"
                    form={form}>
                    <Form.Item label="Название" name="title">
                        <Input placeholder="Название книги" />
                    </Form.Item>
                    <Form.Item label="Автор" name="authorId">
                        <Select placeholder="Выберите автора" options={authors} />
                    </Form.Item>
                    <Form.Item label="Краткое описание" name="description">
                        <Input placeholder="Описание" />
                    </Form.Item>
                    <Form.Item label="Количество доступных копий" name="availableCount">
                        <InputNumber min={0} placeholder="Копии" />
                    </Form.Item>
                    <Form.Item label="Год публикации" name="yearPublished">
                        <InputNumber placeholder="Год" controls={false} />
                    </Form.Item>
                    <Form.Item label="Жанры" name="genres">
                        <Select mode="multiple" allowClear placeholder="Выберите жанры" options={genres} />
                    </Form.Item>
                    <Form.Item label="ISBN" name="isbn">
                        <Input placeholder="ISBN" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateBookModal;