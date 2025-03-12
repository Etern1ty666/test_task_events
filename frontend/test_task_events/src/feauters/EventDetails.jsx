import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Modal, TimePicker } from 'antd';
import { Popconfirm, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from "dayjs"
import { deleteEvent, updateEvent } from '../api/api';
import eventsStore from '../store/EventsStore';
import DemoPhoto from '../components/DemoPhoto';


const EventDetails = ({event, open, onFinish}) => {
    const [loading, setLoading] = useState(false);
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
    }, [event, form]); // Запускаем обновление, когда изменяется event
    
    async function removeEvent () {
        setLoading(true);
        deleteEvent(event.id).then(
            (response) => {
            console.log(response); // Success!
            eventsStore.delete(response)
            setLoading(false);
            onFinish();
            },
            (error) => {
            console.error(error); // Error!
            setLoading(false);
            onFinish();
            },
        );
    }

    async function handleOk () {
        try{
            setLoading(true);
            const values = await form.validateFields();
            updateEvent(event.id, {...values, date: values.date.format("DD.MM.YYYY"), time: values.time.format("HH:mm")}).then(
                (response) => {
                console.log(response); // Success!
                eventsStore.update(response)
                setLoading(false);
                onFinish();
                },
                (error) => {
                console.error(error); // Error!
                setLoading(false);
                onFinish();
                },
            );
        }catch(error){
            console.error(error)
            setLoading(false);
        }
    }

    const handleCancel = () => {
        onFinish();
    };

    return (
        <>
            <Modal
                open={open}
                title="Изменить детали мероприятия"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                <Button key="back" onClick={handleCancel}>
                    Назад
                </Button>,
                <Button type="primary" loading={loading} onClick={handleOk}>
                    Сохранить
                </Button>,
                ]}
            >
                <Form form={form} >
                    <Form.Item name="title"
                        rules={[
                            {
                            required: true,
                            message: 'Укажите название!',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="Название"
                            autoSize={{
                                minRows: 1,
                                maxRows: 4,
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="description"
                        rules={[
                            {
                            required: true,
                            message: 'Укажите описание!',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="Описание"
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="photo"
                        rules={[
                            {
                            required: true,
                            message: 'Укажите ссылку на фото!',
                            }
                        ]}
                    >
                        <Input
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            placeholder="Ссылка на фото"
                        />
                        
                    </Form.Item>
                    
                    <DemoPhoto photo={photoUrl} />

                    <Form.Item name="date"
                        rules={[
                            {
                            required: true,
                            message: 'Выберите дату!',
                            }
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item name="time"
                        rules={[
                            {
                            required: true,
                            message: 'Выберите время!',
                            }
                        ]}
                    >
                        <TimePicker format='HH:mm'/>
                    </Form.Item>

                </Form>

                <Popconfirm
                    title="Удалить мероприятие"
                    description="Удалить мероприятие? Это действие отменить нельзя"
                    onConfirm={removeEvent}
                    disabled={loading}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button loading={loading} color="danger" variant="solid">Удалить мероприятие</Button>
                </Popconfirm>

            </Modal>
        </>
    );
};
export default EventDetails;