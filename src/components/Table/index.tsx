import { FC } from "react";
import { Col, Empty, Skeleton, Table as AntTable } from "antd";

import "./table.less";

interface ITable {
  data: any[];
  columns: any[];
  onRowClick?: (record: any) => any | void;
  pagination?: any;
  locale?: any;
  isLoading?: boolean;
}

const Table: FC<ITable> = ({
  columns,
  data,
  onRowClick,
  pagination,
  isLoading,
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
        pagination={pagination}
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
    </Col>
  );
};

export default Table;
