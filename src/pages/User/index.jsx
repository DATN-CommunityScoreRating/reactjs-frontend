import {Button, Select, Table} from "antd";
import './style.css'
import Title from "antd/es/typography/Title";
import {useState} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

const StyleUser = styled.div`
    .user-filter-group {
      margin: 10px 0;
      .select-element {
        margin: 0 10px 0 0;
      }
    }
`

const User = () => {

    const history = useHistory();
    const [faculty, setFaculty] = useState()
    const [clazz1, setClass] = useState()
    const dataSource = [
        {
            key: 1,
            studentId: '102190350',
            username: "102190350",
            fullName: "Lê Khắc Anh Đài",
            className: "19TCLC_Nhat2",
            score: 100,
            action: (
                <>
                    <Button type={"primary"} className={'button-primary-user-table'}>Chỉnh sửa</Button>
                    <Button danger>Xóa</Button>
                </>
            )
        },
        {
            key: 2,
            studentId: '102190350',
            username: "102190350",
            fullName: "Lê Khắc Anh Đài",
            className: "19TCLC_Nhat2",
            score: 100,
            action: (
                <>
                    <Button type={"primary"} className={'button-primary-user-table'}>Chỉnh sửa</Button>
                    <Button danger>Xóa</Button>
                </>
            )
        },
        {
            key: 3,
            studentId: '102190350',
            username: "102190350",
            fullName: "Lê Khắc Anh Đài",
            className: "19TCLC_Nhat2",
            score: 100,
            action: (
                <>
                    <Button type={"primary"} className={'button-primary-user-table'}>Chỉnh sửa</Button>
                    <Button danger>Xóa</Button>
                </>
            )
        },
        {
            key: 4,
            studentId: '102190350',
            username: "102190350",
            fullName: "Lê Khắc Anh Đài",
            className: "19TCLC_Nhat2",
            score: 100,
            action: (
                <>
                    <Button type={"primary"} className={'button-primary-user-table'}>Chỉnh sửa</Button>
                    <Button danger>Xóa</Button>
                </>
            )
        }
    ]

    const colunms = [
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
            title: "Hành động",
            dataIndex: "action",
            key: "action"
        }
    ]

    const faculties = [
        {
            value: -1,
            label: "ALL"
        },
        {
            value: 1,
            label: "Khoa CNTT"
        },
        {
            value: 2,
            label: "Khoa cơ khí"
        },
        {
            value: 3,
            label: "Khoa QLDA"
        }
    ]

    const clazz = [
        {
            value: -1,
            facultyId: -1,
            label: "ALL"
        },
        {
            value: 1,
            facultyId: 1,
            label: "19TCLC_Nhat2"
        },
        {
            value: 2,
            facultyId: 1,
            label: "19TCLC_Nhat1"
        },
        {
            value: 3,
            facultyId: 2,
            label: "19_CK1"
        },
        {
            value: 4,
            facultyId: 2,
            label: "19_CK2"
        },
    ]

    const handleChangeClass = (value) => {
        setClass(value)
    }

    const handleChange = (value) => {
        setFaculty(value)
    }

    return (
        <StyleUser>
            <Title level={3}>Quản lý sinh viên</Title>
            <div className="user-filter-group">
                <Select
                    className='select-element'
                    showSearch
                    style={{width: 160}}
                    value={faculty}
                    placeholder="Chọn khoa"
                    onChange={handleChange}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={faculties}
                    />
                <Select
                    className='select-element'
                    showSearch
                    value={clazz1}
                    style={{width: 160}}
                    placeholder="Chọn lớp"
                    onChange={handleChangeClass}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={clazz.filter(e => e.facultyId === faculty)}
                />
            </div>
            <div className="user-action-group">
                <Button type={"primary"} style={{marginBottom: '10px'}} onClick={e => history.push('add-user')}>Thêm sinh viên</Button>
                <Table dataSource={dataSource} columns={colunms}></Table>
            </div>
        </StyleUser>
    )
}

export default User

