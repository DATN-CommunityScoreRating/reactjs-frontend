import { Layout, Row, Col } from 'antd';
import { HeartFilled } from '@ant-design/icons';

function Footer() {
    const { Footer: AntFooter } = Layout;

    return (
        <AntFooter style={{ background: '#fafafa' }}>
            <Row className="just">
                <Col xs={24} md={12} lg={12}>
                    <div className="copyright">
                        © 2023, thực hiện
                        {<HeartFilled />} bởi
                        <a href="#pablo" className="font-weight-bold" target="_blank">
                            lkaDai
                        </a>
                        BKDN.
                    </div>
                </Col>
                <Col xs={24} md={12} lg={12}>
                    <div className="footer-menu">
                        <ul>
                            <li className="nav-item">
                                <a href="#pablo" className="nav-link text-muted" target="_blank">
                                    Anh Đài
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#pablo" className="nav-link text-muted" target="_blank">
                                    Chúng tôi
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#pablo" className="nav-link text-muted" target="_blank">
                                    Thông tin
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#pablo"
                                    className="nav-link pe-0 text-muted"
                                    target="_blank"
                                >
                                    Đại học Bách Khoa
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </AntFooter>
    );
}

export default Footer;
