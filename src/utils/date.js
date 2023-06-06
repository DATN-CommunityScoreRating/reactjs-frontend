import moment from 'moment';

export const DATE_FORMAT = 'DD-MM-YYYY';

export const getDate = (value, format = DATE_FORMAT) => {
    return moment(value).format(format);
};
