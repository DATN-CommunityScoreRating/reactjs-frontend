import {Button, Card, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {getMyActivities} from "../../services/activityService";
import {Link} from "react-router-dom";
import styled from "styled-components";
import STUDENT_ACTIVITY_STATUS from "../../constants/studentActivityStatus";
import ACTIVITY_STATUS from "../../constants/ativityStatus";

const MyActivityStyle = styled.div`
  .activity-title {
    font-size: 15px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
  }
`

const MyActivity = () => {
    const [myActivity, setMyActivity] = useState([])

    useEffect(() => {
        getMyActivities().then(res => {
            setMyActivity(res?.data?.items.map((data, index) => ({
                key: index,
                ...data
            })))
        })
    }, [])

    const columns = [
        {
            title: 'Hoạt động',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => (
                <Link className={'activity-title'} to={`/activities/${record.activityId}`}>
                    {name}
                </Link>
            )
        },
        {
            title: 'Đơn vị tổ chức',
            dataIndex: 'organization',
            key: 'organization',
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'userActivityStatus',
            key: 'userActivityStatus',
            render: (userActivityStatus) => (
                userActivityStatus !== '' &&
                <Tag icon={STUDENT_ACTIVITY_STATUS[userActivityStatus].icon} color={STUDENT_ACTIVITY_STATUS[userActivityStatus].color}>
                    {STUDENT_ACTIVITY_STATUS['REGISTERED'].message}
                </Tag>
            )
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Ngày kết thúc',
            key: 'endDate',
            dataIndex: 'endDate',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                   <Button
                       type={"primary"}
                       disabled={record.userActivityStatus === STUDENT_ACTIVITY_STATUS.REGISTERED.status
                           &&record.status !== ACTIVITY_STATUS.EXPIRED.status}
                   >
                       Gửi minh chứng
                   </Button>
                </Space>
            ),
        },
    ];
    return (
        <MyActivityStyle>
            <Card title={'Hoạt động cộng đồng cá nhân'}>
                <Table columns={columns} dataSource={myActivity}/>
            </Card>
        </MyActivityStyle>
    )
}

export default MyActivity;