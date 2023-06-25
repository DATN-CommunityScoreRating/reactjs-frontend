import {Button, Card, Col, InputNumber, Modal, Row, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {
    cancelClearProof,
    conFirmClearProof,
    getAllClearProof,
    getClearProofById
} from "../../services/clearProofService";
import STUDENT_ACTIVITY_STATUS from "../../constants/studentActivityStatus";

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

const ConfirmProof = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clearProofs, setClearProofs] = useState([])
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

    const [score, setScore] = useState(5);

    const reloadClearProof = () => {
        getAllClearProof().then(res => {
            if (res?.success){
                setClearProofs(res?.data?.items)
            }
        })
    }

    useEffect(reloadClearProof, [])

    const columns = [
        {
            title: 'Mã số sinh viên',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'Tên sinh viên',
            dataIndex: 'studentFullName',
            key: 'studentFullName',
        },
        {
            title: 'Khoa',
            dataIndex: 'faculty',
            key: 'faculty',
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
            title: 'Tên minh chứng',
            dataIndex: 'clearProofName',
            key: 'clearProofName',
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
                    <Space>
                        <Button onClick={() => handleViewClearProof(record?.clearProofId)}>Xem minh chứng</Button>
                    </Space>
                )
            }
        },

    ];

    const handleUnConfirm = () => {
        cancelClearProof(clearProof.clearProofId).then(res => {
            if (res?.success){
                setIsModalOpen(false);
                reloadClearProof();
            } else {
                alert("Có lỗi xảy ra")
            }
        })
    }

    const handleViewClearProof = (clearProofId) => {
        getClearProofById(clearProofId).then(res => {
            if (res?.success){
                setClearProof(res?.data)
                setScore(res?.data?.minScore)
            }
        })
        setIsModalOpen(true);
    }

    const handleOk = () => {
        conFirmClearProof({
            clearProofId: clearProof.clearProofId,
            score
        }).then(res => {
            if (res?.success){
                setIsModalOpen(false);
                reloadClearProof();
            } else {
                alert('Có lỗi xảy ra')
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleChangeScore = (score) => {
        setScore(score);
    }


    return (
        <div>
            <Modal
                title={'Minh chứng'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel} width={960}
                okText={'Xác nhận'}
                cancelText={'Không hợp lệ'}
                footer={[
                    <Button key={'back'} onClick={handleCancel}>Hủy</Button>,
                    <Button key={'invalid'} danger={true} onClick={handleUnConfirm} disabled={clearProof.status !== STUDENT_ACTIVITY_STATUS.SEND_PROOF.status}> Không hợp lệ</Button>,
                    <Button key={'submit'} type={"primary"} onClick={handleOk} disabled={clearProof.status !== STUDENT_ACTIVITY_STATUS.SEND_PROOF.status}> Xác nhận</Button>
                ]}
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
                        <Col className={'col-item'} span={8}>MSSV: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof.studentId}</Col>
                    </Row>
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Tên sinh viên: </Col>
                        <Col className={'col-item value'} span={16}>{clearProof.studentFullName}</Col>
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
                        <Col className={'col-item value'} span={16}>{
                            clearProof.status === STUDENT_ACTIVITY_STATUS.SEND_PROOF.status ?
                                <InputNumber onChange={e => handleChangeScore(e)} min={clearProof.minScore} max={clearProof.maxScore} value={score}/> :
                                clearProof.clearProofScore
                        }

                        </Col>
                    </Row>
                    <Row>
                        <Card title={'Nội dung'} style={{width: '100%'}}>
                            <div dangerouslySetInnerHTML={{__html: clearProof.description}}></div>
                        </Card>
                    </Row>
                </MyModal>
            </Modal>
            <Card title={'Xác nhận minh chứng'}>
                <Table columns={columns} dataSource={clearProofs}/>
            </Card>
        </div>
    )
}

export default ConfirmProof;