import { FC } from "react";
import { Col, Empty, Pagination, Skeleton, Table as AntTable } from "antd";

import "./table.less";

interface ITable {
  data: any[];
  columns: any[];
  onRowClick?: (record: any) => any | void;
  locale?: any;
  isLoading?: boolean;
  page?: number;
  pagination?: boolean;
  onChangePage?: React.Dispatch<React.SetStateAction<number>>;
  count?: number;
}

const Table: FC<ITable> = ({
  columns,
  data,
  onRowClick,
  pagination = false,
  isLoading,
  page = 1,
  count = 10,
  onChangePage,
}) => {
  return (
    <Col span={24}>
      <AntTable
        onRow={(record: any) => ({
          onClick: e => onRowClick && onRowClick(record),
        })}
        className="table"
        scroll={{ x: 1300 }}
        columns={columns}
        dataSource={isLoading ? [] : data}
        pagination={false}
        rowKey="id"
        locale={{
          emptyText: isLoading ? (
            <>
              {[1, 2, 3, 4].map(x => (
                <Skeleton.Input key={4} size="small" active={true} />
              ))}
            </>
          ) : (
            <Empty />
          ),
        }}
      />
      {data?.length && pagination ? (
        <div className="table__pagination">
          <Pagination
            onChange={onChangePage}
            current={page}
            defaultCurrent={1}
            total={count}
          />
        </div>
      ) : null}
    </Col>
  );
};

export default Table;
