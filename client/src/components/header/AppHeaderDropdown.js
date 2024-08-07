import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout, cilPeople, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import ip from './../../constant/ip'
import avatar8 from './../../assets/images/user.png'

const AppHeaderDropdown = ({ userInfo }) => {
  const navigate = useNavigate()
  const api = 'users'
  const handleLogout = async () => {
    const response = await axios.post(`${ip + api}/update_is_logged_in`, {
      id: userInfo.id,
    })

    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilAccountLogout} className="me-2" />
          Welcome {userInfo.username}
        </CDropdownItem>
        {/* {userInfo.role_type === 'admin' && (
          <CDropdownItem href="/#/candidate">
            <CIcon icon={cilPeople} className="me-2" />
            Candidate
          </CDropdownItem>
        )} */}

        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
