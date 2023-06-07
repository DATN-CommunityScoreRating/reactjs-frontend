export const Roles = {
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT',
    ANONYMOUS: 'ANONYMOUS',
};

export const TypeRoles = {
    ifAnyGranted: 'ifAnyGranted',
    ifNotGranted: 'ifNotGranted',
};

export const getRole = () => JSON.parse(localStorage.getItem('user'))?.role || 'ANONYMOUS';

export const ifAnyGranted = (roles) => {
    const role = getRole();
    const exist = roles.some((roleItem) => roleItem === role);
    return exist;
};

export const ifNotGranted = (roles) => {
    const role = getRole();
    const exist = roles.some((roleItem) => roleItem === role);
    return !exist;
};

const Authorization = (props) => {
    if (props.type === TypeRoles.ifAnyGranted) {
        if (ifAnyGranted(props.roles)) return <div>{props.children}</div>;
        return null;
    }
    if (props.type === TypeRoles.ifNotGranted && ifNotGranted(props.roles)) {
        return <div>{props.children}</div>;
    }
    return null;
};

export default Authorization;
