export function setAccount(data: any) {
  localStorage.setItem('user', JSON.stringify(data));
}

export function getAccount() {
  const item = localStorage.getItem('user')
  return item ? JSON.parse(item) : null
}

export function removeAccount() {
  localStorage.removeItem('user')
}

export function setHeaders(headers: any) {
  localStorage.setItem('headers', JSON.stringify(headers));
}

export function getHeaders() {
  const headers = localStorage.getItem('headers')
  return headers ? JSON.parse(headers) : null
}

export function removeHeaders() {
  localStorage.removeItem('headers')
}

export function setListOfUser(email: string, users: any[]) {
  localStorage.setItem(email, JSON.stringify(users))
}

export function getListOfUser(email: string){
  const list = localStorage.getItem(email)
  return list ? JSON.parse(list) : []
}

export function setReceiver(receiver: any) {
  localStorage.setItem("receiver", JSON.stringify(receiver))
}

export function getReceiver() {
  const receiver = localStorage.getItem('receiver') 
  return receiver ? JSON.parse(receiver) : null
}

export function removeReceiver() {
  localStorage.removeItem('receiver')
}