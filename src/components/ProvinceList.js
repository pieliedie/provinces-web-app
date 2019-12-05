import React from "react";
import { Table, Empty } from "antd";

const ProvinceList = ({ provinces, onProvinceClick }) => {
  const handleClick = id => (e) => {
    e.preventDefault();
    if(onProvinceClick) onProvinceClick(id)
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Province',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <a onClick={handleClick(record.id)}>{record.name}</a>
    },
  ]
  const tableData = provinces && provinces.map((province, index) => ({key: index, id: province.id, name: province.name}));

  return (
    <Table 
      dataSource={tableData}
      columns={columns}
    />
  )
};

export default ProvinceList;
