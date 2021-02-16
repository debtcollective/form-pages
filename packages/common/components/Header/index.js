import React, { useState, useLayoutEffect, useRef } from 'react'
import classNames from 'classnames'
import logo from '../../img/logo-light.svg'
import { Collapse } from 'react-bootstrap'
import { Link } from 'gatsby'
import './styles.scss'

const Header = () => {
  const [scrollY, setScrollY] = useState(false)
  const [open, setOpen] = useState(false)
  const headerEl = useRef(null)

  const isScrolled =
    headerEl.current && scrollY > headerEl.current.scrollHeight / 2

  const headerClasses = classNames('header', 'fixed-top', {
    'slider-nav-open': open,
    active: isScrolled
  })
  const menuTriggerClasses = classNames('menu-trigger', { active: open })

  useLayoutEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <>
      <header ref={headerEl} className={headerClasses}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 col-lg-3 d-xl-none">
              <div className="header-col justify-content-start">
                <div
                  id="menu-trigger"
                  className={menuTriggerClasses}
                  role="button"
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-controls="slider-nav"
                >
                  <div className="menu-icon">
                    <span className="menu-stripe"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-6 col-xl-9">
              <div className="header-col justify-content-xl-start">
                <Link to="/">
                  <img
                    className="logo"
                    src={logo}
                    alt="debtcollective logo"
                    width="100%"
                  />
                </Link>
                <nav className="d-none d-xl-flex">
                  <ul className="nav align-items-center">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://community.debtcollective.org"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Community
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://tools.debtcollective.org"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Dispute Your Debt
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://powerreport.debtcollective.org"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        The Power Report
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://debtcollective.org/donate"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Donate
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-3 col-lg-3">
              <div className="header-col justify-content-end buttons">
                {/* >= lg */}
                <a
                  href="https://community.debtcollective.org/signup"
                  target="_blank"
                  role="button"
                  rel="noopener noreferrer"
                  className="btn btn-lg btn-outline-dark d-none d-xl-block btn-session"
                >
                  Sign up
                </a>
                {/* >= md */}
                <a
                  href="https://community.debtcollective.org/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  className="btn btn-primary btn-lg d-none d-md-block btn-session "
                >
                  Login
                </a>
                {/* small */}
                <a
                  href="https://community.debtcollective.org/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  className="btn btn-primary btn-sm d-md-none d-xs-block d-sm-block btn-session"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Collapse in={open}>
        <nav id="slider-nav" className="slider-nav d-xl-none">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://community.debtcollective.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Community
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://tools.debtcollective.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dispute Your Debt
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://powerreport.debtcollective.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Power Report
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://debtcollective.org/donate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
            </li>
          </ul>
        </nav>
      </Collapse>
    </>
  )
}

export default Header
