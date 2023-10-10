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
import { FinalHeader, FinalFooter, Chairman } from 'src/helper/report/FinalResultTemplate'

const TopFivePrintFinalResult = () => {
  const api = 'top_five'
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
      return '1st'
    } else if (rank === 2) {
      return '2nd'
    } else if (rank === 3) {
      return '3rd'
    } else if (rank === 4) {
      return '4th'
    } else if (rank === 5) {
      return '5th'
    } else {
      return ''
    }
  }
  return (
    <div className="final_result_container_5">
      <FinalHeader />

      <div className="text-center mb-4">
        <h5>Top Five Final Result</h5>
      </div>
      <CTable
        style={{ width: '96%' }}
        bordered
        className="table-sm tableFinalResult "
        borderColor="dark"
      >
        <CTableHead style={{ background: 'orange' }}>
          <CTableRow className="text-center">
            <CTableHeaderCell>Candidate #</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Sponsoring Unit</CTableHeaderCell>
            <CTableHeaderCell>Rank</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {consolidatedRank.map((row, index) => (
            <CTableRow key={row.id} className="text-center">
              <CTableDataCell className="text-left">{row.number}</CTableDataCell>
              <CTableDataCell className="text-left">{row.name}</CTableDataCell>
              <CTableDataCell>{row.sponsor}</CTableDataCell>
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

export default TopFivePrintFinalResult
