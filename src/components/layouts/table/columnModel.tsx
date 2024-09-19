import { ColumnModel } from "@/components/layouts/table";

// ColumnModel.ts
export const columns: ColumnModel[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    filterable: true
  },
  {
    key: 'age',
    label: 'Age',
    sortable: true,
    filterable: true,
    filterType: 'range' // Thêm loại bộ lọc phạm vi
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    filterable: true
  },
  {
    key: 'joinDate',
    label: 'Join Date',
    sortable: true,
    filterable: true,
    filterType: 'date' // Bộ lọc theo ngày
  },
   {
    key: 'action', 
    label: '', 
    render: (row) => (
      <div className="flex space-x-2">
        <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    ),
    hideable: false,
  },
]
