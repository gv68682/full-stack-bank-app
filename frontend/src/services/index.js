import axios from 'axios'

const token = localStorage.getItem('token')

let baseURL =  process.env.backendurl  //http://localhost:3001'
if (!process.env.backendurl) {
  baseURL = 'https://fullstack-bank-backend.herokuapp.com'
}
let service = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const bankAPI = {
  signup: async (data) => await service.post('/auth/signup', data),
  login: async (data) => await service.post('/auth/login', data, {validateStatus: () => true}),
  allUsers: async () => await service.get('/data/allUsers'),
  oneUser: async (id) => await service.get(`/data/userId?_id=${id}`),
  updateServiceAuth:  () => {
    service =  axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });
  },
  updateUser: async (id, newData) => {
    await service.put(`/data/userId?_id=${id}`, newData);
  },
}

export { bankAPI }
