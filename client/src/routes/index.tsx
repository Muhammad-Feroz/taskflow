import { Suspense, lazy } from "react"
import { Outlet, createBrowserRouter, redirect } from "react-router-dom"
import Loader from "../components/Loader"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ViewTask from "../modules/TaskBoard/pages/View"
import NewTask from "../modules/TaskBoard/pages/New"

const Auth = lazy(() => import('../modules/Auth'))
const NotFound = lazy(() => import('../modules/NotFound'))
const Layout = lazy(() => import('../components/Layout'))
const Dashboard = lazy(() => import('../modules/Dashboard'))
const Taskboard = lazy(() => import('../modules/TaskBoard'))
const Notes = lazy(() => import('../modules/Notes'))
const Calendar = lazy(() => import('../modules/Calender'))
const Messages = lazy(() => import('../modules/Messages'))

const PrivateRoute = ({ children }: { children: any }) => {
  const isAuth = true
  return isAuth ? children : redirect('/login')
}

const SuspenseComponent = ({ children }: { children: any }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

const token = localStorage.getItem('token') || true;

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <SuspenseComponent><PrivateRoute><Layout /></PrivateRoute></SuspenseComponent>,
    children: [
      { path: 'dashboard', element: <SuspenseComponent><Dashboard /></SuspenseComponent>, index: true },
      { 
        path: 'task-board', 
        element: <SuspenseComponent><DndProvider backend={HTML5Backend}><Outlet /></DndProvider></SuspenseComponent>,
        children: [
          { path: '', element: <SuspenseComponent><Taskboard /></SuspenseComponent> },
          { path: ':taskId', element: <SuspenseComponent><ViewTask /></SuspenseComponent>},
          { path: 'new', element: <SuspenseComponent><NewTask /></SuspenseComponent> }
        ]
      },
      { 
        path: 'notes', 
        element: <SuspenseComponent><Outlet /></SuspenseComponent>,
        children: [
          { path: '', element: <SuspenseComponent><Notes /></SuspenseComponent> },
          { path: ':id', element: <SuspenseComponent><div>View Note</div></SuspenseComponent>},
          { path: 'new', element: <SuspenseComponent><div>New Note</div></SuspenseComponent> },
        ]
      },
      { path: 'calendar', element: <SuspenseComponent><Calendar /></SuspenseComponent>},
      { path: 'messages', element: <SuspenseComponent><Messages /></SuspenseComponent>},
      { path: 'settings', element: <SuspenseComponent><div>Settings</div></SuspenseComponent>}
    ]
  },
  {
    path: '/login',
    element: <SuspenseComponent><Auth isSignIn={true} /></SuspenseComponent>,
    loader: () => token ? redirect('/dashboard') : null
  },
  {
    path: '/register',
    element: <SuspenseComponent><Auth isSignIn={false} /></SuspenseComponent>,
    loader: () => token ? redirect('/dashboard') : null
  },
  {
    path: '*',
    element: <NotFound />
  },
])