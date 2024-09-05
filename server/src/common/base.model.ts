class BaseModels {
  id?: string
  name?: string
  description?: string
  status?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
  version?: number
  constructor({
    id,
    name,
    status,
    createdAt,
    updatedAt,
    deletedAt,
    createdBy,
    updatedBy,
    deletedBy,
    version,
    description
  }) {
    if (id) this.id = id
    if (name) this.name = name
    if (status) this.status = status
    if (createdAt) this.createdAt = createdAt
    if (updatedAt) this.updatedAt = updatedAt
    if (deletedAt) this.deletedAt = deletedAt
    if (createdBy) this.createdBy = createdBy
    if (updatedBy) this.updatedBy = updatedBy
    if (deletedBy) this.deletedBy = deletedBy
    if (version) this.version = version
    if (description) this.description = description
  }
}
export default BaseModels
