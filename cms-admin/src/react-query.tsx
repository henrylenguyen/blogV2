import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider, QueryCache, QueryClientConfig } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Cấu hình mặc định cho QueryClient
const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Dữ liệu sẽ cũ sau 5 phút
      gcTime: 1000 * 60 * 10, // Dữ liệu sẽ bị xóa sau 10 phút nếu không dùng
      retry: 2, // Số lần thử lại nếu fetch thất bại
      refetchOnWindowFocus: false // Không refetch lại khi người dùng focus vào tab
    },
    mutations: {
      retry: 2 // Số lần thử lại nếu mutate thất bại
    }
  }
}

// Tạo QueryClient với cấu hình mặc định
const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  ...queryConfig
})

// Wrapper component để dùng QueryClientProvider trong toàn bộ ứng dụng
interface ReactQueryProviderProps {
  children: ReactNode
}

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} /> {/* Tích hợp React Query DevTools */}
    </QueryClientProvider>
  )
}
