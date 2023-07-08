import {Card, Col, Progress, Row, Space} from "antd";
import styled from "styled-components";
import {ifAnyGranted, ifNotGranted, Roles} from "../container/authorize/Authorization";
import {useEffect, useState} from "react";
import {getMyAccount} from "../services/userService";

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
  .profile-score {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 14px;
    .label-score{
      width: 100%;
      display: block;
      text-align: center;
    }
  }
`

function Profile() {
    const [myAccount, setMyAccount] = useState({
        username: "",
        fullName: "",
        email: "",
        studentId: "",
        score: 0,
        className: "",
        faculty: "",
        course: ""
    });

    useEffect(() => {
        getMyAccount().then(res => {
            setMyAccount(res)
        })
    },[])
    return (
        <>
            <CartContainer title={'Trang cá nhân'}>
                {
                    ifAnyGranted([Roles.STUDENT]) &&
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>MSSV</Col>
                        <Col className={'col-item value'} span={16}>{myAccount.studentId}</Col>
                    </Row>
                }

                <Row className={'row-item'}>
                    <Col className={'col-item'} span={8}>Tên</Col>
                    <Col className={'col-item value'} span={16}>{myAccount.fullName}</Col>
                </Row>
                {
                    ifAnyGranted([Roles.STUDENT, Roles.CLASS]) &&
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Lớp</Col>
                        <Col className={'col-item value'} span={16}>{myAccount.className}</Col>
                    </Row>
                }
                {
                    ifNotGranted([Roles.ADMIN, Roles.YOUTH_UNION]) &&
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Khoa</Col>
                        <Col className={'col-item value'} span={16}>{myAccount.faculty}</Col>
                    </Row>

                }
                {
                    ifNotGranted([Roles.ADMIN, Roles.YOUTH_UNION, Roles.FACULTY, Roles.UNION]) &&
                    <Row className={'row-item'}>
                        <Col className={'col-item'} span={8}>Khóa</Col>
                        <Col className={'col-item value'} span={16}>{myAccount.course}</Col>
                    </Row>
                }
                <Row className={'row-item'}>
                    <Col className={'col-item'} span={8}>Tên đăng nhập</Col>
                    <Col className={'col-item value'} span={16}>{myAccount.username}</Col>
                </Row>
                <Row className={'row-item'}>
                    <Col className={'col-item'} span={8}>Email</Col>
                    <Col className={'col-item value'} span={16}>{myAccount.email}</Col>
                </Row>
                <div className={'profile-score'}>
                    <Space direction={"vertical"}>
                        <span className={'label-score'}>Điểm tích lũy</span>
                        <Progress type="circle" percent={100} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} format={() => myAccount.score}/>
                    </Space>

                </div>
            </CartContainer>
        </>
    )
}

export default Profile;
