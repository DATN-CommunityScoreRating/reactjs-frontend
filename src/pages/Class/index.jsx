import { Button, Select, Space, Table } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { getFaculties } from "../../services/facultyService";
import { convertOptions } from "../../utils/helper";
import { getClasses } from "../../services/classService";
import { getCourses } from "../../services/courseService";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ActionStyle = styled.div`
    display: flex;
    gap: 10px;
`;

const ManageClass = () => {
    const history = useHistory();
    const [faculties, setFaculties] = useState();
    const [classData, setClassData] = useState();
    const [courseOptions, setCourseOptions] = useState();
    const [course, setCourse] = useState();

    useEffect(() => {
        getFaculties().then((data) => {
            const options = convertOptions(
                data?.data?.items,
                "facultyId",
                "facultyName"
            );
            setFaculties(options);
        });

        getClasses().then((data) => {
            setClassData(data);
        });
        getCourses().then((data) => {
            const options = convertOptions(
                data?.items,
                "courseId",
                "courseName"
            );
            setCourseOptions(options);
        });
    }, []);

    const columns = [
        {
            title: "Lớp",
            dataIndex: "className",
            key: "className",
        },
        {
            title: "Khoa",
            dataIndex: "faculty",
            key: "faculty",
        },
        {
            title: "Khóa",
            dataIndex: "course",
            key: "course",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (_, record) => {
                return (
                    <ActionStyle>
                        <Button
                            onClick={() =>
                                history.push(`users?classId=${record.classId}`)
                            }
                        >
                            Xem sinh viên
                        </Button>
                        <Button type={"primary"}>Cập nhật lớp</Button>
                        <Button type={"default"} danger>
                            Xóa
                        </Button>
                    </ActionStyle>
                );
            },
        },
    ];
    return (
        <Space
            className={"manage-class"}
            direction={"vertical"}
            style={{ width: "100%" }}
        >
            <Space>
                <Select
                    showSearch
                    style={{ width: 160 }}
                    placeholder="Chọn khoa"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={faculties}
                />
                <Select
                    showSearch
                    style={{ width: 160 }}
                    placeholder="Chọn khóa"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={courseOptions}
                />
                <button className={"filter-button"}>Lọc</button>
            </Space>
            <Button type={"primary"}>Thêm lớp</Button>
            <Table dataSource={classData?.items || []} columns={columns} />
        </Space>
    );
};

export default ManageClass;
