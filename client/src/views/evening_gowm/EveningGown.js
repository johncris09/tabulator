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

const EveningGown = ({ userInfo }) => {
  const [candidate, setCandidate] = useState([])
  const [consolidatedRank, setConsolidatedRank] = useState([])
  const [modifiedEveningGownCandidateScores, setModifiedEveningGownCandidateScores] = useState({})
  const [modifiedTopFiveCandidateScores, setModifiedTopFiveCandidateScores] = useState({})

  useEffect(() => {
    fetchCandidate()
    fetchConsolidatedScoreAndRank()
  }, [candidate])

  const fetchCandidate = async () => {
    try {
      const response = await axios.get(ip + 'evening_gown/getJudgeScore', {
        params: { judgeId: userInfo.id },
      })
      setCandidate(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchConsolidatedScoreAndRank = async () => {
    try {
      const response = await axios.get(ip + 'evening_gown/getConsolidatedScoreAndRank', {
        params: { judgeId: userInfo.id },
      })
      setConsolidatedRank(response.data)
      // console.info(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleScoreChange = async (judgeId, candidateId, score, table) => {
    if (score < 1 || score > 10) {
      // Show error message
      Swal.fire({
        title: 'Error!',
        html: 'Please only provide ratings between 1 and 10.',
        icon: 'error',
      })

      if (table === 'evening_gown') {
        setModifiedEveningGownCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: prevScores,
        }))
      } else if (table === 'top_five') {
        setModifiedTopFiveCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: prevScores,
        }))
      }
    } else {
      if (table === 'evening_gown') {
        setModifiedEveningGownCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: score,
        }))
      } else if (table === 'top_five') {
        setModifiedTopFiveCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: score,
        }))
      }

      const scoreData = {
        candidateId: candidateId,
        judgeId: judgeId,
        score: score,
      }
      const response = await axios.post(ip + table, scoreData)
      console.info(response)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <h5>BEST IN EVENING GOWN</h5>
        </CCardHeader>
        <CCardBody>
          {/* Criteria */}
          {userInfo.role_type !== 'admin' && (
            <CTable
              style={{
                fontSize: '12px',
              }}
            >
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell colSpan="2" className="text-danger">
                    Criteria
                  </CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Best in Swim Wear</CTableHeaderCell>
                  <CTableDataCell>
                    Each candidate will be rated 1 to 10, 1 being the lowest and 10 being the
                    highest based on{' '}
                    <strong>
                      Attire to Candidate&apos;s Match, Poise and Carriage and General Beauty.
                    </strong>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Top Five</CTableHeaderCell>
                  <CTableDataCell>
                    Each candidate will be rated 1 to 10, 1 being the lowest and 10 being the
                    highest based on{' '}
                    <strong>
                      Beauty and Face Charm, Poise, Grace and Carriage, Stage Projection, Wit and
                      Intelligence.
                    </strong>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          )}
          <CTable striped hover bordered borderColor={userInfo.role_type === 'admin' ? 'info' : ''}>
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
                <>
                  <CTableRow className="text-center" color="warning">
                    <CTableHeaderCell></CTableHeaderCell>
                    <CTableHeaderCell colSpan="2">Evening Gown</CTableHeaderCell>
                    <CTableHeaderCell colSpan="2"> Top Five</CTableHeaderCell>
                  </CTableRow>
                  <CTableRow className="text-center">
                    <CTableHeaderCell>Candidate #</CTableHeaderCell>
                    <CTableHeaderCell>Score</CTableHeaderCell>
                    <CTableHeaderCell>Rank</CTableHeaderCell>
                    <CTableHeaderCell>Score</CTableHeaderCell>
                    <CTableHeaderCell>Rank</CTableHeaderCell>
                  </CTableRow>
                </>
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
                    <CTableRow key={candidateInfo.number} className="text-center">
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
                            modifiedEveningGownCandidateScores[candidateInfo.id] !== undefined
                              ? modifiedEveningGownCandidateScores[candidateInfo.id]
                              : candidateInfo.ev_score || ''
                          }
                          onChange={(e) =>
                            handleScoreChange(
                              userInfo.id,
                              candidateInfo.id,
                              e.target.value,
                              'evening_gown',
                            )
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell>{candidateInfo.ev_rank}</CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          className="text-center"
                          type="number"
                          min="0"
                          max="10"
                          data-judge-id={userInfo.id}
                          data-candidate-id={candidateInfo.id}
                          value={
                            modifiedTopFiveCandidateScores[candidateInfo.id] !== undefined
                              ? modifiedTopFiveCandidateScores[candidateInfo.id]
                              : candidateInfo.tf_score || ''
                          }
                          onChange={(e) =>
                            handleScoreChange(
                              userInfo.id,
                              candidateInfo.id,
                              e.target.value,
                              'top_five',
                            )
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell>{candidateInfo.tf_rank}</CTableDataCell>
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

export default EveningGown
