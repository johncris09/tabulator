import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import ip from '../../constant/ip'
import axios from 'axios'
import './../../assets/css/custom.css'
import {
  AuditionFooter,
  AuditionHeader,
  Footer,
  Judges,
} from 'src/helper/report/SummaryResultTemplate'

const AuditionPrintSummary = () => {
  const api = 'audition'
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

  return (
    <>
      <AuditionHeader />

      <div className="text-center mb-2">
        <h5>Bb. Oroquieta 2024</h5>
        <p>Over-all Scores</p>
      </div>
      <CTable bordered className="table-sm tableSummary mb-5" borderColor="dark">
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

      <Judges />
      <AuditionFooter />
    </>
  )
}

export default AuditionPrintSummary
