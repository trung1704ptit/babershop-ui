import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IMenu {
  path: string;
  label: string;
  icon: JSX.Element;
}

const MENU: IMenu[] = [
  {
    label: 'Danh sách đặt lịch',
    path: '/admin/danh-sach',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-5 h-5 mt-[2px]'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
        />
      </svg>
    ),
  },
  {
    label: 'Thống kê',
    path: '/admin/thong-ke',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-5 h-5 mt-[2px]'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
        />
      </svg>
    ),
  },
  {
    label: 'Tích điểm',
    path: '/admin/cai-dat',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-5 h-5 mt-[2px]'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z'
        />
      </svg>
    ),
  },
];

export const Sidebar = () => {
  const router = useRouter();
  const [activePath, setActivePath] = useState(MENU[0]?.path);

  const handleChangeRoute = (nextPath: string) => {
    router.push(nextPath);
    setActivePath(nextPath);
  };

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router]);

  return (
    <aside className='w-[280px] bg-black'>
      <div className='w-full h-full p-3'>
        <div>
          <ul>
            {MENU.map((menu: IMenu) => (
              <li
                className={`p-2 flex mb-2 rounded cursor-pointer ${
                  activePath?.includes(menu.path) ? 'active-btn' : ''
                }`}
                key={menu.path}
                onClick={() => handleChangeRoute(menu.path)}
              >
                <div className='mr-2'>{menu.icon}</div>
                {menu.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
