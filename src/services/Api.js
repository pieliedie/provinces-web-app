import ky from 'ky'
import querystring from 'query-string'

export default class {
  constructor() {
    this.baseUrl = process.env.REACT_APP_BASE_URL
  }

  makeRequest = ({ method, path, data }) => {
    const options = {
      method,
      body: data ? {json : data} : null,
      mode: 'cors',
    }
    return ky(`${this.baseUrl}${path}`, options).json()
  }

  getData = ({path, params = {}}) => {
    const paramsString = querystring.stringify(params)
    const fullPath = path + (paramsString === '' ? '' : `?${paramsString}`)
    return this.makeRequest({method: 'GET', path: fullPath})
  }
}