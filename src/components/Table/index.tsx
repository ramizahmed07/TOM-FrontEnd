import { FC } from "react";
import { Col, Table as AntTable } from "antd";

import "./table.less";

interface ITable {
  data: any[];
  columns: any[];
  onRowClick?: (record: any) => any | void;
  pagination?: any;
  locale?: any;
}

const Table: FC<ITable> = ({
  columns,
  data,
  onRowClick,
  pagination = true,
  locale,
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
        locale={locale}
      />
    </Col>
  );
};

export default Table;
