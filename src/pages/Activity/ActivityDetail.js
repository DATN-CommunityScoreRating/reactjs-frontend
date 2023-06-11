import {Button, Card, Col, Progress, Row, Space} from "antd";
import styled from "styled-components";
import Authorization, {Roles, TypeRoles} from "../../container/authorize/Authorization";
import {useEffect, useState} from "react";
import {getActivityById} from "../../services/activityService";
import {useParams} from "react-router-dom";
import ACTIVITY_STATUS from "../../constants/ativityStatus";

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
          font-size: 20px !important;
        }
      }
    }
  
  .activity-description {
    margin-top: 40px;
    min-height: 300px;
  }
`

const ActivityDetail = () => {
    const {activityId} = useParams();
    const [activity, setActivity] = useState({
        activityId: -1,
        description: '',
        endDate: '',
        location: '',
        maxQuantity: 0,
        name: '',
        organization: '',
        score: 0,
        startDate: '',
        status: 'ACTIVE',
        totalParticipant: 0
    });

    useEffect(() => {
        getActivityById(activityId).then((res) => {
            setActivity(res.data)
        })
    }, [activityId])

    return (
        <CartContainer
            title={activity.name}
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
                <Col className={'col-item value'} span={16}>{activity.startDate}</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Thời gian kết thúc</Col>
                <Col className={'col-item value'} span={16}>{activity.endDate}</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Đơn vị tổ chức</Col>
                <Col className={'col-item value'} span={16}>{activity.organization}</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Trạng thái</Col>
                <Col className={'col-item value'} span={16}>{ACTIVITY_STATUS[activity.status].message}</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Địa điểm</Col>
                <Col className={'col-item value'} span={16}>{activity.location}</Col>
            </Row>
            <Row className={'row-item'}>
                <Col className={'col-item'} span={8}>Số lượng tối đa</Col>
                <Col className={'col-item value'} span={16}>{activity.maxQuantity}</Col>
            </Row>
            <Space className={'row-progress'} size={60}>
                <Progress className={'registration-percent'} type="circle" percent={activity.totalParticipant/activity.maxQuantity*100} format={() => `${activity.totalParticipant}/${activity.maxQuantity} đã đăng ký`} />
                <Progress type="circle" percent={100} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} format={() => `+${activity.score} điểm`} />
            </Space>

            <Card className={'activity-description'} title={'Nội dung hoạt động'}>
                <div dangerouslySetInnerHTML={{__html: activity.description}} />
            </Card>
        </CartContainer>
    )
}

export default ActivityDetail;