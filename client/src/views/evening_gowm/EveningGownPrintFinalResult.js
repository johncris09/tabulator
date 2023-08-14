import React, { useEffect, useState } from 'react'
import {
  CCol,
  CFooter,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
// import logo from './../../../assets/images/logo.png'
import ip from './../../constant/ip'
import axios from 'axios'
import logo from './../../assets/images/logo.png'
import './../../assets/css/custom.css'

const EveningGownPrintFinalResult = () => {
  const [consolidatedRank, setConsolidatedRank] = useState([])

  useEffect(() => {
    fetchConsolidatedScoreAndRank()
  }, [])

  const fetchConsolidatedScoreAndRank = async () => {
    try {
      const response = await axios.get(ip + 'evening_gown/final_result')
      setConsolidatedRank(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
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

  return (
    <div className="final_result_container">
      <CRow className="justify-content-around evenly text-center mt-4 mb-4">
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
            src={logo}
            style={{
              width: '40%',
              height: 'auto',
              maxWidth: '90px',
              maxHeight: '90px',
            }}
          />
        </CCol>
      </CRow>

      <div className="text-center mb-4">
        <h5>Evening Gown Final Result</h5>
      </div>
      <CTable bordered className="table-sm tableFinalResult " borderColor="dark">
        <CTableHead style={{ background: 'orange' }}>
          <CTableRow className="text-center">
            <CTableHeaderCell>Candidate #</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Final Rank</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {consolidatedRank.map((row, index) => (
            <CTableRow key={row.id} className="text-center">
              <CTableDataCell className="text-left">{row.number}</CTableDataCell>
              <CTableDataCell className="text-left">{row.name}</CTableDataCell>
              <CTableDataCell>{row.rank}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CRow className="justify-content-around evenly text-center mt-5 mb-5">
        <CCol>
          ________________________________________
          <br />
          Chairman, Board of Judges
        </CCol>
      </CRow>

      <CFooter className="bg-transparent" style={{ fontSize: 12 }}>
        <div>
          <span>Developed by: OCM MIS Division &copy; 2023</span>
        </div>
        <div>
          <span>Printed on {formattedDate}</span>
        </div>
      </CFooter>
    </div>
  )
}

export default EveningGownPrintFinalResult
