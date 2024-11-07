import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Search from '@/components/ui/search'
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowDownZA,
  ArrowUpNarrowWide,
  Filter,
  X
} from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IMultiFilterProps {
  icon?: React.ReactNode
  triggerClassName?: string
  isSort?: boolean
  isSearch?: boolean
  filterOptions?: {
    value: string
    label: string
    icon?: React.ReactNode
  }[]
  sortType?: 'text' | 'date' | 'number'
  onSearchChange?: (value: string) => void
  onSortChange?: (value: string | null) => void
  onFilterChange?: (value: string | null) => void
}
const MultiFilter: React.FunctionComponent<IMultiFilterProps> = ({
  sortType,
  onSortChange,
  isSort,
  isSearch,
  filterOptions,
  onFilterChange,
  onSearchChange
}) => {
  const [sortValue, setSortValue] = useState<{
    id: number | null
    checked: boolean
  }>({
    id: null,
    checked: false
  })
  const [filterValue, setFilterValue] = useState<{
    id: number | null
    checked: boolean
  }>({
    id: null,
    checked: false
  })
  const [searchValue, setSearchValue] = useState<string>('')
  const [open, setOpen] = useState(false)
  let sortOptions: { value: string; label: string; icon: React.ReactNode }[] = []
  const { t } = useTranslation()
  switch (sortType) {
    case 'text':
      sortOptions = [
        { label: t('a-z'), value: 'asc', icon: <ArrowDownAZ /> },
        { label: t('z-a'), value: 'desc', icon: <ArrowDownZA /> }
      ]
      break
    case 'number':
      sortOptions = [
        { label: t('low-high'), value: 'asc', icon: <ArrowDown01 /> },
        { label: t('high-low'), value: 'desc', icon: <ArrowDown10 /> }
      ]
      break
    case 'date':
      sortOptions = [
        { label: t('newest-oldest'), value: 'asc', icon: <ArrowDownWideNarrow /> },
        { label: t('oldest-newest'), value: 'desc', icon: <ArrowUpNarrowWide /> }
      ]
      break
    default:
      sortOptions = [
        { label: t('a-z'), value: 'asc', icon: <ArrowDownAZ /> },
        { label: t('z-a'), value: 'desc', icon: <ArrowDownZA /> }
      ]
  }
  // Sắp xếp dữ liệu
  const handleSortChange = (value: { checked: boolean; value: string; id: number }) => {
    if (onSortChange) {
      if (value.checked) {
        onSortChange(value.value)
        setSortValue({
          id: value.id,
          checked: value.checked
        })
      } else {
        onSortChange(null)
        setSortValue({
          id: null,
          checked: false
        })
      }
    }
  }
  // Lọc dữ liệu
  const handleFilterChange = (value: { checked: boolean; value: string; id: number }) => {
    if (onFilterChange) {
      if (value.checked) {
        onFilterChange(value.value)
        setFilterValue({
          id: value.id,
          checked: value.checked
        })
      } else {
        onFilterChange('')
        setFilterValue({
          id: null,
          checked: false
        })
      }
    }
  }

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value)
    }
  }
  return (
    <div className='flex items-center gap-2'>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className='flex h-full w-[18px] flex-shrink-0 items-center justify-center border-none outline-none'>
            <Filter className='h-[18px] w-[18px] cursor-pointer' onClick={() => setOpen(true)} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[300px]'>
          <DropdownMenuGroup className='flex flex-col gap-3 py-3 text-[16px]'>
            {isSearch && (
              <DropdownMenuSub>
                <Search
                  placeHolder={t('search in columns')}
                  onSearch={(value) => handleSearchChange(value)}
                  defaultValue={searchValue}
                  onEnter={(value) => {
                    setSearchValue(value)
                    setOpen(false)
                  }}
                />
              </DropdownMenuSub>
            )}
            {isSort && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>{t('sort')}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {sortOptions.map((option, index) => (
                      <DropdownMenuCheckboxItem
                        checked={sortValue.checked && sortValue.id === index}
                        onCheckedChange={() =>
                          handleSortChange({ checked: sortValue.id !== index, value: option.value, id: index })
                        }
                        key={option.value}
                      >
                        <div className='flex gap-3'>
                          {option.icon}
                          {option.label}
                        </div>
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )}
            {filterOptions && filterOptions?.length > 0 && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{t('filter')}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {filterOptions?.map((option, index) => (
                      <DropdownMenuCheckboxItem
                        checked={filterValue.checked && filterValue.id === index}
                        onCheckedChange={() =>
                          handleFilterChange({ checked: filterValue.id !== index, value: option.value, id: index })
                        }
                        key={option.value}
                      >
                        <div className='flex gap-3'>
                          {option?.icon}
                          {option.label}
                        </div>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {(filterValue.checked || sortValue.checked || searchValue) && (
        <X
          className='h-[18px] w-[18px] cursor-pointer'
          onClick={() => {
            setFilterValue({
              id: null,
              checked: false
            })
            setSortValue({
              id: null,
              checked: false
            })
            setSearchValue('')
            if (onFilterChange) {
              onFilterChange(null)
            }
            if (onSortChange) {
              onSortChange(null)
            }
          }}
        />
      )}
    </div>
  )
}

export default MultiFilter
