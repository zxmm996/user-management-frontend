import axios from './../request'

const getExample = params => {
  return axios({
    url: '/example/get',
    method: 'get',
    params
  })
}

const postExample = data => {
  return axios({
    url: '/example/post',
    method: 'post',
    data
  })
}

export default {
  getExample,
  postExample
}