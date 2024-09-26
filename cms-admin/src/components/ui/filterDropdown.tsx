import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownWideNarrow, ArrowDownZA, ArrowUpNarrowWide, Filter, X } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IFilterSelectProps {
  placeholder?: string
  optionFilter?: {
    value: string
    label: string
    icon?: React.ReactNode
  }[]
  sortType?: 'text' | 'date' | 'number'
  isSort?: boolean
  onChange?: (value: string | null) => void
}
/**
 * Filter component custom
 * @param {string} placeholder - Placeholder for select
 * @param {object[]} optionFilter - List optionFilter for select
 * @param {function} onChange - Callback when value change
 * @returns {React.ReactNode} FilterDropdown component
 *
 * @example
 * ```tsx
 * <FilterDropdown
 *   optionFilter={[
 *     { value: "option1", label: "Option 1" },
 *     { value: "option2", label: "Option 2" },
 *     { value: "option3", label: "Option 3" },
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
const FilterDropdown: React.FunctionComponent<IFilterSelectProps> = ({
  optionFilter,
  onChange,
  isSort,
  sortType
}) => {
  const [value, setValue] = useState<{
    id: number | null
    checked: boolean
  }>({
    id: null,
    checked: false
  })
  const [open, setOpen] = useState(false)
    const [sortValue, setSortValue] = useState<{
      id: number | null
      checked: boolean
    }>({
      id: null,
      checked: false
    })
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
  const handleFilterChange = (value: { checked: boolean; value: string; id: number }) => {
    console.log("value:", value)
    if (onChange) {
      if (value.checked) {
        onChange(value.value)
        setValue({
          id: value.id,
          checked: value.checked
        })
      } else {
        onChange(null)
        setValue({
          id: null,
          checked: false
        })
      }
    }
  }
  const handleSortChange = (value: { checked: boolean; value: string; id: number }) => {
    if (onChange) {
      if (value.checked) {
        onChange(value.value)
        setSortValue({
          id: value.id,
          checked: value.checked
        })
      } else {
        onChange('')
        setSortValue({
          id: null,
          checked: false
        })
      }
    }
  }
  return (
    <div className='flex items-center gap-2'>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className='flex-shrink-0 w-[18px] flex items-center h-full justify-center outline-none border-none '>
            <Filter className='h-[18px] w-[18px] cursor-pointer' onClick={() => setOpen(true)} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[300px]'>
          <DropdownMenuGroup className='py-3 flex flex-col gap-3 text-[16px]'>
            {optionFilter &&
              !isSort &&
              optionFilter?.length > 0 &&
              optionFilter?.map((opt, index) => (
                <DropdownMenuCheckboxItem
                  checked={value.checked && value.id === index}
                  onCheckedChange={() =>
                    handleFilterChange({ checked: value.id !== index, value: opt.value, id: index })
                  }
                  key={opt.value}
                >
                  <div className='flex gap-3'>
                    {opt?.icon}
                    {opt.label}
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            {sortOptions &&
              isSort &&
              sortOptions?.length > 0 &&
              sortOptions?.map((opt, index) => (
                <DropdownMenuCheckboxItem
                  checked={sortValue.checked && sortValue.id === index}
                  onCheckedChange={() =>
                    handleSortChange({ checked: sortValue.id !== index, value: opt.value, id: index })
                  }
                  key={opt.value}
                >
                  <div className='flex gap-3'>
                    {opt?.icon}
                    {opt.label}
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {(value.checked || sortValue.checked) && (
        <X
          className='h-[18px] w-[18px] cursor-pointer'
          onClick={() => {
            setValue({
              id: null,
              checked: false
            })
            setSortValue({
              id: null,
              checked: false
            })
            if (onChange) {
              onChange(null)
            }
          }}
        />
      )}
    </div>
  )
}

export default FilterDropdown
