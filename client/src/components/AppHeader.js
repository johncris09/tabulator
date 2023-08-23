import React, { useEffect } from 'react'
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CNavLink } from '@coreui/react'

import { AppHeaderDropdown } from './header/index'

const AppHeader = ({ userInfo }) => {
  useEffect(() => {}, [userInfo])
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="d-md-flex me-auto">
          <CNavLink href="#">
            {/* <CIcon icon={logo} height={48} alt="Logo" href="#" /> */}
            <h4>Tabulator</h4>
          </CNavLink>
        </CHeaderBrand>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown userInfo={userInfo} />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
