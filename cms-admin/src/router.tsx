import { Analytics, Dashboard } from "@/page/dashboard"
import LayoutAdmin from "@/page/layout"
import { useRoutes } from "react-router-dom"

export default function useRouteElement() {
  const element = useRoutes([
    {
      path: '/', // Path root của admin
      element: <LayoutAdmin />, // LayoutAdmin chung
      children: [
        { path: '', element: <Dashboard /> }, // Route dashboard
        { path: 'dashboard/analytics', element: <Analytics /> } // Route analytics
        // Bạn có thể thêm các route con khác ở đây
      ]
    }
  ])

  return element
}
