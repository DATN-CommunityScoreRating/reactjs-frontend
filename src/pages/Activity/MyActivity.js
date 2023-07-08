import {Button, Card, Col, Modal, Row, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {getActivityById, getMyActivities} from "../../services/activityService";
import {Link} from "react-router-dom";
import styled from "styled-components";
import STUDENT_ACTIVITY_STATUS from "../../constants/studentActivityStatus";
import ACTIVITY_STATUS from "../../constants/ativityStatus";
import Editor from "../../components/Editor";
import {getAllClearProof, getClearProofById, sendActivityClearProof} from "../../services/clearProofService";

const MyActivityStyle = styled.div`
  .activity-title {
    font-size: 15px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
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

const MyActivity = () => {
    const [myActivity, setMyActivity] = useState([])
    const [externalActivities, setExternalActivities] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [modalActivity, setModalActivity] = useState();
    const [description, setDescription] = useState('');
    const [isOpenClearProof, setIsOpenClearProof] = useState(false);
    const [clearProof, setClearProof] = useState({
        userId: 0,
        studentId: "string",
        faculty: "string",
        clearProofName: "string",
        score: 0,
        categoryName: "string",
        startDate: "string",
        endDate: "string",
        status: 'SEND_PROOF',
        clearProofId: 0,
        studentFullName: "string",
        description: "string",
        maxScore: 0,
        minScore: 0,
        clearProofScore: 0
    })

    const refreshData = () => {
        getMyActivities().then(res => {
            setMyActivity(res?.data?.items.map((data, index) => ({
                key: index,
                ...data
            })))
        })
    }

    useEffect(() => {
        getAllClearProof().then(res => {
            if (res?.success){
                setExternalActivities(res?.data?.items)
            }
        })
    },[])

    useEffect(refreshData, [])

    const externalColumns = [
        {
            title: 'Tên minh chứng',
            dataIndex: 'clearProofName',
            key: 'clearProofName'
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag icon={STUDENT_ACTIVITY_STATUS[status].icon} color={STUDENT_ACTIVITY_STATUS[status].color}>
                    {STUDENT_ACTIVITY_STATUS[status].message}
                </Tag>
            )
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate'
        },

        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate'
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => handleOpenModalClearProof(record.clearProofId)}>Xem minh chứng</Button>
            )
        },
    ]

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
                    {STUDENT_ACTIVITY_STATUS[userActivityStatus].message}
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
                       disabled={![STUDENT_ACTIVITY_STATUS.REGISTERED.status, STUDENT_ACTIVITY_STATUS.NOT_ACCEPTED.status].includes(record.userActivityStatus)
                           || record.status !== ACTIVITY_STATUS.EXPIRED.status}
                       onClick={() => openModal(record.activityId)}
                   >
                       Gửi minh chứng
                   </Button>
                </Space>
            ),
        },
    ];

    const cancelModal = () => {
        setIsOpen(false);
        setDescription(undefined)
    }

    const handleCancelClearProof = () => {
        setIsOpenClearProof(false);
    }

    const handleOpenModalClearProof = (clearProofId) => {
        getClearProofById(clearProofId).then(res => {
            if (res?.success){
                setClearProof(res?.data)
            } else {
                alert("Có lỗi xảy ra")
            }
        });
        setIsOpenClearProof(true);
    }

    const openModal = (activityId) => {
        getActivityById(activityId).then(res => {
            setModalActivity(res.data)
        })
        setIsOpen(true);
    }

    const sendClearProof = () => {
        sendActivityClearProof({
            activityId: modalActivity?.activityId,
            description,
            name: modalActivity?.name
        }).then(res => {
            if (res?.success){
                cancelModal();
                refreshData();
                setDescription(undefined)
            } else {
                console.error("Co loi xay ra")
            }
        })

    }
    return (
        <MyActivityStyle>
            <Modal
                title={'Gửi minh chứng'}
                okText={"Gửi"} cancelText={"Hủy"}
                open={isOpen} width={960}
                onCancel={cancelModal}
                onOk={sendClearProof}
            >
                <Card title={`Hoạt động: ${modalActivity?.name}`}>
                    <Space>
                        <Editor onChange={setDescription}/>
                    </Space>
                </Card>
            </Modal>
            <Modal
                title={'Minh chứng'}
                open={isOpenClearProof}
                onCancel={handleCancelClearProof} width={960}
                footer={null}
            >
                <MyModal className={'content'}>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Danh mục hoạt động: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof.categoryName}</Col>
                    </Row>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Hoạt động: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof.clearProofName}</Col>
                    </Row>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Ngày bắt đầu: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof.startDate}</Col>
                    </Row>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Điểm tích lũy: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof.score}</Col>
                    </Row>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Ngày kết thúc: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof.endDate}</Col>
                    </Row>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Điểm đánh giá: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof.clearProofScore}</Col>
                    </Row>
                    <Row>
                        <Card title={'Nội dung'} style={{width: '100%'}}>
                            <div dangerouslySetInnerHTML={{__html: clearProof.description}}></div>
                        </Card>
                    </Row>
                </MyModal>
            </Modal>
            <Card title={'Hoạt động cộng đồng trong nhà trường'}>
                <Table columns={columns} dataSource={myActivity}/>
            </Card>
            <Card title={'Hoạt động cộng đồng ngoài nhà trường'}>
                <Table columns={externalColumns} dataSource={externalActivities}/>
            </Card>
        </MyActivityStyle>
    )
}

export default MyActivity;