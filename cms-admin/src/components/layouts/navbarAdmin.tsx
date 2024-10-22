import {
  IconAdvancedSettings,
  IconAnalytics,
  IconCarousel,
  IconComment,
  IconDashboard,
  IconEdit,
  IconFileDelete,
  IconFolder,
  IconFolderDelete,
  IconFolderTree,
  IconList,
  IconListComments,
  IconListRepository,
  IconListUsers,
  IconPassword,
  IconPlus,
  IconPost,
  IconPostDashboard,
  IconReport,
  IconRepository,
  IconSecurity,
  IconSettings,
  IconThemes,
  IconUser,
  IconUserRoles
} from '@/assets/icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Search from '@/components/ui/search'
import { cn } from '@/lib/utils'
import { AlignJustify } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

interface INavbarProps {}

const navLink = [
  {
    title: 'dashboard',
    icon: <IconDashboard className='w-6 h-6 flex-shrink-0' />,
    links: [
      {
        title: 'analytics',
        href: 'dashboard/analytics',
        icon: <IconAnalytics className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'reports',
        href: 'dashboard/reports',
        icon: <IconReport className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'posts',
        href: 'dashboard/posts',
        icon: <IconPostDashboard className='w-6 h-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'repositories',
    icon: <IconRepository className='w-6 h-6 flex-shrink-0' />,
    links: [
      {
        title: 'list repositories',
        href: 'repositories/list-repositories',
        icon: <IconListRepository className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'deleted folders',
        href: 'repositories/deleted-folders',
        icon: <IconFolderDelete className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'deleted files',
        href: 'repositories/deleted-files',
        icon: <IconFileDelete className='w-6 h-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'folders',
    icon: <IconFolder className='w-6 h-6 flex-shrink-0' />,
    links: [
      {
        title: 'folders of posts',
        href: 'folders/list-folders-of-post',
        icon: <IconFolderTree className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'create folder of posts',
        href: 'folders/create-folder',
        icon: <IconPlus className='w-6 h-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'carousels',
    icon: <IconCarousel className='w-6 h-6 flex-shrink-0' />,
    links: [
      {
        title: 'list carousels',
        href: 'carousels/list-carousels',
        icon: <IconList className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'create carousel',
        href: 'carousels/create-carousel',
        icon: <IconPlus className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'edit carousel',
        href: 'carousels/edit-carousel',
        icon: <IconEdit className='w-6 h-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'posts',
    icon: <IconPost className='w-6 h-6 flex-shrink-0' />,
    links: [
      {
        title: 'list posts',
        href: 'posts/list-posts',
        icon: <IconList className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'create post',
        href: 'posts/create-post',
        icon: <IconPlus className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'edit post',
        href: 'posts/edit-post',
        icon: <IconEdit className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'deleted posts',
        href: 'posts/deleted-posts',
        icon: <IconFileDelete className='w-6 h-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'users',
    icon: <IconUser className='w-6 h-6 flex-shrink-0' />,
    links: [
      {
        title: 'list users',
        href: 'users/list-users',
        icon: <IconListUsers className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'user roles',
        href: 'users/user-roles',
        icon: <IconUserRoles className='w-6 h-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'comments',
    icon: <IconComment className='w-6 h-6 flex-shrink-0' />,
    links: [
      {
        title: 'list comments',
        href: 'comments/list-comments',
        icon: <IconListComments className='w-6 h-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'settings',
    icon: <IconSettings className='w-6 h-6 flex-shrink-0' />,
    links: [
      {
        title: 'themes',
        href: 'settings/themes',
        icon: <IconThemes className='w-6 h-6 flex-shrink-0' />
      },
      {
        title: 'acvanced',
        href: 'settings/advanced',
        icon: <IconAdvancedSettings className='w-6 h-6 flex-shrink-0' />
      }
    ]
  }
]
const accoutLink = [
  {
    title: 'security',
    href: 'account/security',
    icon: <IconSecurity className='w-6 h-6 flex-shrink-0' />
  },
  {
    title: 'change password',
    href: 'account/change-password',
    icon: <IconPassword className='w-6 h-6 flex-shrink-0' />
  }
]

const NavbarAdmin: React.FunctionComponent<INavbarProps> = (props) => {
  const [open, setOpen] = useState(true)
  const router = useLocation().pathname.replace('/', '')
  const { t } = useTranslation()
  const [search, setSearch] = useState(navLink)

  const handleSearch = (value: string) => {
    const searchResult = navLink
      .map((nav) => {
        const links = nav.links?.filter((link) => {
          return t(link.title).toLowerCase().includes(value.toLowerCase())
        })
        return { ...nav, links }
      })
      .filter((nav) => nav.links && nav.links.length > 0) // Filter out nav objects with no matching links
    setSearch(searchResult)
  }
  const handleToggleSideBar = () => {
    setOpen((prev) => !prev)
  }
  return (
    <>
      {open && (
        <nav className='w-[300px] flex-shrink-0 p-5 flex flex-col gap-5 max-h-screen hover:overflow-y-auto overflow-hidden'>
          <div className='flex justify-between items-center'>
            <NavLink to='/' className='hover:no-underline flex gap-3 items-center'>
              <img src='/logo.png' alt='logo' className='object-cover block w-[40px] h-[40px]' />
              <h1 className='text-3xl  font-bold'>Henlladev</h1>
            </NavLink>
            <button onClick={handleToggleSideBar}>
              <AlignJustify className='w-[30px] h-[30px] flex-shrink-0' />
            </button>
          </div>
          <div>
            <Search placeHolder={t('search in menu')} onSearch={handleSearch} />
          </div>
          <div className='flex flex-col text-neutral-400 '>
            {search.map((nav, index) => {
              const defaultValue = nav.links?.find((link) => link.href === router) ? `item-${index}` : ''
              return (
                <Accordion key={index} type='single' collapsible defaultValue={defaultValue}>
                  <AccordionItem value={`item-${index}`} className='border-none'>
                    <AccordionTrigger className=' hover:text-primary-purple capitalize text-[16px] hover:no-underline'>
                      <div className='flex items-center gap-3'>
                        {nav.icon}
                        {t(nav.title)}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {nav.links?.map((link, index) => {
                          return (
                            <li key={index} className='pl-8'>
                              <NavLink
                                to={link.href}
                                className={({ isActive }) =>
                                  cn(
                                    ' h-[52px] w-full leading-10 flex items-center capitalize  text-[16px]  gap-3 ',
                                    isActive ? 'text-primary-purple' : 'text-neutral-400'
                                  )
                                }
                              >
                                {link.icon}
                                {t(link.title)}
                              </NavLink>
                            </li>
                          )
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            })}
          </div>
          <div className='border-t border-neutral-100/40 py-4'>
            <Accordion type='single' collapsible>
              <AccordionItem value={`item-avatar`} className='border-none'>
                <AccordionTrigger className=' hover:text-primary-purple capitalize text-[16px] hover:no-underline'>
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarImage src='https://github.com/shadcn.png' />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start gap-2'>
                      <p className='text-[20px]'>Shadcn</p>
                      <p className='text-[13px] text-neutral-400'>{t('account settings')}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {accoutLink?.map((link, index) => {
                      return (
                        <li
                          key={index}
                          className='pl-8 flex gap-3 items-center hover:text-primary-purple text-neutral-400'
                        >
                          {link.icon}
                          <NavLink
                            to={link.href}
                            className={cn(
                              ' h-[52px] w-full leading-10 flex items-center capitalize  text-[16px]'
                              // router === link.href ? 'text-primary-purple' : ''
                            )}
                          >
                            {t(link.title)}
                          </NavLink>
                        </li>
                      )
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </nav>
      )}
      {!open && (
        <div className='w-[80px] mt-5 flex-shrink-0'>
          <button onClick={handleToggleSideBar} className='w-full flex justify-center'>
            <AlignJustify className='w-[30px] h-[30px] flex-shrink-0' />
          </button>
        </div>
      )}
    </>
  )
}

export default NavbarAdmin
