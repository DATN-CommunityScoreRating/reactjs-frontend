import { Layout, Menu, Button, Row, Col, notification, Typography, Form, Input } from 'antd';
import community from '../assets/images/logo-community.png';
import community_login from '../assets/images/logo-custom.png';
import { login } from '../services/loginService';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {ifAnyGranted, Roles} from "../container/authorize/Authorization";
import SITE_MAP from "../constants/path";
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignIn = () => {
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [form] = Form.useForm();
    const history = useHistory();

    const handleChange = (field, value) => {
        setUserData({ ...userData, field: value });
    };
    const onFinish = (values) => {
        console.log(values)
        login(values).then(res => {
            console.log(res)
            if (res?.success) {
                notification.success({
                    placement: 'topRight',
                    message: 'Đăng nhập thành công',
                    description: 'Chào mừng bạn đến với hệ thống đánh giá điểm cộng đồng',
                });
                if (ifAnyGranted([Roles.ADMIN, Roles.UNION, Roles.FACULTY])){
                    history.push(SITE_MAP.MANAGER_CLASS.LIST);
                } else if (ifAnyGranted([Roles.CLASS])){
                    history.push(SITE_MAP.MANAGER_USER.LIST)
                } else {
                    history.push(SITE_MAP.MANAGER_ACTIVITY.LIST)
                }
            }
            if (!res.success && res?.errorCode === 'AUTHENTICATION_FAILURE') {
                notification.error({
                    placement: 'topRight',
                    message: 'Đăng nhập thất bại',
                    description: 'Tên đăng nhập và mật khẩu không chính xác',
                });
                setUserData({ username: '', password: '' });
                form.setFieldsValue({ username: '', password: '' });
            }
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Layout className="layout-default layout-signin">
                <Header>
                    <div className="header-col header-brand">
                        <img src={community_login} alt="" />
                    </div>
                    <div align="center" className="header-col header-nav">
                        <h3 align={'center'}>
                            HỆ THỐNG ĐÁNH GIÁ ĐIỂM PHỤC VỤ CỘNG ĐỒNG ĐẠI HỌC BÁCH KHOA
                        </h3>
                        <h3>ĐẠI HỌC ĐÀ NẴNG</h3>
                    </div>
                    <div className="header-col header-btn"></div>
                </Header>
                <Content className="signin">
                    <Row gutter={[24, 0]} justify="space-around">
                        <Col
                            className="sign-img"
                            style={{ padding: 12 }}
                            xs={{ span: 24 }}
                            lg={{ span: 8, offset: 0 }}
                            md={{ span: 12 }}
                        >
                            <img src={community} alt="" />
                        </Col>
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6 }} md={{ span: 12 }}>
                            <Title className="mb-15">Đăng nhập</Title>
                            <Form
                                form={form}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                className="row-col"
                            >
                                <Form.Item
                                    className="username"
                                    label="MSSV hoặc tên đăng nhập"
                                    name="username"
                                    initialValue={userData.username}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên đăng nhập!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="MSSV hoặc tên đăng nhập"
                                        value={userData.username}
                                        onChange={(e) => handleChange('username', e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="username"
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Mật khẩu"
                                        onChange={(e) => handleChange('password', e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: '100%' }}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    <Menu mode="horizontal">
                        <Menu.Item style={{ textAlign: 'left' }} key={'a'}>
                            <p>Phòng công tác sinh viên</p>
                            <p>ĐC: Phòng A108</p>
                            <p>ĐT: 0236.3738268</p>
                            <p>http://dut.udn.vn/Phong/Sinhvien</p>
                        </Menu.Item>
                        <Menu.Item style={{ textAlign: 'left' }} key={'b'}>
                            <p>Phòng Khoa học Công nghệ & Hợp tác quốc tế</p>
                            <p>ĐC: Phòng S01.S</p>
                            <p>ĐT: 0236.3842308</p>
                            <p>http://dut.udn.vn/Phong/KhoaHoc</p>
                        </Menu.Item>
                        <Menu.Item style={{ textAlign: 'left' }} key={'c'}>
                            <p>Phòng Kế hoạch - Tài chính</p>
                            <p>ĐC: Phòng A120</p>
                            <p>ĐT: 0236.3841660</p>
                            <p>http://dut.udn.vn/Phong/TaiChinh</p>
                        </Menu.Item>
                    </Menu>
                    <p className="copyright">
                        {' '}
                        © 2023 - Trường Đại học Bách Khoa - Đại học Đà Nẵng.{' '}
                    </p>
                </Footer>
            </Layout>
        </>
    );
};

export default SignIn;
