import { Card, Col, DatePicker, Input, InputNumber, Row, Select } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import styled from 'styled-components';
import { DATE_FORMAT } from '../../utils/date';

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
    }
`;

const AddActivity = () => {
    const [formData, setFormData] = useState({
        category: '',
        score: 0,
        activityName: '',
        maxQuantity: 0,
        startDate: '',
        endDate: '',
        location: '',
        content: '<p></p>',
    });
    console.log('🚀 ~ file: AddActivity.js:30 ~ AddActivity ~ formData:', formData);

    const handleChangeData = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeDate = (name, value) => {
        setFormData({ ...formData, [name]: value.format(DATE_FORMAT) });
    };

    const options = [
        {
            value: 'jack',
            label: 'Jack',
        },
        {
            value: 'lucy',
            label: 'Lucy',
        },
    ];
    const elements = [
        {
            label: 'Chọn danh mục',
            component: (
                <Select
                    className="select-item"
                    defaultValue="lucy"
                    onChange={(e) => handleChangeData('category', e)}
                    options={options}
                />
            ),
        },
        {
            label: 'Số điểm',
            component: (
                <InputNumber
                    min={0}
                    max={10}
                    defaultValue={0}
                    value={formData.score}
                    onChange={(value) => handleChangeData('score', value)}
                />
            ),
        },
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
            label: 'Số lượng tối đa',
            component: (
                <InputNumber
                    min={0}
                    defaultValue={0}
                    value={formData.maxQuantity}
                    onChange={(value) => handleChangeData('maxQuantity', value)}
                />
            ),
        },
        {
            label: 'Thời gian bắt đầu',
            component: (
                <DatePicker
                    className="date-item"
                    value={formData.startDate}
                    onChange={(value) => handleChangeDate('startDate', value)}
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
            label: 'Thời gian kết thúc',
            component: (
                <DatePicker
                    className="date-item"
                    value={formData.endDate}
                    onChange={(value) => handleChangeDate('endDate', value)}
                />
            ),
            className: 'date-item',
        },
    ];

    return (
        <FormContainerStyle>
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
                    <CKEditor
                        editor={ClassicEditor}
                        data={formData.content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            handleChangeData('content', data);
                        }}
                    />
                </Card>
            </Card>
        </FormContainerStyle>
    );
};

export default AddActivity;
