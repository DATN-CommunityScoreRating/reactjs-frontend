import { Button, Select, Table } from 'antd';
import './style.css';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { getFaculties } from '../../services/facultyService';
import { convertOptions, getSearchParameters } from '../../utils/helper';
import { getClasses } from '../../services/classService';
import { getUsers } from '../../services/userService';

const StyleUser = styled.div`
    .user-filter-group {
        margin: 10px 0;
        .select-element {
            margin: 0 10px 0 0;
        }
    }
`;

const User = () => {
    const { classId: classIdParam } = getSearchParameters();
    const history = useHistory();
    const [faculty, setFaculty] = useState();
    const [facultyOptions, setFacultyOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [userData, setUserData] = useState();
    const [clazz1, setClass] = useState();
    const [classId, setClassId] = useState(0);

    useEffect(() => {
        getFaculties().then((data) => {
            const options = convertOptions(data?.data?.items, 'facultyId', 'facultyName');
            setFacultyOptions(options);
        });
        getClasses().then((data) => {
            const options = convertOptions(data?.items, 'classId', 'className', 'facultyId');
            setClassOptions(options);
        });
    }, []);


    useEffect(() => {
        if ((classId !== 0 && classIdParam) || !classIdParam) {
            const params = { classId };
            getUsers(params).then((data) => {
                setUserData(data);
            });
        }
    }, [classId, classIdParam]);

    useEffect(() => {
        if (classIdParam && Number(classIdParam)) setClassId(classIdParam);
    }, [classIdParam]);

    const columns = [
        {
            title: 'MSSV',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Tên',
            dataIndex: 'fullName',
            key: 'fullName',
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
                        <Button type={'primary'} className={'button-primary-user-table'}>
                            Chỉnh sửa
                        </Button>
                        <Button danger>Xóa</Button>
                    </>
                );
            },
        },
    ];

    const handleChangeClass = (value) => {
        setClass(value);
    };

    const handleChange = (value) => {
        setFaculty(value);
        getClasses({
            facultyId: value
        }).then((data) => {
            const options = convertOptions(data?.items, 'classId', 'className', 'facultyId');
            setClassOptions(options);
        });
    };

    const handleFilter = () => {
        getUsers({
            classId: clazz1,
            facultyId: faculty
        }).then((data) => {
            setUserData(data);
        });
    }

    return (
        <StyleUser>
            <Title level={3}>Quản lý sinh viên</Title>
            <div className="user-filter-group">
                <Select
                    className="select-element"
                    showSearch
                    style={{ width: 240 }}
                    value={faculty}
                    placeholder={`Chọn khoa`}
                    onChange={handleChange}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={facultyOptions}
                />
                <Select
                    className="select-element"
                    showSearch
                    value={clazz1}
                    style={{ width: 160 }}
                    placeholder="Chọn lớp"
                    onChange={handleChangeClass}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={classOptions?.filter((e) => e.facultyId === faculty) || []}
                />
                <Button type={"primary"} style={{width:"60px"}} onClick={handleFilter}>Lọc</Button>
            </div>
            <div className="user-action-group">
                <Button
                    type={'primary'}
                    style={{ marginBottom: '10px' }}
                    onClick={(e) => history.push('add-user')}
                >
                    Thêm sinh viên
                </Button>
                <Table dataSource={userData?.items || []} columns={columns}></Table>
            </div>
        </StyleUser>
    );
};

export default User;
