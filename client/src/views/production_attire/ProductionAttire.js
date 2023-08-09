import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Swal from 'sweetalert2'
import ip from './../../constant/ip'
import axios from 'axios'

const ProductionAttire = ({ userInfo }) => {
  const [candidate, setCandidate] = useState([])
  const [consolidatedRank, setConsolidatedRank] = useState([])

  useEffect(() => {
    fetchCandidate()
    fetchConsolidatedScoreAndRank()
  }, [candidate])

  const fetchCandidate = async () => {
    try {
      const response = await axios.get(ip + 'production_attire/getJudgeScore', {
        params: { judgeId: userInfo.id },
      })
      setCandidate(response.data)
      // console.info(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchConsolidatedScoreAndRank = async () => {
    try {
      const response = await axios.get(ip + 'production_attire/getConsolidatedScoreAndRank', {
        params: { judgeId: userInfo.id },
      })
      setConsolidatedRank(response.data)
      // console.info(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <h5>PRODUCTION ATTIRE</h5>
        </CCardHeader>
        <CCardBody>
          <CTable
            striped
            hover
            bordered={userInfo.role_type === 'admin' && true}
            borderColor={userInfo.role_type === 'admin' ? 'info' : ''}
          >
            <CTableHead color="info" stripedColumns>
              <CTableRow className="text-center">
                <CTableHeaderCell scope="col">Candidate #</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Judge 1</CTableHeaderCell>
                <CTableHeaderCell scope="col">Judge 2</CTableHeaderCell>
                <CTableHeaderCell scope="col">Judge 3</CTableHeaderCell>
                <CTableHeaderCell scope="col">Judge 4</CTableHeaderCell>
                <CTableHeaderCell scope="col">Judge 5</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total Score</CTableHeaderCell>
                <CTableHeaderCell scope="col">Final Rank</CTableHeaderCell>
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
        </CCardBody>
      </CCard>
    </>
  )
}

export default ProductionAttire
