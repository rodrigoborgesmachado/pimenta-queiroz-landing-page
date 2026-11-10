import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { site, navigation, visibleAreas } from '../../services/content'
import { Icon } from '../common/Icon'
import logo from '../../assets/images/Pimenta_Queiroz_Logo.svg'
export function Brand() {
  return (
    <span className="brand">
      <img className="brand-logo" src={logo} alt={site.name} width={1312} height={1199} />
    </span>
  )
}
export function Header() {
  const [expanded, setExpanded] = useState(false)
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        {site.labels.skip}
      </a>
      <Navbar expand="lg" expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            aria-label={site.name}
            onClick={() => setExpanded(false)}
          >
            <Brand />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="site-navigation"
            aria-label={site.labels.menu}
          />
          <Navbar.Collapse id="site-navigation">
            <Nav className="ms-auto align-items-lg-center">
              {navigation
                .filter((item) => item.enabled)
                .map((item) =>
                  item.dropdown ? (
                    <NavDropdown
                      title={item.label}
                      id="areas-menu"
                      key={item.label}
                    >
                      {visibleAreas.map((area) =>
                        area.published && area.reviewed ? (
                          <NavDropdown.Item
                            as={Link}
                            key={area.id}
                            to={`/para-servidores/${area.slug}`}
                            onClick={() => setExpanded(false)}
                          >
                            {area.title}
                          </NavDropdown.Item>
                        ) : (
                          <NavDropdown.Item
                            as={Link}
                            key={area.id}
                            to={`/#area-${area.slug}`}
                            onClick={() => setExpanded(false)}
                          >
                            {area.title}
                          </NavDropdown.Item>
                        ),
                      )}
                    </NavDropdown>
                  ) : (
                    <Nav.Link
                      as={NavLink}
                      to={item.to}
                      end={item.to === '/'}
                      className={item.to === '/contato' ? 'nav-contact' : ''}
                      key={item.to}
                      onClick={() => setExpanded(false)}
                    >
                      {item.label}
                      {item.to === '/contato' && (
                        <Icon name="arrow" size={16} />
                      )}
                    </Nav.Link>
                  ),
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
