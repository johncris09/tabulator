import React, { useEffect, useState } from 'react'
import {
  CCol,
  CRow,
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

const ProductionNumberPrintFinalResult = () => {
  const api = 'production_number'
  const [consolidatedRank, setConsolidatedRank] = useState([])

  useEffect(() => {
    fetchConsolidatedScoreAndRank()
  }, [])

  const fetchConsolidatedScoreAndRank = async () => {
    try {
      const response = await axios.get(`${ip + api}/final_result`)
      setConsolidatedRank(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="final_result_container">
      <FinalHeader />

      <div className="text-center mb-4">
        <h5>Best in Production Number</h5>
      </div>
      <CTable bordered className="table-sm tableFinalResult " borderColor="dark">
        <CTableHead style={{ background: 'orange' }}>
          <CTableRow className="text-center">
            <CTableHeaderCell>Candidate #</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {consolidatedRank.map((row, index) => (
            <CTableRow key={row.id} className="text-center">
              <CTableDataCell className="text-left">{row.number}</CTableDataCell>
              <CTableDataCell className="text-left">{row.name}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <br />
      <Chairman />
      <br />
      <br />
      <br />
      <FinalFooter />
    </div>
  )
}

export default ProductionNumberPrintFinalResult
