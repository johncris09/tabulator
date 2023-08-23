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

const TalentPresentationPrintSummary = () => {
  const api = 'talent_presentation'
  const [consolidatedRank, setConsolidatedRank] = useState([])

  useEffect(() => {
    fetchConsolidatedScoreAndRank()
  }, [])

  const fetchConsolidatedScoreAndRank = async () => {
    try {
      const response = await axios.get(`${ip + api}/getConsolidatedScoreAndRank`)
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
    <>
      <CRow className="justify-content-around evenly text-center mt-4 mb-4">
        <CCol>
          <CImage
            rounded
            src={logo}
            style={{
              width: '20%',
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
              width: '20%',
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
              width: '20%',
              height: 'auto',
              maxWidth: '90px',
              maxHeight: '90px',
            }}
          />
        </CCol>
      </CRow>

      <div className="text-center mb-2">
        <h5>Talent Presentation Summary</h5>
      </div>
      <CTable bordered className="table-sm tableSummary " borderColor="dark">
        <CTableHead style={{ background: 'orange' }}>
          <CTableRow className="text-center">
            <CTableHeaderCell>Candidate #</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Judge 1</CTableHeaderCell>
            <CTableHeaderCell>Judge 2 </CTableHeaderCell>
            <CTableHeaderCell>Judge 3</CTableHeaderCell>
            <CTableHeaderCell>Judge 4</CTableHeaderCell>
            <CTableHeaderCell>Judge 5</CTableHeaderCell>
            <CTableHeaderCell>Total Score</CTableHeaderCell>
            <CTableHeaderCell>Final Rank</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {consolidatedRank.map((row, index) => (
            <CTableRow key={row.id} className="text-center">
              <CTableDataCell className="text-left">{row.number}</CTableDataCell>
              <CTableDataCell className="text-left">{row.name}</CTableDataCell>
              <CTableDataCell>{row.judge1}</CTableDataCell>
              <CTableDataCell>{row.judge2}</CTableDataCell>
              <CTableDataCell>{row.judge3}</CTableDataCell>
              <CTableDataCell>{row.judge4}</CTableDataCell>
              <CTableDataCell>{row.judge5}</CTableDataCell>
              <CTableDataCell>{row.total_score}</CTableDataCell>
              <CTableDataCell>{row.final_rank}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

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

      <CFooter className="bg-transparent" style={{ fontSize: 12 }}>
        <div>
          <span>Developed by: OCM MIS Division &copy; 2023</span>
        </div>
        <div>
          <span>Printed on {formattedDate}</span>
        </div>
      </CFooter>
    </>
  )
}

export default TalentPresentationPrintSummary
