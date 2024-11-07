'use client'
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
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface INavbarProps {}

const navLink = [
  {
    title: 'dashboard',
    icon: <IconDashboard className='h-6 w-6 flex-shrink-0' />,
    links: [
      {
        title: 'analytics',
        href: '/admin/dashboard/analytics',
        icon: <IconAnalytics className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'reports',
        href: '/admin/dashboard/reports',
        icon: <IconReport className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'posts',
        href: '/admin/dashboard/posts',
        icon: <IconPostDashboard className='h-6 w-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'repositories',
    icon: <IconRepository className='h-6 w-6 flex-shrink-0' />,
    links: [
      {
        title: 'list repositories',
        href: '/admin/repositories/list-repositories',
        icon: <IconListRepository className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'deleted folders',
        href: '/admin/repositories/deleted-folders',
        icon: <IconFolderDelete className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'deleted files',
        href: '/admin/repositories/deleted-files',
        icon: <IconFileDelete className='h-6 w-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'folders',
    icon: <IconFolder className='h-6 w-6 flex-shrink-0' />,
    links: [
      {
        title: 'folders of posts',
        href: '/admin/folders/list-folders-of-post',
        icon: <IconFolderTree className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'create folder of posts',
        href: '/admin/folders/create-folder',
        icon: <IconPlus className='h-6 w-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'carousels',
    icon: <IconCarousel className='h-6 w-6 flex-shrink-0' />,
    links: [
      {
        title: 'list carousels',
        href: '/admin/carousels/list-carousels',
        icon: <IconList className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'create carousel',
        href: '/admin/carousels/create-carousel',
        icon: <IconPlus className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'edit carousel',
        href: '/admin/carousels/edit-carousel',
        icon: <IconEdit className='h-6 w-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'posts',
    icon: <IconPost className='h-6 w-6 flex-shrink-0' />,
    links: [
      {
        title: 'list posts',
        href: '/admin/posts/list-posts',
        icon: <IconList className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'create post',
        href: '/admin/posts/create-post',
        icon: <IconPlus className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'edit post',
        href: '/admin/posts/edit-post',
        icon: <IconEdit className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'deleted posts',
        href: '/admin/posts/deleted-posts',
        icon: <IconFileDelete className='h-6 w-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'users',
    icon: <IconUser className='h-6 w-6 flex-shrink-0' />,
    links: [
      {
        title: 'list users',
        href: '/admin/users/list-users',
        icon: <IconListUsers className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'user roles',
        href: '/admin/users/user-roles',
        icon: <IconUserRoles className='h-6 w-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'comments',
    icon: <IconComment className='h-6 w-6 flex-shrink-0' />,
    links: [
      {
        title: 'list comments',
        href: '/admin/comments/list-comments',
        icon: <IconListComments className='h-6 w-6 flex-shrink-0' />
      }
    ]
  },
  {
    title: 'settings',
    icon: <IconSettings className='h-6 w-6 flex-shrink-0' />,
    links: [
      {
        title: 'themes',
        href: '/admin/settings/themes',
        icon: <IconThemes className='h-6 w-6 flex-shrink-0' />
      },
      {
        title: 'acvanced',
        href: '/admin/settings/advanced',
        icon: <IconAdvancedSettings className='h-6 w-6 flex-shrink-0' />
      }
    ]
  }
]
const accoutLink = [
  {
    title: 'security',
    href: '/admin/account/security',
    icon: <IconSecurity className='h-6 w-6 flex-shrink-0' />
  },
  {
    title: 'change password',
    href: '/admin/account/change-password',
    icon: <IconPassword className='h-6 w-6 flex-shrink-0' />
  }
]

const NavbarAdmin: React.FunctionComponent<INavbarProps> = (props) => {
  const router = usePathname()
  const pathName = `/${router.split('/').slice(2).join('/')}`
  const t = useTranslations('admin')
  const [search, setSearch] = useState(navLink)

  const handleSearch = (value: string) => {
    const searchResult = navLink
      .map((nav) => {
        const links = nav.links?.filter((link) => {
          return t(link.title as any)
            .toLowerCase()
            .includes(value.toLowerCase())
        })
        return { ...nav, links }
      })
      .filter((nav) => nav.links && nav.links.length > 0) // Filter out nav objects with no matching links
    setSearch(searchResult)
  }
  return (
    <nav className='flex max-h-screen w-[300px] flex-col gap-5 overflow-hidden p-5 hover:overflow-y-auto'>
      <div>
        <Link href='/admin' className='flex items-center gap-3 hover:no-underline'>
          <Image src='/logo.png' alt='logo' width={40} height={40} className='block h-[40px] w-[40px] object-cover' />
          <h1 className='text-3xl font-bold'>Henlladev</h1>
        </Link>
      </div>
      <div>
        <Search placeHolder={t('search in menu')} onSearch={handleSearch} />
      </div>
      <div className='flex flex-col text-neutral-400'>
        {search.map((nav, index) => {
          const defaultValue = nav.links?.find((link) => link.href === pathName) ? `item-${index}` : ''
          return (
            <Accordion key={index} type='single' collapsible defaultValue={defaultValue}>
              <AccordionItem value={`item-${index}`} className='border-none'>
                <AccordionTrigger className='hover:text-primary-purple text-[16px] capitalize hover:no-underline'>
                  <div className='flex items-center gap-3'>
                    {nav.icon}
                    {t(nav.title as any)}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {nav.links?.map((link, index) => {
                      return (
                        <li
                          key={index}
                          className={cn(
                            'hover:text-primary-purple flex items-center gap-3 pl-8',
                            pathName === link.href ? 'text-primary-purple' : ''
                          )}
                        >
                          {link.icon}
                          <Link
                            href={link.href}
                            className='flex h-[52px] w-full items-center text-[16px] capitalize leading-10'
                          >
                            {t(link.title as any)}
                          </Link>
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
            <AccordionTrigger className='hover:text-primary-purple text-[16px] capitalize hover:no-underline'>
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
                    <li key={index} className='hover:text-primary-purple flex items-center gap-3 pl-8 text-neutral-400'>
                      {link.icon}
                      <Link
                        href={link.href}
                        className={cn(
                          'flex h-[52px] w-full items-center text-[16px] capitalize leading-10',
                          router === link.href ? 'text-primary-purple' : ''
                        )}
                      >
                        {t(link.title as any)}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </nav>
  )
}

export default NavbarAdmin
