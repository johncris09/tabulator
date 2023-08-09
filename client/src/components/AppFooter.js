import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">
          &copy; {new Date().getFullYear()} , made with ❤️ by{' '}
          <a href="#" className="footer-link fw-semibold">
            MIS DIVISION
          </a>
        </span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
