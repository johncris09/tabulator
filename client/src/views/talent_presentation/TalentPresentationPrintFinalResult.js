import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import ip from './../../constant/ip'
import axios from 'axios'
import './../../assets/css/custom.css'
import { FinalHeader, FinalFooter } from 'src/helper/report/FinalResultTemplate'
import { Chairman } from 'src/helper/report/FinalResultTemplate'

const TalentPresentationPrintFinalResult = () => {
  const api = 'talent_presentation'
  const [consolidatedRank, setConsolidatedRank] = useState([])

  useEffect(() => {
    fetchConsolidatedScoreAndRank()
  }, [])

  const fetchConsolidatedScoreAndRank = async () => {
    try {
      const response = await axios.get(`${ip + api}/final_result`)

      // Sort the data by rank
      const sortedData = [...response.data].sort((a, b) => b.rank - a.rank)
      console.info(sortedData)
      setConsolidatedRank(sortedData)
      // console.info(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const newRank = (rank) => {
    if (rank === 1) {
      return 'MISS TALENT 2023'
    } else if (rank === 2) {
      return '1st runner up'
    } else if (rank === 3) {
      return '2nd runner up'
    } else {
      return '' // Handle other ranks or no rank
    }
  }

  return (
    <div className="talent_night_final_result_container">
      <FinalHeader />
      <div className="text-center mb-2">
        {/* <h5>Talent Presentation Final Result</h5> */}
        <h5>MISS TALENT 2023</h5>
        <p>Final Result</p>
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
              <CTableDataCell>{newRank(row.rank)}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <Chairman />
      <FinalFooter />
      <div className="print-note text-danger mx-3">Please set your paper size to 18cmx27cm</div>
    </div>
  )
}

export default TalentPresentationPrintFinalResult
