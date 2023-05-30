import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { Option } from 'antd/lib/mentions';

const AddUser = () => {
    const faculties = [
        {
            value: -1,
            label: 'ALL',
        },
        {
            value: 1,
            label: 'Khoa CNTT',
        },
        {
            value: 2,
            label: 'Khoa cơ khí',
        },
        {
            value: 3,
            label: 'Khoa QLDA',
        },
    ];

    const clazz = [
        {
            value: -1,
            facultyId: -1,
            label: 'ALL',
        },
        {
            value: 1,
            facultyId: 1,
            label: '19TCLC_Nhat2',
        },
        {
            value: 2,
            facultyId: 1,
            label: '19TCLC_Nhat1',
        },
        {
            value: 3,
            facultyId: 2,
            label: '19_CK1',
        },
        {
            value: 4,
            facultyId: 2,
            label: '19_CK2',
        },
    ];

    const [faculty, setFaculty] = useState();

    const handleChangeFaculty = (value) => {
        setFaculty(value);
    };

    const handleFinish = (userData) => {
        console.log(userData);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle initialValue={84}>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="84">+84</Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
            <Form
                onFinish={handleFinish}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="Select" name="faculty">
                    <Select
                        options={faculties}
                        showSearch
                        onChange={handleChangeFaculty}
                        optionFilterProp="children"
                        placeholder="Chọn khoa"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    ></Select>
                </Form.Item>
                <Form.Item label="Select" name={'clazz'}>
                    <Select
                        options={clazz.filter((c) => c.facultyId === faculty)}
                        showSearch
                        optionFilterProp="children"
                        placeholder="Chọn lớp"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    ></Select>
                </Form.Item>
                <Form.Item label="Tên đăng nhập" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="Mật khẩu" name={'password'}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="MSSV" name={'studentId'}>
                    <Input />
                </Form.Item>
                <Form.Item label="Tên" name="fullName">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                        {
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                {/*<Form.Item label="Upload" name='avt' valuePropName="fileList" getValueFromEvent={normFile}>*/}
                {/*    <Upload action="/upload.do" listType="picture-card">*/}
                {/*        <div>*/}
                {/*            <PlusOutlined />*/}
                {/*            <div style={{ marginTop: 8 }}>Upload</div>*/}
                {/*        </div>*/}
                {/*    </Upload>*/}
                {/*</Form.Item>*/}
                <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Lưu lại
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddUser;
