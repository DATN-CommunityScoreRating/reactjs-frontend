import { Button, Card, Col, DatePicker, Input, InputNumber, message, Row, Space } from 'antd';
import styled from 'styled-components';

import { DATE_FORMAT } from '../../utils/date';
import dayjs from 'dayjs';
import { addActivity } from '../../services/activityService';
import { useState } from 'react';
import SITE_MAP from '../../constants/path';
import { useHistory } from 'react-router-dom';
import Editor from '../../components/Editor';

const FormContainerStyle = styled.div`
    .row-item {
        width: 100%;
        padding: 5px;
        display: inline-flex;
        .date-item,
        .select-item,
        .ant-input-number {
            height: 40px;
            width: 100%;
            .ant-select-selector {
                height: 100%;
                align-items: center;
            }
        }
        @media screen and (min-width: 767px) {
            width: 50% !important;
        }
    }
    .card-content {
        text-align: center;
        margin-top: 10px;
        .ant-card-body {
            padding: 10px;
            .ck .ck-content {
                min-height: 300px;
            }
        }
        .content-editor {
            text-align: left;
        }
    }
    .button-action {
        width: 100%;
        display: flex;
        margin: 20px 0;
        justify-content: center;
    }
`;

const AddActivity = () => {
    const [formData, setFormData] = useState({
        score: 5,
        activityName: '',
        maxQuantity: 1,
        startRegister: '',
        endRegister: '',
        startDate: '',
        endDate: '',
        location: '',
    });

    const [description, setDescription] = useState('');

    const history = useHistory();

    const [messageApi, contextHolder] = message.useMessage();

    const handleChangeData = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeDate = (name, value) => {
        if (value === null) {
            value = dayjs();
        }
        setFormData({ ...formData, [name]: value.format(DATE_FORMAT) });
    };

    const handleAddActivity = () => {
        addActivity({
            ...formData,
            description,
        }).then((res) => {
            if (res?.success) {
                messageApi
                    .open({
                        type: 'success',
                        content: 'Thêm hoạt động thành công',
                        duration: 1,
                    })
                    .then((r) => {
                        history.push(SITE_MAP.MANAGER_ACTIVITY.LIST);
                    });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Có lỗi xảy ra',
                });
            }
        });
    };

    const handleCancel = () => {};

    const elements = [
        {
            label: 'Tên hoạt động',
            component: (
                <Input
                    value={formData.activityName}
                    onChange={(e) => handleChangeData('activityName', e.target.value)}
                />
            ),
        },
        {
            label: 'Số điểm',
            component: (
                <InputNumber
                    min={5}
                    max={30}
                    defaultValue={5}
                    value={formData.score}
                    onChange={(value) => handleChangeData('score', value)}
                />
            ),
        },
        {
            label: 'Thời gian bắt đầu',
            component: (
                <DatePicker
                    className="date-item"
                    value={formData.startDate === '' ? '' : dayjs(formData.startDate, DATE_FORMAT)}
                    onChange={(value) => handleChangeDate('startDate', value)}
                />
            ),
            className: 'date-item',
        },
        {
            label: 'Thời gian bắt đầu đăng ký',
            component: (
                <DatePicker
                    className="date-item"
                    value={
                        formData.startRegister === ''
                            ? ''
                            : dayjs(formData.startRegister, DATE_FORMAT)
                    }
                    onChange={(value) => handleChangeDate('startRegister', value)}
                />
            ),
            className: 'date-item',
        },
        {
            label: 'Thời gian kết thúc',
            component: (
                <DatePicker
                    className="date-item"
                    value={formData.endDate === '' ? '' : dayjs(formData.endDate, DATE_FORMAT)}
                    onChange={(value) => handleChangeDate('endDate', value)}
                />
            ),
            className: 'date-item',
        },
        {
            label: 'Thời gian kết thúc đăng ký',
            component: (
                <DatePicker
                    className="date-item"
                    value={
                        formData.endRegister === '' ? '' : dayjs(formData.endRegister, DATE_FORMAT)
                    }
                    onChange={(value) => handleChangeDate('endRegister', value)}
                />
            ),
            className: 'date-item',
        },
        {
            label: 'Địa điểm',
            component: (
                <Input
                    value={formData.location}
                    onChange={(e) => handleChangeData('location', e.target.value)}
                />
            ),
        },
        {
            label: 'Số lượng tối đa',
            component: (
                <InputNumber
                    min={1}
                    max={10000}
                    defaultValue={1}
                    value={formData.maxQuantity}
                    onChange={(value) => handleChangeData('maxQuantity', value)}
                />
            ),
        },
    ];

    return (
        <FormContainerStyle>
            {contextHolder}
            <Card className="mb-24" title="Thêm hoạt động cộng đồng">
                {elements.map(({ label, component }, index) => (
                    <Row
                        className="row-item"
                        key={index}
                        gutter={[
                            { xs: 0, sm: 0, md: 28 },
                            { xs: 8, sm: 8, md: 0 },
                        ]}
                    >
                        <Col span={8}>{label}</Col>
                        <Col span={16}>{component}</Col>
                    </Row>
                ))}
                <Card className="card-content" title="Nội dung hoạt động">
                    <div className={'content-editor'}>
                        <Editor onChange={setDescription} />
                    </div>
                </Card>
                <Space className="button-action">
                    <Button type={'primary'} onClick={handleAddActivity}>
                        Lưu lại
                    </Button>
                    <Button type={'default'} onClick={handleCancel}>
                        Cancel
                    </Button>
                </Space>
            </Card>
        </FormContainerStyle>
    );
};

export default AddActivity;
