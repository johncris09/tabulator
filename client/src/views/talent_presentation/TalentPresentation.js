import React, { useEffect, useState } from 'react'
import {
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import ip from './../../constant/ip'
import axios from 'axios'

const Dashboard = ({ userInfo }) => {
  const [candidate, setCandidate] = useState([])
  const [modifiedCandidateScores, setModifiedCandidateScores] = useState({})

  useEffect(() => {
    fetchCandidate()
  }, [])

  const fetchCandidate = async () => {
    try {
      const response = await axios.get(ip + 'talent_presentation/getJudgeScore', {
        params: { judgeId: userInfo.id },
      })
      setCandidate(response.data)
      console.info(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleScoreChange = async (judgeId, candidateId, score) => {
    console.info({ judgeId, candidateId, score })
    setModifiedCandidateScores((prevScores) => ({
      ...prevScores,
      [candidateId]: score,
    }))

    const scoreData = {
      candidateId: candidateId,
      judgeId: judgeId,
      score: score,
    }
    const InserScore = await axios.post(ip + 'talent_presentation', scoreData)
    console.info(InserScore.data)
  }

  return (
    <>
      <CTable hover className="bg-white">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Candidate #</CTableHeaderCell>
            <CTableHeaderCell scope="col">Score</CTableHeaderCell>
            <CTableHeaderCell scope="col">Rank</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {candidate.map((candidateInfo, index) => (
            <CTableRow key={candidateInfo.id}>
              <CTableDataCell>{candidateInfo.number}</CTableDataCell>
              <CTableDataCell>
                <CFormInput
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
              <CTableDataCell></CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Dashboard
