import {Button, Card, Space, Table, Tag} from "antd";

const MyActivity = () => {
    const columns = [
        {
            title: 'Hoạt động',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
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
            dataIndex: 'status',
            key: 'status',
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
                   <Button type={"primary"}>Gửi minh chứng</Button>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: "Hiến máu",
            status: 'Đã gửi minh chứng',
            organization: 'Đại học Bách Khoa',
            location: "Khu F",
            startDate: '20-05-2023',
            endDate: '21-05-2023'
        },
        {
            key: '2',
            status: 'Đã gửi minh chứng',
            name: "Hiến máu",
            organization: 'Đại học Bách Khoa',
            location: "Khu F",
            startDate: '20-05-2023',
            endDate: '21-05-2023'
        },
        {
            key: '3',
            status: 'Đã gửi minh chứng',
            name: "Hiến máu",
            organization: 'Đại học Bách Khoa',
            location: "Khu F",
            startDate: '20-05-2023',
            endDate: '21-05-2023'
        },
        {
            key: '4',
            name: "Hiến máu",
            status: 'Đã gửi minh chứng',
            organization: 'Đại học Bách Khoa',
            location: "Khu F",
            startDate: '20-05-2023',
            endDate: '21-05-2023'
        },
    ];
    return (
        <div>
            <Card title={'Hoạt động cộng đồng cá nhân'}>
                <Table columns={columns} dataSource={data}/>
            </Card>
        </div>
    )
}

export default MyActivity;