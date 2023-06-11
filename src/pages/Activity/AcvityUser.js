import {Button, Card, Space, Table} from "antd";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getActivityById, getStudentActivity} from "../../services/activityService";

const MyCart = styled(Card)`
.user-table{
  width: 100%;
}
`

const ActivityUser = () => {
    const {activityId} = useParams();
    const [students, setStudents] = useState([])

    const [activity, setActivity] = useState({
        activityId: -1,
        name: '',
    });

    useEffect(() => {
        getActivityById(activityId).then((res) => {
            setActivity(res.data)
        })
    }, [activityId])

    useEffect(() => {
        getStudentActivity(activityId).then(res => {
            setStudents(res?.data?.items.map((data) => ({
                ...data
            })))
        })
    }, [activityId])

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
                return (
                    <>
                        <Button danger>Xóa</Button>
                    </>
                );
            },
        },
    ]
    return (
        <MyCart title={activity.name} className={'card-user-activity'} headStyle={{
            color: '#1890ff',
            fontSize: '20px'
        }}>
            <Space direction={"vertical"} className={'user-table'}>
                <h4 className='table-title'>Danh sách sinh viên đăng ký</h4>
                <Table className={'table-data'} columns={columns} dataSource={students} />
            </Space>

        </MyCart>
    )
}

export default ActivityUser;