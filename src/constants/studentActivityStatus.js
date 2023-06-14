import {AuditOutlined, CheckCircleOutlined, MailOutlined} from "@ant-design/icons";

const STUDENT_ACTIVITY_STATUS = {
    REGISTERED: {
        status: 'REGISTERED',
        message: 'Đã đăng ký',
        color: 'gold',
        icon: <AuditOutlined />
    },
    SEND_PROOF: {
        status: 'SEND_PROOF',
        message: 'Đã gửi minh chứng',
        color: 'green',
        icon: <MailOutlined />
    },
    CONFIRMED: {
        status: 'CONFIRMED',
        message: 'Đã xác nhận',
        color: 'blue',
        icon: <CheckCircleOutlined />
    },
}

export default STUDENT_ACTIVITY_STATUS;