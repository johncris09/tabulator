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

function FinalHeader() {
  return (
    <CRow className="justify-content-around evenly text-center mb-3">
      <CCol>
        <CImage
          className="imageHeaderPrint"
          rounded
          src={bblogo}
          style={{
            width: '40%',
            height: '100px',
            maxWidth: '180px',
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
        />
      </CCol>
      <CCol>
        <CImage
          className="imageHeaderPrint"
          rounded
          src={inugoglogo}
          style={{
            width: '40%',
            height: '100px',
            maxWidth: '120px',
            maxHeight: '90px',
          }}
        />
      </CCol>
    </CRow>
  )
}

function FinalFooter() {
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

function Chairman() {
  return (
    <CRow className="justify-content-around evenly text-center mt-5 mb-2">
      <CCol>
        ________________________________________
        <br />
        Chairman, Board of Judges
      </CCol>
    </CRow>
  )
}

export { FinalHeader, FinalFooter, Chairman }
