import Link from "next/link";

import { IHeaderProps } from "./types";

const Header = ({ position }: IHeaderProps) => {
  return (
    <header id="header" className={`header-section ${position ? position : 'fixed'}`}>
      <div className="container">
        <nav className="navbar ">
          <Link href="/" className="navbar-brand"><img src="/img/logo.png" alt="Barbershop" /></Link>
          <div className="d-flex menu-wrap align-items-center">
            <div id="mainmenu" className="mainmenu">
              <ul className="nav">
                <li><Link className="nav-link active" href="/">Trang chủ</Link></li>
                <li><a href="about-us.html">Giới thiệu</a>
                </li>
                <li><a href="services.html">Dịch vụ</a>
                </li>
                <li><a href="#">Bảng giá</a>
                </li>
                <li><a href="contact.html">Liên hệ</a></li>
              </ul>
            </div>
            <div className="header-btn">
              <Link href="/dat-lich" className="menu-btn cursor-pointer rounded">Đặt chỗ </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;