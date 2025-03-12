import React, { useEffect, useState } from 'react';
import { DatePicker, Modal, TimePicker } from 'antd';
import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from "dayjs"
import { updateEvent } from '../api/api';
import eventsStore from '../store/EventsStore';
import DemoPhoto from '../components/DemoPhoto';
import DeleteEvent from './DeleteEvent';
import { observer } from 'mobx-react-lite';


const EventSettings = ({event, open, onFinish}) => {
    const [photoUrl, setPhotoUrl] = useState(event?.photo);
    const [form] = Form.useForm(); // Используем useForm для контроля состояния формы

    useEffect(() => {
        if (event) {
            // Обновляем значения формы при изменении event
            form.setFieldsValue({
                title: event?.title,
                description: event?.description,
                photo: event?.photo,
                date: dayjs(event?.date, 'DD.MM.YYYY'),
                time: dayjs(event?.time, 'HH:mm'),
            });
            setPhotoUrl(event?.photo)
        }
    }, [event, form]);

    async function handleOk () {
        eventsStore.setLoading(true);
        const values = await form.validateFields();

        try{
            const response = await updateEvent(event.id, {...values, date: values.date.format("DD.MM.YYYY"), time: values.time.format("HH:mm")});
            eventsStore.update(response)
        }catch(error){
            console.error(error.message);
        }
        eventsStore.setLoading(false);
        onFinish();
    }

    const handleCancel = () => {
        onFinish();
    };

    return (
        <>
            <Modal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                title="Изменить детали мероприятия"
                okText='Сохранить'
                cancelText='Назад'
            >
                <Form form={form} >
                    <Form.Item
                        name="title"
                        rules={[{required: true, message: 'Укажите название!'}]}
                    >
                        <TextArea
                            placeholder="Название"
                            autoSize={{minRows: 1, maxRows: 4}}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[{required: true, message: 'Укажите описание!'}]}
                    >
                        <TextArea
                            placeholder="Описание"
                            autoSize={{minRows: 3, maxRows: 6}}
                        />
                    </Form.Item>

                    <Form.Item
                        name="photo"
                        rules={[{required: true, message: 'Укажите ссылку на фото!'}]}
                    >
                        <Input
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            placeholder="Ссылка на фото"
                        />
                        
                    </Form.Item>
                    
                    <DemoPhoto photo={photoUrl} />

                    <Form.Item
                        name="date"
                        rules={[{required: true, message: 'Выберите дату!'}]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item 
                        name="time"
                        rules={[{required: true, message: 'Выберите время!'}]}
                    >
                        <TimePicker format='HH:mm'/>
                    </Form.Item>

                </Form>

                <DeleteEvent eventId={event?.id} onFinish={onFinish} />

            </Modal>
        </>
    );
};
export default observer(EventSettings);