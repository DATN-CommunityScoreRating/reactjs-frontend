import {Button, Card, message, Popconfirm, Space, Table} from "antd";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteUserActivity, getActivityById, getStudentActivity} from "../../services/activityService";
import ACTIVITY_STATUS from "../../constants/ativityStatus";
import STUDENT_ACTIVITY_STATUS from "../../constants/studentActivityStatus";

const MyCart = styled(Card)`
.user-table{
  width: 100%;
}
`

const ActivityUser = () => {
    const {activityId} = useParams();
    const [students, setStudents] = useState([])
    const [messageApi, contextHolder] = message.useMessage();

    const [activity, setActivity] = useState({
        activityId: -1,
        name: '',
        status: 'ACTIVE'
    });

    useEffect(() => {
        getActivityById(activityId).then((res) => {
            setActivity(res.data)
        })
    }, [activityId])

    const getStudents = () => {
        getStudentActivity(activityId).then(res => {
            setStudents(res?.data?.items.map((data) => ({
                ...data
            })))
        })
    }

    useEffect(() => {
        getStudentActivity(activityId).then(res => {
            setStudents(res?.data?.items.map((data) => ({
                ...data
            })))
        })
    }, [activityId])

    const handleDeleteUserActivity = (userActivityId) => {
        deleteUserActivity(userActivityId).then(res => {
            if (res?.success){
                messageApi
                    .open({
                        type: 'success',
                        content: 'Xóa thành công',
                        duration: 1,
                    })
                    .then((r) => {
                        getStudents()
                    });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Có lỗi xảy ra',
                });
            }
        })
    }

    const columns = [
        {
            title: 'MSSV',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'Tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Khoa',
            dataIndex: 'faculty',
            key: 'faculty',
        },
        {
            title: 'Lớp',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: 'Điểm',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                let isActive = ACTIVITY_STATUS.ACTIVE.status === activity.status;
                let canConfirm = [ACTIVITY_STATUS.GOING_ON, ACTIVITY_STATUS.EXPIRED.status].includes(activity.status)
                return (
                    <Space>
                        {canConfirm && <Button type={"primary"}>Xác nhận</Button>}
                        {STUDENT_ACTIVITY_STATUS.SEND_PROOF === record.status && <Button type={"default"}>Xem minh chứng</Button>}
                        {isActive && <Popconfirm
                            title="Xóa sinh viên khỏi hoạt động"
                            description={`Bạn muốn xóa ${record.fullName} khỏi hoạt động này`}
                            onConfirm={() => handleDeleteUserActivity(record?.userActivityId)}
                            okText="Xóa"
                            okType={"danger"}
                            cancelText="Hủy"
                        >
                            <Button danger>Xóa</Button>
                        </Popconfirm>}
                    </Space>
                );
            },
        },
    ]
    return (
        <MyCart title={activity.name} className={'card-user-activity'} headStyle={{
            color: '#1890ff',
            fontSize: '20px'
        }}>
            {contextHolder}
            <Space direction={"vertical"} className={'user-table'}>
                <h4 className='table-title'>Danh sách sinh viên đăng ký</h4>
                <Table className={'table-data'} columns={columns} dataSource={students} />
            </Space>

        </MyCart>
    )
}

export default ActivityUser;