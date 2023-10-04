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
      setConsolidatedRank(sortedData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const newRank = (rank) => {
    if (rank === 1) {
      return 'MISS TALENT 2023'
    } else if (rank === 2) {
      return '1st Runner-up'
    } else if (rank === 3) {
      return '2nd Runner-up'
    } else {
      return '' // Handle other ranks or no rank
    }
  }

  return (
    <div className="final_result_container_3">
      <FinalHeader />
      <div className="text-center mb-2">
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
    </div>
  )
}

export default TalentPresentationPrintFinalResult
