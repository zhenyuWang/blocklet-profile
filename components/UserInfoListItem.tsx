import { ReactNode } from 'react'

export default function UserInfoListItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <li className='h-16 flex flex-col items-center sm:flex-row border-b hover:border-b-sky-500'>
      <div className='flex mt-1 mb-2 sm:mb-0 sm:mt-0'>
        {icon}
        <div className='pl-2 w-[86px] mr-1'>{label}</div>
      </div>
      <p
        className='w-56 overflow-ellipsis overflow-hidden whitespace-nowrap hover:scale-110 origin-left transition-transform text-center sm:text-left'
        title={value}>
        {value}
      </p>
    </li>
  )
}
