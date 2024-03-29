import {Card, Table, Button, Typography, Tag, Progress, Dropdown, message, Popconfirm, Space} from 'antd';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import SITE_MAP from '../../constants/path';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined, DashboardOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    SyncOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import './style.css';
import { useEffect, useState } from 'react';
import {
    cancelActivity,
    deleteActivity,
    getListActivity,
    registrationActivity
} from '../../services/activityService';
import ACTIVITY_STATUS from '../../constants/ativityStatus';
import Authorization, {ifNotGranted, Roles, TypeRoles} from "../../container/authorize/Authorization";

const { Title } = Typography;

const StyledAction = styled.div`
    .anticon {
        margin-right: 5px;
    }
`;

const ACTION = {
    VIEW: 'view',
    EDIT: 'edit',
    DELETE: 'delete'
}

function Activity() {
    const history = useHistory();
    const [listActivity, setListActivity] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [registrationId, setRegistrationId] = useState(-1);

    const handleDeleteUserActivity = (activityId) => {
        cancelActivity(activityId).then(res => {
            if (res?.success){
                messageApi
                    .open({
                        type: 'success',
                        content: 'Xóa thành công',
                        duration: 1,
                    })
                    .then((r) => {
                        refreshListActivity()
                    });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Có lỗi xảy ra',
                });
            }
        })
    }

    const handleClickAction = (type, recordData) => {
        if (type === ACTION.VIEW){
            history.push(`/activities/${recordData.activityId}/users`)
        }
        if (type === ACTION.DELETE){
            deleteActivity(recordData.activityId).then(res => {
                if (res?.success){
                    messageApi
                        .open({
                            type: 'success',
                            content: 'Xóa thành công',
                            duration: 1,
                        })
                        .then((r) => {
                            refreshListActivity()
                        });
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'Có lỗi xảy ra',
                    });
                }
            })
        }
    };

    const activityAction = (handleClick, record) => [
        {
            key: `${record.activityId}-1`,
            label: (
                <StyledAction onClick={() => handleClick(ACTION.VIEW, record)}>
                    <TeamOutlined />
                    <span>Xem sinh viên đã đăng ký</span>
                </StyledAction>
            ),
        },
        {
            key: `${record.activityId}-2`,
            label: (
                <StyledAction onClick={() => handleClick(ACTION.EDIT, record)}>
                    <EditOutlined />
                    <span>Chỉnh sửa</span>
                </StyledAction>
            ),
        },
        {
            key: `${record.activityId}-3`,
            label: (
                <Popconfirm
                    title="Xóa hoạt động"
                    description={`Bạn muốn xóa hoạt động ${record.name}?`}
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={() => handleClick(ACTION.DELETE, record)}
                >
                    <StyledAction>
                        <DeleteOutlined />
                        <span>Xoá</span>
                    </StyledAction>
                </Popconfirm>
            ),
            danger: true,
            disabled: record.status !== ACTIVITY_STATUS.ACTIVE.status
        },
    ];

    const columns = [
        {
            title: 'Hoạt động',
            dataIndex: 'name',
            key: 'activityName',
            render: (name, record) => (
                <Link className={'activity-title'} to={`/activities/${record.activityId}`}>
                    {name}
                </Link>
            ),
            width: '18%',
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
            render: (status, record) => {
                let icon = <SyncOutlined spin />;
                let color = 'green';
                let message = '';
                if (status === ACTIVITY_STATUS.EXPIRED.status ||
                    status === ACTIVITY_STATUS.GOING_ON.status || 
                    status === ACTIVITY_STATUS.IS_COMING.status) {
                    color = 'volcano';
                    icon = <CloseCircleOutlined />;
                    message = ACTIVITY_STATUS.EXPIRED.message;
                }
                if (status === ACTIVITY_STATUS.ACTIVE.status) {
                    color = 'green';
                    icon = <SyncOutlined spin />;
                    message = ACTIVITY_STATUS.ACTIVE.message;
                }
                if (status === ACTIVITY_STATUS.FULLY.status) {
                    color = 'success';
                    icon = <CheckCircleOutlined />;
                    message = ACTIVITY_STATUS.FULLY.message;
                }
                if (status === ACTIVITY_STATUS.PENDING.status) {
                    color = 'warning';
                    icon = <ClockCircleOutlined />;
                    message = ACTIVITY_STATUS.PENDING.message;
                }
                return (
                    <Space direction={'vertical'}>
                        <Tag icon={icon} color={color}>
                            {message}
                        </Tag>
                        {
                            record.needConfirmation  &&
                            <Tag icon={<DashboardOutlined/>} color={"cyan"} >
                                Cần xác nhận
                            </Tag>
                        }
                    </Space>
                );
            },
            width: '14%'
        },
        {
            title: "Mở đăng ký",
            key: 'startRegister',
            dataIndex: 'startRegister',
            align: 'center',
        },
        {
            title: 'Kết thúc đăng ký',
            key: 'endRegister',
            dataIndex: 'endRegister',
            align: 'center',
        },
        {
            title: 'Số điểm',
            key: 'score',
            dataIndex: 'score',
            align: 'center',
        },
        {
            title: 'Số lượng tham gia',
            key: 'totalParticipant',
            dataIndex: 'totalParticipant',
            render: (totalParticipant, record) => {
                let percent = (totalParticipant / record.maxQuantity) * 100;
                let status = 'active';

                if (percent < 50) {
                    status = 'exception';
                } else if (percent === 100) {
                    status = 'success';
                }

                return (
                    <>
                        <Progress percent={percent} size={'small'} showInfo={false} status={status} />
                        <Title
                            level={5}
                            style={{ textAlign: 'center' }}
                        >{`${totalParticipant}/${record.maxQuantity}`}</Title>
                    </>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            dataIndex: 'action',
            align: 'center',
            render: (_, record) => (
                ifNotGranted([Roles.STUDENT]) ?
                    <Dropdown
                        menu={{
                            items: activityAction(handleClickAction, record),
                        }}
                        placement="bottom"
                    >
                        <span>
                            <EllipsisOutlined />
                        </span>
                    </Dropdown> :
                    record?.registered && record.status === ACTIVITY_STATUS.ACTIVE.status ?
                        <Popconfirm
                            title="Hủy đăng ký"
                            description={`Bạn muốn hủy đăng ký hoạt động ${record.name}?`}
                            onConfirm={() => handleDeleteUserActivity(record?.activityId)}
                            okText="Xóa"
                            okType={"danger"}
                            cancelText="Hủy"
                        >
                            <Button
                                type={"default"}
                                danger={true}
                                disabled={record.status !== ACTIVITY_STATUS.ACTIVE.status}
                            >
                                Hủy đăng ký
                            </Button>
                        </Popconfirm> :
                        <Button
                            type={"primary"}
                            disabled={record.status !== ACTIVITY_STATUS.ACTIVE.status}
                            onClick={() => handleRegistration(record.activityId)}
                        >
                            Đăng ký
                        </Button>

            ),
        },
    ];

    const refreshListActivity = () => {
        getListActivity().then((data) => {
            setListActivity(
                data?.items.map((record, index) => ({
                    key: index,
                    ...record,
                }))
            );
        });
    }

    useEffect(() => {
        refreshListActivity()
    }, [registrationId]);
    const handleAddActivity = () => {
        history.push(SITE_MAP.MANAGER_ACTIVITY.CREATE);
    };

    const handleRegistration = (activityId) => {
        registrationActivity({activityId}).then(res => {
            if (res?.success){
                messageApi
                    .open({
                        type: 'success',
                        content: 'Đăng ký thành công',
                        duration: 1,
                    })
                    .then((r) => {
                        setRegistrationId(res?.data?.id)
                    });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Có lỗi xảy ra',
                });
            }
        })
    }

    const title = ifNotGranted([Roles.STUDENT]) ? 'Quản lý hoạt động cộng đồng' : 'Đăng ký tham gia';

    return (
        <div className="tabled manage-activity">
            {contextHolder}
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title={title}
                extra={
                        <Authorization
                            type={TypeRoles.ifNotGranted}
                            roles={[Roles.STUDENT]}
                        >
                            <Button type="primary" onClick={handleAddActivity}>
                                Thêm hoạt động
                            </Button>
                        </Authorization>
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
