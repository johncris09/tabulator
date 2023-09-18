import React from 'react'
import { CCol, CFooter, CImage, CRow } from '@coreui/react'
import logo from './../../assets/images/logo.png'
import bblogo from './../../assets/images/bblogo.png'
import inugoglogo from './../../assets/images/inug-og logo.png'

const formattedDate = new Date().toLocaleString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
})

function Header() {
  return (
    <CRow className="justify-content-around evenly text-center mt-4 mb-4">
      <CCol>
        <CImage
          rounded
          src={bblogo}
          style={{
            width: '40%',
            height: '100px',
            maxWidth: '140px',
            maxHeight: '90px',
          }}
        />
      </CCol>
      <CCol>
        <CImage
          rounded
          src={logo}
          style={{
            width: '40%',
            height: 'auto',
            maxWidth: '90px',
            maxHeight: '90px',
          }}
        />{' '}
      </CCol>
      <CCol>
        <CImage
          rounded
          className="imageHeaderPrint"
          src={inugoglogo}
          style={{
            width: '40%',
            height: '100px',
            maxWidth: '140px',
            maxHeight: '90px',
          }}
        />
      </CCol>
    </CRow>
  )
}

function Judges() {
  return (
    <>
      <CRow className="justify-content-around evenly text-center mt-4 mb-4">
        <CCol sm={4}>
          __________________________
          <br />
          Judge 1
        </CCol>
        <CCol sm={4}>
          __________________________
          <br />
          Judge 2
        </CCol>
        <CCol sm={4}>
          __________________________
          <br />
          Judge 3
        </CCol>
      </CRow>
      <CRow className="justify-content-around text-center mt-3 mb-2">
        <CCol xs={4}>
          __________________________
          <br />
          Judge 4
        </CCol>
        <CCol xs={4}>
          __________________________
          <br />
          Judge 5
        </CCol>
      </CRow>
    </>
  )
}

function Footer() {
  return (
    <CFooter className="bg-transparent" style={{ fontSize: 12 }}>
      <div>
        <span>Developed by: OCM MIS Division &copy; {new Date().getFullYear()}</span>
      </div>
      <div>
        <span>Printed on {formattedDate}</span>
      </div>
    </CFooter>
  )
}

export { Header, Footer, Judges }
