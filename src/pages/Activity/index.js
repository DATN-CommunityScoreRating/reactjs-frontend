import {Card, Table, Button, Avatar, Typography, Tag, Progress} from 'antd';

// Images
import face from '../../assets/images/face-1.jpg';
import face2 from '../../assets/images/face-2.jpg';
import face3 from '../../assets/images/face-3.jpg';
import face4 from '../../assets/images/face-4.jpg';
import face5 from '../../assets/images/face-5.jpeg';
import face6 from '../../assets/images/face-6.jpeg';
import {Link, useHistory} from 'react-router-dom';
import SITE_MAP from '../../constants/path';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined
} from "@ant-design/icons";
import './style.css'

const { Title } = Typography;

const maxScore = 50;

const columns = [
    {
        title: 'Hoạt động',
        dataIndex: 'activityName',
        key: 'activityName',
        render: (activityName) => (
            <Link className={'activity-title'} to={"#"}>
                {activityName}
            </Link>
        ),
        width: '240px'
    },
    {
        title: 'Tổ chức',
        dataIndex: 'organizationName',
        key: 'organizationName',
    },

    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
            let icon = <SyncOutlined spin/>
                let color = 'green';
            if (status.key === 'EXPIRED'){
                color = 'volcano';
                icon = <CloseCircleOutlined />
            }
            if (status.key === 'ACTIVE'){
                color = 'green'
                icon = <SyncOutlined spin />
            }
            if (status.key === 'DONE'){
                color = 'success'
                icon = <CheckCircleOutlined />
            }
            if (status.key === 'PENDING'){
                color = 'warning'
                icon = <ClockCircleOutlined  />
            }
            return (
                <Tag icon={icon} color={color}>{status.name}</Tag>
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
        key: 'participantNumber',
        dataIndex: 'participantNumber',
        render: (participantNumber) => {
            let percent = participantNumber/maxScore * 100;
            let status = 'active';
            if (percent < 50){
                status = 'exception'
            } else if (percent === 100){
                status = 'success'
            }
            if (percent < 50){

            }
            return (
                <>
                    <Progress percent={percent} size={"small"} showInfo={false} status={status}/>
                    <Title level={5} style={{textAlign: 'center'}} >{`${participantNumber}/${maxScore}`}</Title>
                </>

            )
        }
    },
    {
        title: 'Hành động',
        key: 'action',
        dataIndex: 'action',
        render: (_, {status}) => (
            <Button type={"primary"} disabled={status.key !== 'ACTIVE'}>Đăng ký</Button>
        )
    },
];

const data = [
    {
        key: 1,
        activityName: 'Mùa hè xanh',
        organizationName: "Đại học Đà Nẵng",
        status: {
            key: "ACTIVE",
            name: "Mở đăng ký"
        },
        startDate: '5/10/2023',
        endDate: "8/10/2023",
        score: 30,
        participantNumber: 40,

    },
    {
        key: 2,
        activityName: 'Hiến máu nhân đạo',
        organizationName: "Đại học Bách Khoa",
        status: {
            key: "EXPIRED",
            name: "Hết hạn"
        },
        startDate: '20/10/2023',
        endDate: "21/10/2023",
        score: 30,
        participantNumber: 48,

    },
    {
        key: 3,
        activityName: 'Dev day',
        organizationName: "Đại học Bách Khoa",
        status: {
            key: "DONE",
            name: "Đủ số lượng"
        },
        startDate: '20/10/2023',
        endDate: "21/10/2023",
        score: 30,
        participantNumber: 50,

    },
    {
        key: 4,
        activityName: 'Làm sạch môi trường',
        organizationName: "Khoa Hóa",
        status: {
            key: "PENDING",
            name: "Chờ"
        },
        startDate: '24/10/2023',
        endDate: "26/10/2023",
        score: 20,
        participantNumber: 0,

    },
    {
        key: 5,
        activityName: 'Xuân yêu thương',
        organizationName: "Khoa CNTT",
        status: {
            key: "ACTIVE",
            name: "Mở đăng ký"
        },
        startDate: '24/10/2023',
        endDate: "26/10/2023",
        score: 30,
        participantNumber: 36,

    },
    {
        key: 5,
        activityName: 'ESport Support',
        organizationName: "Khoa FAST",
        status: {
            key: "ACTIVE",
            name: "Mở đăng ký"
        },
        startDate: '28/10/2023',
        endDate: "30/10/2023",
        score: 20,
        participantNumber: 10,

    }
]

function Activity() {
    const history = useHistory();
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
                        dataSource={data}
                        pagination={false}
                        className="ant-border-space"
                    />
                </div>
            </Card>
        </div>
    );
}

export default Activity;
