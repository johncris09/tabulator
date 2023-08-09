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

const TalentPresentation = ({ userInfo }) => {
  const [candidate, setCandidate] = useState([])
  const [consolidatedRank, setConsolidatedRank] = useState([])
  const [modifiedCandidateScores, setModifiedCandidateScores] = useState({})

  useEffect(() => {
    fetchCandidate()
    fetchConsolidatedScoreAndRank()
  }, [candidate])

  const fetchCandidate = async () => {
    try {
      const response = await axios.get(ip + 'talent_presentation/getJudgeScore', {
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
      const response = await axios.get(ip + 'talent_presentation/getConsolidatedScoreAndRank', {
        params: { judgeId: userInfo.id },
      })
      setConsolidatedRank(response.data)
      // console.info(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleScoreChange = async (judgeId, candidateId, score) => {
    if (score < 1 || score > 10) {
      // Show error message
      Swal.fire({
        title: 'Error!',
        html: 'Please only provide ratings between 1 and 10.',
        icon: 'error',
      })
      setModifiedCandidateScores((prevScores) => ({
        ...prevScores,
        [candidateId]: prevScores,
      }))
    } else {
      // console.info({ judgeId, candidateId, score })
      setModifiedCandidateScores((prevScores) => ({
        ...prevScores,
        [candidateId]: score,
      }))

      const scoreData = {
        candidateId: candidateId,
        judgeId: judgeId,
        score: score,
      }
      await axios.post(ip + 'talent_presentation', scoreData)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <h5>TALENT PRESENTATION</h5>
          {userInfo.role_type !== 'admin' && (
            <>
              <hr className="border" />
              <p
                style={{
                  fontSize: '12px',
                }}
              >
                <span className="text-danger font-weight-bold">Criteria:</span> Each candidate will
                be rated 1 to 10, 1 being the lowest and 10 being the highest based on
                <strong>
                  Reality of Talent, Deportment/Stage Presence, Performance/Mastery, Costume &
                  Relevance of Props.
                </strong>
              </p>
            </>
          )}
        </CCardHeader>
        <CCardBody>
          <CTable
            striped
            hover
            bordered={userInfo.role_type === 'admin' && true}
            borderColor={userInfo.role_type === 'admin' ? 'info' : ''}
          >
            <CTableHead color="info" stripedColumns>
              {userInfo.role_type === 'admin' ? (
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
              ) : (
                <CTableRow className="text-center">
                  <CTableHeaderCell scope="col">Candidate #</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Score</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Rank</CTableHeaderCell>
                </CTableRow>
              )}
            </CTableHead>

            <CTableBody>
              {userInfo.role_type === 'admin' ? (
                <>
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
                </>
              ) : (
                <>
                  {candidate.map((candidateInfo, index) => (
                    <CTableRow key={candidateInfo.id} className="text-center">
                      <CTableDataCell>{candidateInfo.number}</CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          className="text-center"
                          type="number"
                          min="0"
                          max="10"
                          data-judge-id={userInfo.id}
                          data-candidate-id={candidateInfo.id}
                          value={
                            modifiedCandidateScores[candidateInfo.id] !== undefined
                              ? modifiedCandidateScores[candidateInfo.id]
                              : candidateInfo.score || ''
                          }
                          onChange={(e) =>
                            handleScoreChange(
                              e.target.getAttribute('data-judge-id'),
                              e.target.getAttribute('data-candidate-id'),
                              e.target.value,
                            )
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell>{candidateInfo.rank}</CTableDataCell>
                    </CTableRow>
                  ))}
                </>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TalentPresentation
