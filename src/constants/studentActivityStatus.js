import {AuditOutlined, CheckCircleOutlined, ExclamationCircleOutlined, MailOutlined} from "@ant-design/icons";

const STUDENT_ACTIVITY_STATUS = {
    REGISTERED: {
        status: 'REGISTERED',
        message: 'Đã đăng ký',
        color: 'gold',
        icon: <AuditOutlined />
    },
    SEND_PROOF: {
        status: 'SEND_PROOF',
        message: 'Chưa được xác nhận',
        color: 'green',
        icon: <MailOutlined />
    },
    CONFIRMED: {
        status: 'CONFIRMED',
        message: 'Đã xác nhận',
        color: 'blue',
        icon: <CheckCircleOutlined />
    },
    NOT_ACCEPTED: {
        status: 'NOT_ACCEPTED',
        message: 'Không được chấp nhận',
        color: 'red',
        icon:  <ExclamationCircleOutlined />
    },
}

export default STUDENT_ACTIVITY_STATUS;