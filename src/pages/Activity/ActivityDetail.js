import {Button, Card, Col, Progress, Row, Space} from "antd";
import styled from "styled-components";
import Authorization, {Roles, TypeRoles} from "../../container/authorize/Authorization";
const max = 100;

const CartContainer = styled(Card)`
    .row-item{
        display: inline-flex;
        width: 100%;
        @media screen and (min-width: 767px) {
            width: 50% !important;
        }
      
        .col-item {
            height: 40px;
            width: 100%;
        }

        .col-item.value{
            font-weight: bold;
        }
    }

    .row-progress {
        margin: 10px 0;
        display: flex;
        justify-content: center;
      .registration-percent {
        font-size: 10px;
        .ant-progress-inner {
          font-size: 18px !important;
        }
      }
    }
  
  .activity-description {
    margin-top: 40px;
    min-height: 300px;
  }
`

const ActivityDetail = () => {
    return (
        <CartContainer
            title={'Hiến máu'}
            gutter={[
                { xs: 0, sm: 0, md: 28 },
                { xs: 8, sm: 8, md: 0 },
            ]}
            className={'activity-detail'}
            headStyle={{
                color: '#1890ff',
                fontSize: '20px'
            }}
            extra={
                <>
                    <Authorization
                        type={TypeRoles.ifAnyGranted}
                        roles={[Roles.STUDENT]}>
                        <Button type={'primary'}>Đăng ký</Button>
                    </Authorization>
                    <Authorization
                        type={TypeRoles.ifNotGranted}
                        roles={[Roles.STUDENT]}>
                        <Button type={'primary'}>Chỉnh sửa</Button>
                    </Authorization>
                </>
            }
        >
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Thời gian bắt đầu</Col>
                <Col className={'col-item value'} span={16}>08/12/2001</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Thời gian kết thúc</Col>
                <Col className={'col-item value'} span={16}>08/12/2001</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Đơn vị tổ chức</Col>
                <Col className={'col-item value'} span={16}>Đại học Bách Khoa - Đại học Đà Nẵng</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Trạng thái</Col>
                <Col className={'col-item value'} span={16}>Đang mở đăng ký</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Địa điểm</Col>
                <Col className={'col-item value'} span={16}>Sảnh A Đại học Bách Khoa</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Số lượng tối đa</Col>
                <Col className={'col-item value'} span={16}>100</Col>
            </Row>
            <Space className={'row-progress'} size={60}>
                <Progress className={'registration-percent'} type="circle" percent={75} format={(percent) => `${percent}/${max} đã đăng ký`} />
                <Progress type="circle" percent={100} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} format={() => '+20 điểm'} />
            </Space>

            <Card className={'activity-description'} title={'Nội dung hoạt động'}>
                <p> Xin chao cac ban minh la dai rat vui duoc lam quen</p>
            </Card>
        </CartContainer>
    )
}

export default ActivityDetail;