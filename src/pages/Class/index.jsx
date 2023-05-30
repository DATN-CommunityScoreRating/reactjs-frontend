import { Button, Select, Space, Table } from 'antd';
import './style.css';
import { useEffect, useState } from 'react';
import { getFaculties } from '../../services/facultyService';
import { convertOptions } from '../../utils/helper';
import { getClasses } from '../../services/classService';
import { getCourses } from '../../services/courseService';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const ActionStyle = styled.div`
    display: flex;
    gap: 10px;
`;

const ManageClass = () => {
    const history = useHistory();
    const [faculties, setFaculties] = useState();
    const [classData, setClassData] = useState([]);
    const [courseOptions, setCourseOptions] = useState();
    const [courseSelected, setCourseSelected] = useState();
    const [facultySelected, setFacultySelected] = useState();

    useEffect(() => {
        getFaculties().then((data) => {
            const options = convertOptions(data?.data?.items, 'facultyId', 'facultyName');
            setFaculties(options);
        });

        getClasses().then((data) => {
            setClassData(data?.items.map(({classId, className, facultyId, courseName, facultyName}) => (
                {
                    classId,
                    className,
                    facultyId,
                    course: courseName,
                    faculty: facultyName
                }
            )));
        });
        getCourses().then((data) => {
            const options = convertOptions(data?.items, 'courseId', 'courseName');
            setCourseOptions(options);
        });
    }, []);

    const columns = [
        {
            title: 'Lớp',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: 'Khoa',
            dataIndex: 'faculty',
            key: 'faculty',
        },
        {
            title: 'Khóa',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <ActionStyle>
                        <Button onClick={() => history.push(`users?classId=${record.classId}&facultyId=${record.facultyId}`)}>
                            Xem sinh viên
                        </Button>
                        <Button type={'primary'}>Cập nhật lớp</Button>
                        <Button type={'default'} danger>
                            Xóa
                        </Button>
                    </ActionStyle>
                );
            },
        },
    ];

    const handleChangeFaculty = (value) => {
        setFacultySelected(value);
    }

    const handleChangeCourse = (value) => {
        setCourseSelected(value)
    }

    const handleFilter = () => {
        getClasses({
            facultyId: facultySelected,
            courseId: courseSelected
        }).then((data) => {
            setClassData(data?.items.map(({classId, className, facultyId, courseName, facultyName}) => (
                {
                    classId,
                    className,
                    facultyId,
                    course: courseName,
                    faculty: facultyName
                }
            )));
        });
    }

    return (
        <Space className={'manage-class'} direction={'vertical'} style={{ width: '100%' }}>
            <Space>
                <Select
                    showSearch
                    style={{ width: 240 }}
                    value={facultySelected}
                    onChange={handleChangeFaculty}
                    placeholder="Chọn khoa"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={faculties}
                />
                <Select
                    showSearch
                    style={{ width: 160 }}
                    placeholder="Chọn khóa"
                    value={courseSelected}
                    onChange={handleChangeCourse}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={courseOptions}
                />
                <Button type={"primary"} style={{width:"60px"}} onClick={handleFilter}>Lọc</Button>
            </Space>
            <Button type={'primary'}>Thêm lớp</Button>
            <Table dataSource={classData} columns={columns} />
        </Space>
    );
};

export default ManageClass;
