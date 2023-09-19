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
import { Header, Footer } from 'src/helper/report/ResultPerJudgeScore'

const ProductionAttirePrintPerJudge = () => {
  const api = 'production_attire'
  const [judgeScores, setJudgeScores] = useState([])

  useEffect(() => {
    fetchAllJudgeScores()
  }, [])

  const fetchAllJudgeScores = async () => {
    try {
      const response = await axios.get(`${ip + api}/getAllJudgeScores`)
      setJudgeScores(response.data) // Assuming the response is an array of judge score objects
    } catch (error) {
      console.error('Error fetching judge scores:', error)
      setJudgeScores([]) // Set an empty array if there's an error
    }
  }

  return (
    <>
      {judgeScores.map((judgeScore, index) => (
        <div key={index} className="printPerJudgePage">
          <Header />
          <div className="text-center my-5">
            <h5>Production Attire Judge&apos;s Score</h5>
          </div>
          <br />
          <CTable bordered className="table-sm tablePerJudge mb-5" borderColor="dark">
            <CTableHead style={{ background: 'orange' }}>
              <CTableRow className="text-center">
                <CTableHeaderCell scope="col">Candidate #</CTableHeaderCell>
                <CTableHeaderCell scope="col">Score</CTableHeaderCell>
                <CTableHeaderCell scope="col">Rank</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {judgeScore.scores.map((row, rowIndex) => (
                <CTableRow key={rowIndex} className="text-center">
                  <CTableDataCell>{row.candidateInfo.number}</CTableDataCell>
                  <CTableDataCell>{row.score}</CTableDataCell>
                  <CTableDataCell>{row.rank}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <br />
          <br />
          <br />
          <CRow className="justify-content-around evenly text-center mt-5 mb-5">
            <CCol>
              _____________________________________
              <br />
              Judge {index + 1}, Signature Over Printed Name
            </CCol>
          </CRow>
          <br />
          <br />
          <br />
          <Footer />
        </div>
      ))}
    </>
  )
}

export default ProductionAttirePrintPerJudge
