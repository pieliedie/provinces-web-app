import Api from './Api'
import { ENDPOINTS } from '../constants'

export default class {
  constructor(){
    this.api = new Api()
  }

  getProvinces = () => this.api.getData({
    path: ENDPOINTS.GET_PROVINCES
  })

  getProvincePopulation = provinceId => this.api.getData({
    path: ENDPOINTS.GET_PROVINCE_POPULATION,
    params: {
      province_id: provinceId
    }
  })

  getDistricts = (province_id) => this.api.getData({
    path: ENDPOINTS.GET_DISTRICTS,
    params: {
      province_id
    }
  })

  getDistrictsPopulation = ({province_id, district_id}) => this.api.getData({
    path: ENDPOINTS.GET_DISTRICT_POPULATION,
    params: {
      province_id,
      district_id
    }
  })
}