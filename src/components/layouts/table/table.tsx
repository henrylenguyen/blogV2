'use client'
import { UserData } from '@/components/layouts/table/types'
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  Header,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import React, { useState } from 'react'
import './index.css'
interface TableProps {
  data: any[]
  columns: any[]
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns2 = React.useMemo<ColumnDef<UserData, any>[]>(
    () => [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue()
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        meta: {
          filterVariant: 'range'
        }
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        meta: {
          filterVariant: 'range'
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        meta: {
          filterVariant: 'select'
        }
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        meta: {
          filterVariant: 'range'
        }
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns: columns2,
    state: {
      sorting,
      globalFilter,
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      minSize: 30, // Cập nhật để cho phép cột nhỏ hơn chữ (tối thiểu 30px)
      maxSize: 800
    },
    columnResizeMode: 'onChange',
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    onSortingChange: setSorting
  })


  return (
    <div className='p-2'>
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className=''>
          <div
            {...{
              className: 'divTable',
              style: {
                width: table.getTotalSize()
              }
            }}
          >
            <div className='thead'>
              {table.getHeaderGroups().map((headerGroup, index) => (
                <div
                  key={headerGroup.id}
                  {...{
                    className: 'tr'
                  }}
                >
                  {headerGroup.headers.map((header) => (
                    <div
                      key={header.id}
                      {...{
                        className: 'th',
                        style: {
                          width: header.getSize()
                        }
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${table.options.columnResizeDirection} ${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              {...{
                className: 'tbody'
              }}
            >
              {table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  {...{
                    className: 'tr'
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      key={cell.id}
                      {...{
                        className: 'td',
                        style: {
                          width: cell.column.getSize()
                        }
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='h-4' />
        <div className='text-xl'>{'<div/> (absolute positioning)'}</div>
      </div>
      <div className='h-4' />
      <pre>
        {JSON.stringify(
          {
            columnSizing: table.getState().columnSizing,
            columnSizingInfo: table.getState().columnSizingInfo
          },
          null,
          2
        )}
      </pre>
    </div>
  )
}

export default Table

function Filter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant } = column.columnDef.meta ?? {}

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(
    () => (filterVariant === 'range' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000)),
    [column, filterVariant]
  )

  return filterVariant === 'range' ? (
    <div>
      <div className='flex space-x-2'>
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] !== undefined ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
          }`}
          className='w-24 border shadow rounded'
        />
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
          className='w-24 border shadow rounded'
        />
      </div>
      <div className='h-1' />
    </div>
  ) : filterVariant === 'select' ? (
    <select onChange={(e) => column.setFilterValue(e.target.value)} value={columnFilterValue?.toString()}>
      <option value=''>All</option>
      {sortedUniqueValues.map((value) => (
        //dynamically generated select options from faceted values feature
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  ) : (
    <>
      {/* Autocomplete suggestions from faceted values feature */}
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className='w-36 border shadow rounded'
        list={column.id + 'list'}
      />
      <div className='h-1' />
    </>
  )
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}
