import {Button, Card, Col, message, Modal, Popconfirm, Row, Space, Table, Tag} from "antd";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteUserActivity, getActivityById, getStudentActivity} from "../../services/activityService";
import ACTIVITY_STATUS from "../../constants/ativityStatus";
import STUDENT_ACTIVITY_STATUS from "../../constants/studentActivityStatus";
import {
    cancelClearProofActivity,
    confirmActivityClearProof,
    getActivityClearProof
} from "../../services/clearProofService";

const MyCart = styled(Card)`
.user-table{
  width: 100%;
}
`

const MyModal = styled.div`
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
`

const ActivityUser = () => {
    const {activityId} = useParams();
    const [students, setStudents] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clearProof, setClearProof] = useState({
        clearProofId: 0,
        activityId: 0,
        activityName: "string",
        studentId: "string",
        studentFullName: "string",
        score: 0,
        description: "string"
    })

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
            setStudents(res?.data?.items.map((data, index) => ({
                key: index,
                ...data
            })))
        })
    }

    useEffect(() => {
        getStudentActivity(activityId).then(res => {
            setStudents(res?.data?.items.map((data, index) => ({
                key: index,
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
            title: "Trạng thái",
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return (
                    <Tag icon={STUDENT_ACTIVITY_STATUS[status].icon} color={STUDENT_ACTIVITY_STATUS[status].color}>
                        {STUDENT_ACTIVITY_STATUS[status].message}
                    </Tag>
                )
            }
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
                // let canConfirm = [ACTIVITY_STATUS.GOING_ON, ACTIVITY_STATUS.EXPIRED.status].includes(activity.status)
                //     && [STUDENT_ACTIVITY_STATUS.REGISTERED.status, STUDENT_ACTIVITY_STATUS.SEND_PROOF.status].includes(record.status);
                return (
                    <Space>
                        {/*{canConfirm && <Button type={"primary"}>Xác nhận</Button>}*/}
                        {STUDENT_ACTIVITY_STATUS.SEND_PROOF.status === record.status && <Button onClick={() => handleViewClearProof(record.userActivityId)} type={"default"}>Xem minh chứng</Button>}
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

    const handleUnConfirm = () => {
        cancelClearProofActivity(clearProof.clearProofId).then(res => {
            if (res?.success){
                setIsModalOpen(false);
                getStudents();
            }
            setClearProof(undefined);
        })

    }

    const handleViewClearProof = (activityId) => {
        getActivityClearProof(activityId).then(res => {
            setClearProof(res?.data)
        })
        setIsModalOpen(true);
    }

    const handleOk = () => {
        confirmActivityClearProof(clearProof.clearProofId).then(res => {
            if (res?.success){
                setIsModalOpen(false);
                getStudents();
            }
            setClearProof(undefined);
        })

    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setClearProof(undefined);
    }

    return (
        <MyCart title={activity.name} className={'card-user-activity'} headStyle={{
            color: '#1890ff',
            fontSize: '20px'
        }}>
            {contextHolder}
            <Modal
                title={'Minh chứng'}
                open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel} width={960}
                okText={'Xác nhận'}
                cancelText={'Không hợp lệ'}
                footer={[
                    <Button key={'back'} onClick={handleCancel}>Hủy</Button>,
                    <Button key={'invalid'} danger={true} onClick={handleUnConfirm}> Không hợp lệ</Button>,
                    <Button key={'submit'} type={"primary"} onClick={handleOk}> Xác nhận</Button>
                ]}
            >
                <MyModal className={'content'}>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Hoạt động: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof?.activityName}</Col>
                    </Row>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>MSSV: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof?.studentId}</Col>
                    </Row>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Tên sinh viên: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof?.studentFullName}</Col>
                    </Row>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Điểm tích lũy: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof?.score}</Col>
                    </Row>
                    <Row>
                        <Card title={'Nội dung'} style={{width: '100%'}}>
                            <div dangerouslySetInnerHTML={{__html: clearProof?.description}}></div>
                        </Card>
                    </Row>
                </MyModal>
            </Modal>
            <Space direction={"vertical"} className={'user-table'}>
                <h4 className='table-title'>Danh sách sinh viên đăng ký</h4>
                <Table className={'table-data'} columns={columns} dataSource={students} />
            </Space>

        </MyCart>
    )
}

export default ActivityUser;