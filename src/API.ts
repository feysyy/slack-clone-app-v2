import axios from "axios";
// import { getHeaders, setHeaders } from "./utils/localStorage";

// // const baseURL = 'http://206.189.91.54/api/v1'

// // async function signIn(email: string, password: string) {
// //   return await api
// //   .post(`${baseURL}/auth/sign_in`, {email: email, password: password})
// //   .then(response => {
// //     return response.data
// //   })
// // }

export const api = axios.create({
  baseURL: 'http://206.189.91.54/api/v1'
})

// export async function signUp(data: {}) {
//   return await api
//   .post('auth', data)
//   .then(response => {
//     console.log(response.data)
//     return response.data
//   })
// }

// export async function signIn(data: {}) {
//   return await api
//   .post('auth/sign_in', data)
//   .then(response => {
//     // response.data.headers = response.headers
//     setHeaders({
//       headers: {
//         'access-token': response.headers['access-token'],
//         client: response.headers.client,
//         expiry: response.headers.expiry,
//         uid: response.headers.uid,
//       }
//     })
//     // console.log(response.data)
//     return response.data
//   })
// }

// export async function sendMessage(data: {}) {
//   return await api
//   .post('messages', data)
//   .then(response => {
//     return response.data
//   })
// }

// export async function allUsers(){
//   // console.log(headers)
//   return await api
//   .get('users', getHeaders())
//   .then(response => {
//     console.log(response.data)
//     return response.data
//   })
// }
