import { BaseEntity, Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm'

/**
 * BaseEntities là abstract class chứa các trường cơ bản của một bảng trong database bao gồm:
 * - id: string
 * - createdAt: Date
 * - updatedAt: Date
 * - deletedAt: Date
 * - createdBy: string
 * - updatedBy: string
 * - deletedBy: string
 * - isArchived: boolean
 * - version: number
 */
export abstract class BaseEntities extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string
  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
  @Column({ name: 'updated_at', type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date
  @Column({ name: 'created_by', type: 'varchar', length: 255, nullable: false })
  createdBy: string
  @Column({ name: 'updated_by', type: 'varchar', length: 255, nullable: true })
  updatedBy: string
  @Column({ name: 'deleted_by', type: 'varchar', length: 255, nullable: true })
  deletedBy: string
  @Column({ name: 'version', type: 'decimal', precision: 3, scale: 1, nullable: false, default: 0.1 })
  version: number
  @Column({ name: 'status', type: 'tinyint', nullable: false, default: 1 })
  status: number
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string
  @Column({ name: 'description', type: 'varchar', length: 255, nullable: false })
  description: string
}
