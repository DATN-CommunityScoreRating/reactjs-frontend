const SITE_MAP = {
    LOGIN: '/login',
    REGISTER: '/register',
    MANAGER_CLASS: {
        LIST: '/classes',
    },
    MANAGER_USER: {
        LIST: '/users',
        CREATE: 'add-user',
    },
    PROFILE: '/profile',
    MANAGER_ACTIVITY: {
        LIST: '/activities',
        CREATE: '/add-activity',
        USER: '/activities/:activityId/users',
        DETAIL: '/activities/:activityId'
    },
    MY_ACTIVITY: {
        LIST: "/my-activities"
    },
    SEND_PROOF: {
        SEND: "/send-proof"
    }
};

export default SITE_MAP;
