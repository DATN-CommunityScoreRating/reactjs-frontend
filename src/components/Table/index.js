import { Pagination as PaginationAntd, Table as TableAntd } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TableStyle = styled.div`
    .ant-pagination.ant-table-pagination {
        display: none;
    }
    .pagination {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
`;

const Table = ({ dataSource, columns, totalElements = 300, pageSize = 100 }) => {
    const { page, totalPage } = useTable(totalElements, pageSize);

    return (
        <TableStyle>
            <TableAntd dataSource={dataSource} columns={columns} />
            {totalPage > 0 && (
                <div className="pagination">
                    <Pagination total={totalElements} pageSize={pageSize} />
                </div>
            )}
        </TableStyle>
    );
};

export const useTable = (totalElements, pageSize) => {
    const [page, setPage] = useState(0);
    const totalPage = Math.ceil(totalElements / pageSize);
    useEffect(() => {
        if (totalElements > pageSize) {
        }
    }, [totalElements, pageSize]);

    return {
        page,
        setPage,
        totalPage,
    };
};

export default Table;

const Pagination = ({ pageSize, total }) => {
    return <PaginationAntd pageSize={pageSize} total={total} />;
};
