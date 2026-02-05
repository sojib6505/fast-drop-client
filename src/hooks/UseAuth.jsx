import { use } from "react"
import AuthContext from "../contexts/AuthContext/AuthContext"

export default function UseAuth() {
    const authInfo = use(AuthContext)
  return  authInfo
}
