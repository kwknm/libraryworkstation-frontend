import { Form, Input, Modal, notification } from "antd"
import axios from "axios";

const CreateAuthorModal = ({ isModalOpen, setIsModalOpen, mutate }) => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const handleOk = () => {
        axios.post("https://localhost:7035/api/authors", form.getFieldsValue())
            .then(res => { mutate() })
            .catch(error => api.error({
                message: "Произошла ошибка",
                description: error.response.data?.message || `Проверьте правильность введенных данных`
            }))
        setIsModalOpen(false)
    }

    return (
        <>
            {contextHolder}
            <Modal title="Добавление автора" open={isModalOpen} onOk={() => handleOk()} onCancel={() => setIsModalOpen(false)}>
                <Form
                    layout="vertical"
                    form={form}>
                    <Form.Item label="Фамилия" name="lastName">
                        <Input placeholder="Фамилия" />
                    </Form.Item>
                    <Form.Item label="Имя" name="firstName">
                        <Input placeholder="Имя" />
                    </Form.Item>
                    <Form.Item label="Отчество" name="patronymic">
                        <Input placeholder="Отчество (если есть)" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateAuthorModal;