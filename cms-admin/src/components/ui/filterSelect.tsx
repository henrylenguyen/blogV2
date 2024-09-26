import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Filter, X } from 'lucide-react'
import * as React from 'react'
import { isDesktop } from 'react-device-detect'

interface IFilterSelectProps {
  placeholder?: string
  option: {
    value: string
    label: string
  }[]
  icon?: React.ReactNode
  triggerClassName?: string
  isShowValue?: boolean
  onChange?: (value: string) => void
}
/**
 * Filter component custom
 * @param {string} placeholder - Placeholder for select
 * @param {object[]} option - List option for select
 * @param {React.ReactNode} icon - Icon for select
 * @param {string} triggerClassName - Classname for trigger
 * @param {function} onChange - Callback when value change
 * @returns {React.ReactNode} FilterSelect component
 *
 * @example
 * ```tsx
 * <FilterSelect
 *   placeholder="Select an option"
 *   option={[
 *     { value: "option1", label: "Option 1" },
 *     { value: "option2", label: "Option 2" },
 *     { value: "option3", label: "Option 3" },
 *   ]}
 *   icon={<IconFilter />}
 *   triggerClassName="custom-trigger"
 *   hasFilterText={true}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
const FilterSelect: React.FunctionComponent<IFilterSelectProps> = ({
  placeholder,
  option,
  triggerClassName,
  isShowValue,
  onChange
}) => {
  const [value, setValue] = React.useState<string | null>(null)
  return (
    <div className='flex items-center gap-2'>
      <Select
        onValueChange={(value) => {
          setValue(value)
          if (onChange) {
            onChange(value)
          }
        }}
      >
        <SelectTrigger
          className={cn(
            'relative flex-shrink-0 w-[18px] p-0 h-full justify-center outline-none border-none focus:ring-0',
            triggerClassName
          )}
        >
          <Filter className='h-[18px] w-[18px] flex-shrink-0 cursor-pointer' />

          {/* Hiển thị value */}
          {value && isDesktop && isShowValue && (
            <p className='text-[16px] text-black-main xs:hidden sm:flex'>
              {option.find((otp) => otp.value === value)?.label}
            </p>
          )}
          {/* Hiển thị placeholder */}
          {!value && placeholder && isDesktop && (
            <SelectValue placeholder={placeholder} className='xs:hidden sm:flex' />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className='w-[300px]'>
            {option.map((otp) => (
              <SelectItem key={otp.value} value={otp.value} className='cursor-pointer p-[12px]'>
                {otp.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
    </div>
  )
}

export default FilterSelect
