import { Button, Select, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import "./style.css";
import { useEffect, useState } from "react";
import { getFaculties } from "../../services/facultyService";

const ManageClass = () => {
    const [faculties, setFaculties] = useState();
    console.log("🚀 ~ file: index.jsx:9 ~ ManageClass ~ faculties:", faculties);
    const [course, setCourse] = useState();

    const convertOptions = (data, idField, valueField) => {
        return (data || []).map((item) => ({
            value: item[idField],
            label: item[valueField],
        }));
    };
    useEffect(() => {
        getFaculties().then((data) => {
            const options = convertOptions(
                data?.data?.items,
                "facultyId",
                "facultyName"
            );
            setFaculties(options);
        });
    }, []);
    const datas = [
        {
            className: "19TCLC_Nhat1",
            faculty: "CNTT",
            course: "Khóa 19",
            numOfStudent: 20,
        },
        {
            className: "19TCLC_Nhat2",
            faculty: "CNTT",
            course: "Khóa 19",
            numOfStudent: 35,
        },
        {
            className: "18H1",
            faculty: "Hóa",
            course: "Khóa 18",
            numOfStudent: 30,
        },
    ];

    const courses = [
        {
            value: -1,
            label: "Tất cả",
        },
        {
            value: 1,
            label: "Khóa 19",
        },
        {
            value: -1,
            label: "Khóa 20",
        },
        {
            value: -1,
            label: "Khóa 21",
        },
        {
            value: -1,
            label: "Khóa 22",
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
                    options={courses}
                />
                <button className={"filter-button"}>Lọc</button>
            </Space>
            <Button type={"primary"}>Thêm lớp</Button>
            <Table dataSource={datas}>
                <Column
                    title={"Lớp"}
                    dataIndex={"className"}
                    key={"className"}
                />
                <Column title={"Khoa"} dataIndex={"faculty"} key={"faculty"} />
                <Column title={"Khóa"} dataIndex={"course"} key={"course"} />
                <Column
                    title={"Hành động"}
                    dataIndex={"action"}
                    key={"action"}
                    render={() => (
                        <>
                            <Space>
                                <Button>Xem sinh viên</Button>
                                <Button type={"primary"}>Cập nhật lớp</Button>
                                <Button type={"default"} danger>
                                    Xóa
                                </Button>
                            </Space>
                        </>
                    )}
                />
            </Table>
        </Space>
    );
};

export default ManageClass;
