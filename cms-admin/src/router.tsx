import { Analytics, Dashboard } from "@/page/dashboard"
import LayoutAdmin from "@/page/layout"
import ListRepositoryPage from "@/page/repositories/list-repositories/page"
import { useRoutes } from "react-router-dom"

export default function useRouteElement() {
  const element = useRoutes([
    {
      path: '/', // Path root của admin
      element: <LayoutAdmin />, // LayoutAdmin chung
      children: [
        { path: '', element: <Dashboard /> }, // Route dashboard
        { path: 'dashboard/analytics', element: <Analytics /> }, // Route analytics
        {path: 'repositories/list-repositories', element: <ListRepositoryPage/>}
      ]
    }
  ])

  return element
}
