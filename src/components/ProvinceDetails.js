import React, { Fragment, useState } from "react";
import { Table, List, message } from "antd";
import ProvincesApi from "../services/provinces";
import "./ProvinceDetails.css";

export default ({ districts, province = {}, loading }) => {
  const provincesApi = new ProvincesApi();

  const handleClick = district => e => {
    e.preventDefault();
    provincesApi
      .getDistrictsPopulation({
        province_id: province && province.id,
        district_id: district && district.id
      })
      .then(response => {
        message.info(
          `The population of ${district.name} is ${response.population}`,
          5
        );
      })
      .catch(error => {
        message.error(
          `Can't get the population of ${district.name} right now.`
        );
      });
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key"
    },
    {
      title: "District",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <a onClick={handleClick(record)}>{record.name}</a>
    }
  ];
  const tableData = districts.map((district, index) => ({
    key: index,
    id: district.id,
    name: district.name
  }));

  return (
    <Fragment>
      <List size="large" bordered header={<div>Province Details</div>}>
        <List.Item>Name: {province && province.name}</List.Item>
        <List.Item>Population: {province && province.population}</List.Item>
      </List>
      <br />
      <div className="districts-list">
        <h3 style={{ margin: "16px 0" }}>List of districts</h3>
        <Table columns={columns} dataSource={tableData} loading={loading} />
      </div>
      {!!districts.length && (
        <span
          style={{
            color: "tomato",
            fontSize: 11,
            textAlign: "right",
            display: "block",
            margin: "16px 0"
          }}
        >
          *please click on the district name to see its population
        </span>
      )}
    </Fragment>
  );
};
