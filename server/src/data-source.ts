import { join } from 'path'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'BlogV2',
  entities: [join(__dirname, 'modules', '**', '*.entities.{ts,js}')],
  synchronize: false, // Tắt đồng bộ hóa tự động
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsRun: true // Chạy migration mỗi lần khởi động lại ứng dụng,
})
