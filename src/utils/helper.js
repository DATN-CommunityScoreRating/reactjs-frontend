export const convertOptions = (data, idField, valueField, ...extraField) => {
    return (data || []).map((item) => {
        const extra = extraField?.reduce((acc, field) => {
            acc[field] = item[field];
            return acc;
        }, {});
        return {
            value: item[idField],
            label: item[valueField],
            ...(extraField && extra && { ...extra }),
        };
    });
};

export const getDefaultOption = (label = '', value = -1) => ({
    value,
    label,
});

export const getSearchParameters = () => {
    const paramStr = window.location.search.substr(1);
    return paramStr !== null && paramStr !== '' ? transformToAssocArray(paramStr) : {};
};

const transformToAssocArray = (paramStr) => {
    const params = {};
    const arr = paramStr.split('&');
    arr.forEach((item) => {
        const temp = item.split('=');
        params[temp[0]] = temp[1];
    });
    return params;
};
