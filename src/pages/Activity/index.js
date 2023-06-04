import {Card, Table, Button, Typography, Tag, Progress} from 'antd';

import {Link, useHistory} from 'react-router-dom';
import SITE_MAP from '../../constants/path';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined
} from "@ant-design/icons";
import './style.css'
import {useEffect, useState} from "react";
import {getListActivity} from "../../services/activityService";
import ACTIVITY_STATUS from "../../constants/ativityStatus";

const { Title } = Typography;

const columns = [
    {
        title: 'Hoạt động',
        dataIndex: 'name',
        key: 'activityName',
        render: (name) => (
            <Link className={'activity-title'} to={"#"}>
                {name}
            </Link>
        ),
        width: '240px'
    },
    {
        title: 'Tổ chức',
        dataIndex: 'organization',
        key: 'organization',
    },

    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
            let icon = <SyncOutlined spin/>
            let color = 'green';
            let message = ""
            if (status === ACTIVITY_STATUS.EXPIRED.status){
                color = 'volcano';
                icon = <CloseCircleOutlined />
                message = ACTIVITY_STATUS.EXPIRED.message;
            }
            if (status === ACTIVITY_STATUS.ACTIVE.status){
                color = 'green'
                icon = <SyncOutlined spin />
                message = ACTIVITY_STATUS.ACTIVE.message;
            }
            if (status === ACTIVITY_STATUS.FULLY.status){
                color = 'success'
                icon = <CheckCircleOutlined />
                message = ACTIVITY_STATUS.FULLY.message;
            }
            if (status === ACTIVITY_STATUS.PENDING.status){
                color = 'warning'
                icon = <ClockCircleOutlined  />
                message = ACTIVITY_STATUS.PENDING.message;
            }
            return (
                <Tag icon={icon} color={color}>{message}</Tag>
            )
        }
    },
    {
        title: 'Ngày bắt đầu',
        key: 'startDate',
        dataIndex: 'startDate',
    },
    {
        title: 'Ngày kết thúc',
        key: 'endDate',
        dataIndex: 'endDate',
    },
    {
        title: 'Số điểm',
        key: 'score',
        dataIndex: 'score',
    },
    {
        title: 'Số lượng tham gia',
        key: 'totalParticipant',
        dataIndex: 'totalParticipant',
        render: (totalParticipant, record) => {
            let percent = totalParticipant/record.maxQuantity * 100;
            let status = 'active';

            if (percent < 50){
                status = 'exception'
            } else if (percent === 100){
                status = 'success'
            }

            return (
                <>
                    <Progress percent={percent} size={"small"} showInfo={false} status={status}/>
                    <Title level={5} style={{textAlign: 'center'}} >{`${totalParticipant}/${record.maxQuantity}`}</Title>
                </>

            )
        }
    },
    {
        title: 'Hành động',
        key: 'action',
        dataIndex: 'action',
        render: (_, {status}) => (
            <Button type={"primary"} disabled={status !== 'ACTIVE'}>Đăng ký</Button>
        )
    },
];

function Activity() {
    const history = useHistory();

    const [listActivity, setListActivity] = useState([])

    useEffect(() => {
        getListActivity().then((data) => {
            setListActivity(data?.items.map(({facultyId, ...dt}) => ({
                key: facultyId,
                ...dt
            })))
        })
    }, [])
    const handleAddActivity = () => {
        history.push(SITE_MAP.MANAGER_ACTIVITY.CREATE);
    };

    return (
        <div className="tabled manage-activity">
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Quản lý hoạt động cộng đồng"
                extra={
                    <>
                        <Button type="primary" onClick={handleAddActivity}>
                            Thêm hoạt động
                        </Button>
                    </>
                }
            >
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        dataSource={listActivity}
                        pagination={false}
                        className="ant-border-space"
                    />
                </div>
            </Card>
        </div>
    );
}

export default Activity;
