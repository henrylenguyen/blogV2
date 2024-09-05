import { DataSource } from 'typeorm'
import { join } from 'path'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'BlogV2',
  entities: [join(__dirname, 'modules', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false, // Tắt đồng bộ hóa tự động
  migrationsRun: true // Chạy migration mỗi lần khởi động lại ứng dụng
})
