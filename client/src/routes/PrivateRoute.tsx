import { redirect } from "react-router-dom"

const PrivateRoute = ({ children }: { children: any }) => {
  const isAuth = true
  return isAuth ? children : redirect('/login')
}

export default PrivateRoute