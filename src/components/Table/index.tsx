import { FC } from "react";
import { Col, Table as AntTable } from "antd";

import "./table.less";

interface TableProps {
  data: any[];
  columns: any[];
  onRowClick?: (record: any) => any | void;
}

const Table: FC<TableProps> = ({ columns, data, onRowClick }) => {
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
        rowKey="id"
      />
    </Col>
  );
};

export default Table;
