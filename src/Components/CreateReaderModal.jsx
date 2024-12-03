import { Form, Input, Modal, notification } from "antd"
import axios from "axios";

const CreateReaderModal = ({ isModalOpen, setIsModalOpen, mutate }) => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const handleOk = () => {
        axios.post("https://localhost:7035/api/readers", form.getFieldsValue())
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
            <Modal title="Регистрация читателя" open={isModalOpen} onOk={() => handleOk()} onCancel={() => setIsModalOpen(false)}>
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
                        <Input placeholder="Отчество" />
                    </Form.Item>
                    <Form.Item label="Телефон" name="phone">
                        <Input placeholder="+375 XX YYY-YY-YY" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateReaderModal;