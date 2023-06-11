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
};

export default SITE_MAP;
