import { FC } from "react";
import { Col, Table as AntTable, TableProps } from "antd";

import "./table.less";

interface ITable {
  data: any[];
  columns: any[];
  onRowClick?: (record: any) => any | void;
}

const Table: FC<ITable & TableProps<any>> = ({
  columns,
  data,
  onRowClick,
  pagination,
}) => {
  return (
    <Col span={24}>
      <AntTable
        onRow={(record: any) => ({
          onClick: () => onRowClick && onRowClick(record),
        })}
        className="table"
        scroll={{ x: 1300 }}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        rowKey="id"
      />
    </Col>
  );
};

export default Table;
