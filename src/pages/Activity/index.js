import { Card, Table, Button, Avatar, Typography } from 'antd';

// Images
import face from '../../assets/images/face-1.jpg';
import face2 from '../../assets/images/face-2.jpg';
import face3 from '../../assets/images/face-3.jpg';
import face4 from '../../assets/images/face-4.jpg';
import face5 from '../../assets/images/face-5.jpeg';
import face6 from '../../assets/images/face-6.jpeg';
import { useHistory } from 'react-router-dom';
import SITE_MAP from '../../constants/path';

const { Title } = Typography;

const columns = [
    {
        title: 'AUTHOR',
        dataIndex: 'name',
        key: 'name',
        width: '32%',
    },
    {
        title: 'FUNCTION',
        dataIndex: 'function',
        key: 'function',
    },

    {
        title: 'STATUS',
        key: 'status',
        dataIndex: 'status',
    },
    {
        title: 'EMPLOYED',
        key: 'employed',
        dataIndex: 'employed',
    },
];

const data = [
    {
        key: '1',
        name: (
            <>
                <Avatar.Group>
                    <Avatar className="shape-avatar" shape="square" size={40} src={face2}></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Michael John</Title>
                        <p>michael@mail.com</p>
                    </div>
                </Avatar.Group>{' '}
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Manager</Title>
                    <p>Organization</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button type="primary" className="tag-primary">
                    ONLINE
                </Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <span>23/04/18</span>
                    <a href="#pablo">Edit</a>
                </div>
            </>
        ),
    },

    {
        key: '2',
        name: (
            <>
                <Avatar.Group>
                    <Avatar className="shape-avatar" shape="square" size={40} src={face3}></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Alexa Liras</Title>
                        <p>alexa@mail.com</p>
                    </div>
                </Avatar.Group>{' '}
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Programator</Title>
                    <p>Developer</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button className="tag-badge">ONLINE</Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <span>23/12/20</span>
                    <a href="#pablo">Edit</a>
                </div>
            </>
        ),
    },

    {
        key: '3',
        name: (
            <>
                <Avatar.Group>
                    <Avatar className="shape-avatar" shape="square" size={40} src={face}></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Laure Perrier</Title>
                        <p>laure@mail.com</p>
                    </div>
                </Avatar.Group>{' '}
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Executive</Title>
                    <p>Projects</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button type="primary" className="tag-primary">
                    ONLINE
                </Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <span>03/04/21</span>
                    <a href="#pablo">Edit</a>
                </div>
            </>
        ),
    },
    {
        key: '4',
        name: (
            <>
                <Avatar.Group>
                    <Avatar className="shape-avatar" shape="square" size={40} src={face4}></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Miriam Eric</Title>
                        <p>miriam@mail.com</p>
                    </div>
                </Avatar.Group>{' '}
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Marketing</Title>
                    <p>Organization</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button type="primary" className="tag-primary">
                    ONLINE
                </Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <span>03/04/21</span>
                    <a href="#pablo">Edit</a>
                </div>
            </>
        ),
    },
    {
        key: '5',
        name: (
            <>
                <Avatar.Group>
                    <Avatar className="shape-avatar" shape="square" size={40} src={face5}></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>Richard Gran</Title>
                        <p>richard@mail.com</p>
                    </div>
                </Avatar.Group>{' '}
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Manager</Title>
                    <p>Organization</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button className="tag-badge">ONLINE</Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <span>23/03/20</span>
                    <a href="#pablo">Edit</a>
                </div>
            </>
        ),
    },

    {
        key: '6',
        name: (
            <>
                <Avatar.Group>
                    <Avatar className="shape-avatar" shape="square" size={40} src={face6}></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>John Levi</Title>
                        <p>john@mail.com</p>
                    </div>
                </Avatar.Group>{' '}
            </>
        ),
        function: (
            <>
                <div className="author-info">
                    <Title level={5}>Tester</Title>
                    <p>Developer</p>
                </div>
            </>
        ),

        status: (
            <>
                <Button className="tag-badge">ONLINE</Button>
            </>
        ),
        employed: (
            <>
                <div className="ant-employed">
                    <span>14/04/17</span>
                    <a href="#pablo">Edit</a>
                </div>
            </>
        ),
    },
];

function Activity() {
    const history = useHistory();
    const handleAddActivity = () => {
        history.push(SITE_MAP.MANAGER_ACTIVITY.CREATE);
    };

    return (
        <div className="tabled">
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