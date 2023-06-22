import {Button, Card, Col, DatePicker, Input, Row, Select, Space} from "antd";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {DATE_FORMAT} from "../../utils/date";
import styled from "styled-components";
import Editor from "../../components/Editor";
import {SendOutlined} from "@ant-design/icons";
import {getActivityCategory, getSubActivityCategory} from "../../services/activityCategoryService";
import {convertOptions} from "../../utils/helper";
import {sendClearProof} from "../../services/clearProofService";
import {useHistory} from "react-router-dom";
import SITE_MAP from "../../constants/path";

const SendClearProofStyle = styled.div`
  .row-item {
    width: 100%;
    padding: 5px;
    display: inline-flex;
    .date-item,
    .select-item,
    .ant-input-number {
      height: 40px;
      width: 100%;
      .ant-select-selector {
        height: 100%;
        align-items: center;
      }
    }
    @media screen and (min-width: 767px) {
      width: 50% !important;
    }
  }

  .card-content {
    text-align: center;
    margin-top: 10px;
    .ant-card-body {
      padding: 10px;
      .ck .ck-content {
        min-height: 300px;
      }
    }
    .content-editor {
      text-align: left;
    }
  }
  .button-action {
    width: 100%;
    display: flex;
    margin: 20px 0;
    justify-content: center;
  }
`


const SendClearProof = () => {
    const history = useHistory();
    const [clearProof, setClearProof] = useState({
        categoryId: undefined,
        subCategoryId: undefined,
        name: '',
        startDate: '',
        endDate: ''
    })
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        getActivityCategory().then(res => {
            const options = convertOptions(res?.data?.items, 'activityCategoryId', 'name')
            setCategories(options)
        })

        getSubActivityCategory().then(res => {
            const options = convertOptions(res?.data?.items, 'activitySubCategoryId', 'name')
            setSubCategories(options)
        })
    }, [])

    const handleChangeData = (field, data) => {
        if (field === 'categoryId'){
            getSubActivityCategory({
                activityCategoryId: data
            }).then(res => {
                const options = convertOptions(res?.data?.items, 'activitySubCategoryId', 'name')
                setSubCategories(options)
            })
            setClearProof({...clearProof, [field]: data, subCategoryId: undefined})
        } else {
            setClearProof({...clearProof, [field]: data})
        }

    }

    const handleChangeDate = (name, value) => {
        if (value === null) {
            value = dayjs();
        }
        setClearProof({ ...clearProof, [name]: value.format(DATE_FORMAT) });
    }

    const elements = [
        {
            label: 'Tên minh chứng',
            component: (
                <Input
                    value={clearProof.name}
                    onChange={(e) => handleChangeData('name', e.target.value)}
                />
            )
        },
        {
            label: 'Danh mục hoạt động',
            component: (
                <Select
                    value={clearProof.categoryId}
                    className="select-item"
                    placeholder={'Chọn danh mục'}
                    onChange={(e) => handleChangeData('categoryId', e)}
                    options={categories}
                />
            ),
        },
        {
            label: 'Thời gian bắt đầu',
            component: (
                <DatePicker
                    className="date-item"
                    value={clearProof.startDate === '' ? '' : dayjs(clearProof.startDate, DATE_FORMAT)}
                    onChange={(value) => handleChangeDate('startDate', value)}
                />
            ),
            className: 'date-item',
        },
        {
            label: 'Chi tiết danh mục',
            component: (
                <Select
                    value={clearProof.subCategoryId}
                    className="select-item"
                    placeholder={'Chọn chi tiết danh mục'}
                    onChange={(e) => handleChangeData('subCategoryId', e)}
                    options={subCategories}
                />
            ),
        },
        {
            label: 'Thời gian kết thúc',
            component: (
                <DatePicker
                    className="date-item"
                    value={
                        clearProof.endDate === '' ? '' : dayjs(clearProof.endDate, DATE_FORMAT)
                    }
                    onChange={(value) => handleChangeDate('endDate', value)}
                />
            ),
            className: 'date-item',
        },
    ]

    const handleSendClearProof = () => {
        sendClearProof({
            ...clearProof,
            description
        }).then(res => {
            if (res?.success){
                history.push(SITE_MAP.MY_ACTIVITY.LIST)
            } else {
                alert("Có lỗi xảy ra")
            }
        })
    }

    const handleCancel = () => {

    }

    return (
        <SendClearProofStyle>
            <Card className="mb-24" title="Gửi minh chứng">
                {elements.map(({ label, component }, index) => (
                    <Row
                        className="row-item"
                        key={index}
                        gutter={[
                            { xs: 0, sm: 0, md: 28 },
                            { xs: 8, sm: 8, md: 0 },
                        ]}
                    >
                        <Col span={8}>{label}</Col>
                        <Col span={16}>{component}</Col>
                    </Row>
                ))}
                <Card className="card-content" title="Mô tả minh chứng">
                    <div className={'content-editor'}>
                        <Editor onChange={setDescription} />
                    </div>
                </Card>
                <Space className="button-action">
                    <Button type={'primary'} onClick={handleSendClearProof} icon={<SendOutlined/>}>
                        Gửi
                    </Button>
                </Space>
            </Card>
        </SendClearProofStyle>
    )
}

export default SendClearProof;