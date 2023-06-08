import {Button, Card, Space, Table} from "antd";
import styled from "styled-components";

const MyCart = styled(Card)`
.user-table{
  width: 100%;
}
`

const ActivityUser = () => {
    const data = [
        {
            studentId: '102190350',
            fullName: 'Lê Khắc Anh Đài',
            faculty: 'Công nghệ thông tin',
            className: '19TCLC_Nhat2',
            score: 20,

        },
        {
            studentId: '102190860',
            fullName: 'Nguyễn Văn A',
            faculty: 'Cơ khí',
            className: '20CK',
            score: 100,

        },
        {
            studentId: '102210032',
            fullName: 'Nguyễn Văn B',
            faculty: 'Hóa',
            className: '21H2',
            score: 60,

        },
        {
            studentId: '102190359',
            fullName: 'Nguyễn Văn C',
            faculty: 'Công nghệ thông tin',
            className: '19TCLC_Nhat2',
            score: 100,

        }
    ]

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
        <MyCart title={'Hiến máu nhân đạo'} className={'card-user-activity'} headStyle={{
            color: '#1890ff',
            fontSize: '20px'
        }}>
            <Space direction={"vertical"} className={'user-table'}>
                <h4 className='table-title'>Danh sách sinh viên đăng ký</h4>
                <Table className={'table-data'} columns={columns} dataSource={data} />
            </Space>

        </MyCart>
    )
}

export default ActivityUser;