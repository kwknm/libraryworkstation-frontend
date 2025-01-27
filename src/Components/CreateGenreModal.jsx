import { Form, Input, Modal, notification } from "antd"
import axios from "axios";

const CreateGenreModal = ({ isModalOpen, setIsModalOpen, mutate }) => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const handleOk = () => {
        axios.post("https://localhost:7035/api/genres", form.getFieldsValue())
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
            <Modal title="Добавление жанра" open={isModalOpen} onOk={() => handleOk()} onCancel={() => setIsModalOpen(false)}>
                <Form
                    layout="vertical"
                    form={form}>
                    <Form.Item label="Название" name="name">
                        <Input placeholder="Название" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateGenreModal;