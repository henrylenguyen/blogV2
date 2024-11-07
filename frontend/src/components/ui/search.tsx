'use client'
import { cn } from '@/lib/utils'
import _ from 'lodash'
import { SearchIcon } from 'lucide-react'
import * as React from 'react'

interface ISearchProps {
  placeHolder?: string
  onSearch?: (value: string) => void
  className?: string
}

const Search: React.FunctionComponent<ISearchProps> = ({ placeHolder = 'Search ID...', onSearch, className }) => {
  const handleOnSearch = _.debounce((value: string) => {
    if (onSearch) {
      onSearch(value)
    }
  }, 400)

  return (
    <div className={cn('relative h-full w-full lg:max-w-sm', className)}>
      <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center gap-2 ps-3'>
        <SearchIcon className='size-4' />
        <div className='bg-gray-lighter h-1/2 w-[1px]' />
      </div>
      <input
        type='search'
        id='default-search'
        className={cn(
          'shadow-1xl xs:h-10 block w-full rounded-lg border border-gray-300 px-3 py-2.5 ps-12 text-sm sm:h-11 md:h-12'
        )}
        placeholder={placeHolder}
        required
        onChange={(e) => handleOnSearch(e.target.value)}
      />
    </div>
  )
}

export default Search
