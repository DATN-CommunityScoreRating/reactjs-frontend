import moment from 'moment';

export const DATE_FORMAT = 'MM/DD/YYYY';

export const getDate = (value, format = DATE_FORMAT) => {
    return moment(value).format(format);
};
