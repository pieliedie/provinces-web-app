import React, { Fragment, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ProvinceList from "./ProvinceList";
import ProvincesApi from "../services/provinces";
import ProvinceDetails from "./ProvinceDetails";
import "./ProvincePage.css";
import { message, Spin } from "antd";

export default () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [loading, setloading] = useState(true);
  const [loadingDistricts, setloadingDistricts] = useState(false);
  const provincesApi = new ProvincesApi();

  useEffect(() => {
    provincesApi
      .getProvinces()
      .then(provincesResponse => {
        setloading(false);
        setProvinces(provincesResponse);
      })
      .catch(err => {
        console.log(err);
        message.error(`There was an error when fetching provinces data`);
      });
  }, []);

  const handleProvinceClick = id => {
    setloadingDistricts(true);
    provincesApi
      .getDistricts(id)
      .then(districtsResponse => {
        setDistricts(districtsResponse);
        provincesApi
          .getProvincePopulation(id)
          .then(provincePopulationRes => {
            const province = provinces.find(p => p.id === id);
            const population =
              provincePopulationRes && provincePopulationRes.population;
            setProvince({ ...province, population });
            setloadingDistricts(false);
          })
          .catch(error => {
            message.error(`There was an error when fetching districts data`);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="provinces-list">
        <h2>List of provinces</h2>
        {loading ? (
          <div className="spinner">
            <Spin />
          </div>
        ) : (
          <ProvinceList
            provinces={provinces}
            onProvinceClick={handleProvinceClick}
          />
        )}
      </div>
      <div className="province-details">
        <ProvinceDetails districts={districts} province={province} loading={loadingDistricts} />
      </div>
    </div>
  );
};
