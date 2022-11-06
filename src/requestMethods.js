import axios from "axios"

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjZjODgyZDlkY2RjMjMyZDE3NWZiMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2Nzc0NTgyNSwiZXhwIjoxNjY4MDA1MDI1fQ.fIDeZZrBLHksqRbxugUVM-CpOU7qGOBcHJE21ssLw7E"

export const publicRequest = axios.create({
  baseURL: BASE_URL
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {
    token: `Bearer ${TOKEN}`
  }
})