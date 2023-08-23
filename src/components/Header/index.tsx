import Link from "next/link";

import { IHeaderProps } from "./types";

const Header = ({ position }: IHeaderProps) => {
  return (
    <header id="header" className={`header-section w-full ${position ? position : 'fixed'}`}>
      <div className="w-full">
        <nav className="navbar px-5">
          <Link href="/" className="navbar-brand"><img src="/img/logo.png" alt="Barbershop" /></Link>
          <div className="menu-wrap align-items-center">
            <div id="mainmenu" className="mainmenu">
              <ul className="nav">
                <li><Link className="nav-link active" href="/">Giới thiệu</Link></li>
                <li><a href="#dich-vu">Dịch vụ</a>
                </li>
                <li><a href="#bang-gia">Bảng giá</a></li>
                <li><a href="#san-pham">Sản phẩm</a></li>
                <li><a href="#dia-chi">Địa chỉ</a></li>
              </ul>
            </div>
            <div className="header-btn">
              <Link href="/dat-lich" className="menu-btn cursor-pointer rounded">Đặt chỗ </Link>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </nav>
      </div>
    </header>
  )
}

export default Header;