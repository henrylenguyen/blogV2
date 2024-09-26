import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Search from '@/components/ui/search'
import { Filter, X } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ISearchProps {
  placeholder?: string
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
const SearchDropdown: React.FunctionComponent<ISearchProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const { t } = useTranslation()
  const handleSearchChange = (value: string) => {
    if (onChange) {
      onChange(value)
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
            <Search
              placeHolder={t('search in columns')}
              onSearch={(value) => handleSearchChange(value)}
              defaultValue={searchValue}
              onEnter={(value) => {
                setSearchValue(value)
                setOpen(false)
              }}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {searchValue && (
        <X
          className='h-[18px] w-[18px] cursor-pointer'
          onClick={() => {
            setSearchValue('')
            if (onChange) {
              onChange('')
            }
          }}
        />
      )}
    </div>
  )
}

export default SearchDropdown
