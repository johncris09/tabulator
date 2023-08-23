import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLock, faLockOpen, faPrint } from '@fortawesome/free-solid-svg-icons'
import './../../assets/css/custom.css'

const ProductionNumber = ({ userInfo }) => {
  const api = 'production_number'
  const productionNumberInputRefs = useRef([])
  const productionAttireInputRefs = useRef([])
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState([])
  const [consolidatedRank, setConsolidatedRank] = useState([])
  const [modifiedProductionNumberCandidateScores, setModifiedProductionNumberCandidateScores] =
    useState({})
  const [modifiedProductionAttireCandidateScores, setModifiedProductionAttireCandidateScores] =
    useState({})
  const [modifiedTopFiveCandidateScores, setModifiedTopFiveCandidateScores] = useState({})

  useEffect(() => {
    fetchCandidate()
    fetchConsolidatedScoreAndRank()
  }, [candidate])

  const handleProductionNumberRef = (index, ref) => {
    productionNumberInputRefs.current[index] = ref
  }
  const handleProductionAttireRef = (index, ref) => {
    productionAttireInputRefs.current[index] = ref
  }
  const fetchCandidate = async () => {
    try {
      const response = await axios.get(`${ip + api}/getJudgeScore`, {
        params: { judgeId: userInfo.id },
      })
      setCandidate(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchConsolidatedScoreAndRank = async () => {
    try {
      const response = await axios.get(`${ip + api}/getConsolidatedScoreAndRank`, {
        params: { judgeId: userInfo.id },
      })
      setConsolidatedRank(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleScoreChange = async (judgeId, candidateId, score, table) => {
    if (score === '') {
      if (table === 'production_number') {
        setModifiedProductionNumberCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: '',
        }))
      } else if (table === 'production_attire') {
        setModifiedProductionAttireCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: '',
        }))
      } else if (table === 'top_five') {
        setModifiedTopFiveCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: '',
        }))
      }

      // delete the score and rank of the candidate
      await axios.delete(`${ip + table}`, {
        params: { candidateId: candidateId, judgeId: judgeId },
      })
    } else if (score < 1 || score > 10) {
      // Show error message
      Swal.fire({
        title: 'Error!',
        html: 'Please only provide ratings between 1 and 10.',
        icon: 'error',
      })

      if (table === 'production_number') {
        setModifiedProductionNumberCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: prevScores,
        }))
      } else if (table === 'production_attire') {
        setModifiedProductionAttireCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: prevScores,
        }))
      } else if (table === 'top_five') {
        setModifiedTopFiveCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: prevScores,
        }))
      }
      // delete the score and rank of the candidate
      await axios.delete(`${ip + table}`, {
        params: { candidateId: candidateId, judgeId: judgeId },
      })
    } else {
      if (table === 'production_number') {
        setModifiedProductionNumberCandidateScores((prevScores) => ({
          ...prevScores,
          [candidateId]: score,
        }))
      } else if (table === 'production_attire') {
        setModifiedProductionAttireCandidateScores((prevScores) => ({
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
      await axios.post(`${ip + table}`, scoreData)
    }
  }

  const handleProductionNumberScoreSubmit = async () => {
    // Check if at least one input is empty
    let allInputsFilled = true // Assume all inputs are filled initially

    for (let i = 0; i < productionNumberInputRefs.current.length; i++) {
      const input = productionNumberInputRefs.current[i]
      if (!input || !input.value) {
        allInputsFilled = false // Found an empty input
        break // No need to continue checking, one empty input is enough to fail
      }
    }
    if (allInputsFilled) {
      Swal.fire({
        title: 'Is this your final Score?',
        html: "This tabulator will be locked once you have submitted your score. Please review your score. <br> <span class='text-danger'><small>Note: If you want to adjust your score, you can consult with administrator.</small></span>  ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
      }).then(async function (result) {
        if (result.value) {
          const lockData = {
            judgeId: userInfo.id,
            status: 'locked',
          }

          const response = await axios.post(`${ip + api}/lockScore`, lockData)

          Swal.fire({
            title: 'Success!',
            html: response.data.message,
            icon: 'success',
          })
        }
      })
    } else {
      Swal.fire({
        title: 'Error!',
        html: 'All inputs must filled in',
        icon: 'error',
      })
    }
  }

  const handleProductionAttireScoreSubmit = async () => {
    // Check if at least one input is empty
    let allInputsFilled = true // Assume all inputs are filled initially

    for (let i = 0; i < productionAttireInputRefs.current.length; i++) {
      const input = productionAttireInputRefs.current[i]
      if (!input || !input.value) {
        allInputsFilled = false // Found an empty input
        break // No need to continue checking, one empty input is enough to fail
      }
    }
    if (allInputsFilled) {
      Swal.fire({
        title: 'Is this your final Score?',
        html: "This tabulator will be locked once you have submitted your score. Please review your score. <br> <span class='text-danger'><small>Note: If you want to adjust your score, you can consult with administrator.</small></span>  ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
      }).then(async function (result) {
        if (result.value) {
          const lockData = {
            judgeId: userInfo.id,
            status: 'locked',
          }

          const response = await axios.post(`${ip}production_attire/lockScore`, lockData)

          Swal.fire({
            title: 'Success!',
            html: response.data.message,
            icon: 'success',
          })
        }
      })
    } else {
      Swal.fire({
        title: 'Error!',
        html: 'All inputs must filled in',
        icon: 'error',
      })
    }
  }
  const handleToggleLockScore = async (judgeNo, isLocked) => {
    if (isLocked) {
      Swal.fire({
        title: 'Enter Secret Key To Unlock',
        input: 'password',
        icon: 'info',
        customClass: {
          validationMessage: 'my-validation-message',
        },
        preConfirm: (value) => {
          if (!value) {
            Swal.showValidationMessage('This field is required')
          }
        },
        showCancelButton: true,
        confirmButtonText: 'Unlock',
      }).then(async function (result) {
        if (result.value) {
          if (result.value === 'MIS1234') {
            const lockData = {
              judgeId: judgeNo,
              status: 'unlocked',
            }

            await axios.post(`${ip + api}/lockScore`, lockData)

            Swal.fire({
              title: 'Success!',
              html: 'Unlocked successfully!',
              icon: 'success',
            })
          } else {
            Swal.fire({
              title: 'Error!',
              html: 'Invalid Secrey Key',
              icon: 'error',
            })
          }
        }
      })
    } else {
      Swal.fire({
        html: 'Nothing to unlocked',
        icon: 'info',
      })
    }
  }

  const handlePrintJudgeScore = async () => {
    // check if all judge is done scoring
    const isAllJudgeDoneScoring = await axios.get(`${ip + api}/isAllJudgeDoneScoring`)

    if (isAllJudgeDoneScoring.data) {
      navigate(`per_judge`)
    } else {
      Swal.fire({
        title: 'Unavailable this time',
        icon: 'error',
        text: 'Please wait until all judges have completed their scoring.',
      })
    }
  }
  const handlePrintSummary = async () => {
    // check if all judge is done scoring
    const isAllJudgeDoneScoring = await axios.get(`${ip + api}/isAllJudgeDoneScoring`)

    if (isAllJudgeDoneScoring.data) {
      navigate(`summary`)
    } else {
      Swal.fire({
        title: 'Unavailable this time',
        icon: 'error',
        text: 'Please wait until all judges have completed their scoring.',
      })
    }
  }
  const handlePrintResult = async () => {
    // check if all judge is done scoring
    const isAllJudgeDoneScoring = await axios.get(`${ip + api}/isAllJudgeDoneScoring`)

    if (isAllJudgeDoneScoring.data) {
      navigate(`final_result`)
    } else {
      Swal.fire({
        title: 'Unavailable this time',
        icon: 'error',
        text: 'Please wait until all judges have completed their scoring.',
      })
    }
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="justify-content-between">
            <CCol>
              <h5>PRODUCTION NUMBER</h5>
            </CCol>
            <CCol>
              {userInfo.role_type === 'admin' && (
                <>
                  <CButtonGroup className="float-end mx-1">
                    <CButton
                      disabled={candidate.some(
                        (candidateInfo) => candidateInfo.status === 'locked',
                      )}
                      color="primary"
                      size="sm"
                      onClick={handlePrintJudgeScore}
                    >
                      <FontAwesomeIcon icon={faPrint} /> Print The Judge&apos;s Score
                    </CButton>

                    <CButton
                      disabled={candidate.some(
                        (candidateInfo) => candidateInfo.status === 'locked',
                      )}
                      color="primary"
                      size="sm"
                      variant="outline"
                      onClick={handlePrintSummary}
                    >
                      <FontAwesomeIcon icon={faPrint} /> Print Summary
                    </CButton>
                    <CButton
                      disabled={candidate.some(
                        (candidateInfo) => candidateInfo.status === 'locked',
                      )}
                      color="primary"
                      size="sm"
                      onClick={handlePrintResult}
                    >
                      <FontAwesomeIcon icon={faPrint} /> Print Result
                    </CButton>
                  </CButtonGroup>
                </>
              )}
            </CCol>
          </CRow>
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
                  <CTableHeaderCell>Production Number</CTableHeaderCell>
                  <CTableDataCell>
                    Each candidate will be rated 1 to 10, 1 being the lowest and 10 being the
                    highest based on <strong>Mastery, Gracefulness and Stage Projection.</strong>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Production Attire</CTableHeaderCell>
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
                <>
                  <CTableRow className="text-center">
                    <CTableHeaderCell rowSpan={2} scope="col" className="centerTextRowspan">
                      Candidate #
                    </CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2} scope="col" className="centerTextRowspan">
                      Name
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Judge 1</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Judge 2 </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Judge 3</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Judge 4</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Judge 5</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2} scope="col" className="centerTextRowspan">
                      Total Score
                    </CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2} scope="col" className="centerTextRowspan">
                      Final Rank
                    </CTableHeaderCell>
                  </CTableRow>
                  <CTableRow className="text-center">
                    <CTableHeaderCell scope="col">
                      <FontAwesomeIcon
                        color={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge1_status === 'locked',
                          )
                            ? 'green'
                            : 'red'
                        }
                        onClick={() => {
                          const judgeId = consolidatedRank[0].judge1_id
                          const hasLockedStatus = consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge1_status === 'locked',
                          )
                          handleToggleLockScore(judgeId, hasLockedStatus)
                        }}
                        icon={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge1_status === 'locked',
                          )
                            ? faLock
                            : faLockOpen
                        }
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <FontAwesomeIcon
                        color={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge2_status === 'locked',
                          )
                            ? 'green'
                            : 'red'
                        }
                        onClick={() => {
                          const judgeId = consolidatedRank[0].judge2_id
                          const hasLockedStatus = consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge2_status === 'locked',
                          )
                          handleToggleLockScore(judgeId, hasLockedStatus)
                        }}
                        icon={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge2_status === 'locked',
                          )
                            ? faLock
                            : faLockOpen
                        }
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <FontAwesomeIcon
                        color={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge3_status === 'locked',
                          )
                            ? 'green'
                            : 'red'
                        }
                        onClick={() => {
                          const judgeId = consolidatedRank[0].judge3_id
                          const hasLockedStatus = consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge3_status === 'locked',
                          )
                          handleToggleLockScore(judgeId, hasLockedStatus)
                        }}
                        icon={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge3_status === 'locked',
                          )
                            ? faLock
                            : faLockOpen
                        }
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <FontAwesomeIcon
                        color={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge4_status === 'locked',
                          )
                            ? 'green'
                            : 'red'
                        }
                        onClick={() => {
                          const judgeId = consolidatedRank[0].judge4_id
                          const hasLockedStatus = consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge4_status === 'locked',
                          )
                          handleToggleLockScore(judgeId, hasLockedStatus)
                        }}
                        icon={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge4_status === 'locked',
                          )
                            ? faLock
                            : faLockOpen
                        }
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <FontAwesomeIcon
                        color={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge5_status === 'locked',
                          )
                            ? 'green'
                            : 'red'
                        }
                        onClick={() => {
                          const judgeId = consolidatedRank[0].judge5_id
                          const hasLockedStatus = consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge5_status === 'locked',
                          )
                          handleToggleLockScore(judgeId, hasLockedStatus)
                        }}
                        icon={
                          consolidatedRank.some(
                            (candidateInfo) => candidateInfo.judge5_status === 'locked',
                          )
                            ? faLock
                            : faLockOpen
                        }
                      />
                    </CTableHeaderCell>
                  </CTableRow>
                </>
              ) : (
                <>
                  <CTableRow className="text-center">
                    <CTableHeaderCell rowSpan={3} className="centerTextRowspan">
                      Candidate #
                    </CTableHeaderCell>
                    <CTableHeaderCell colSpan="2">Production Number</CTableHeaderCell>
                    <CTableHeaderCell colSpan="2">Production Attire</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2} colSpan="2" className="centerTextRowspan">
                      Top Five
                    </CTableHeaderCell>
                  </CTableRow>
                  <CTableRow className="text-center">
                    <CTableHeaderCell colSpan="2">
                      <CButton
                        disabled={candidate.some(
                          (candidateInfo) => candidateInfo.pn_status === 'locked',
                        )}
                        size="sm"
                        color="primary"
                        onClick={handleProductionNumberScoreSubmit}
                      >
                        <FontAwesomeIcon icon={faCheck} /> Submit Scores
                      </CButton>
                    </CTableHeaderCell>
                    <CTableHeaderCell colSpan="2">
                      <CButton
                        disabled={candidate.some(
                          (candidateInfo) => candidateInfo.pa_status === 'locked',
                        )}
                        size="sm"
                        color="primary"
                        onClick={handleProductionAttireScoreSubmit}
                      >
                        <FontAwesomeIcon icon={faCheck} /> Submit Scores
                      </CButton>
                    </CTableHeaderCell>
                  </CTableRow>
                  <CTableRow className="text-center">
                    <CTableHeaderCell>Score</CTableHeaderCell>
                    <CTableHeaderCell>Rank</CTableHeaderCell>
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
                          ref={(ref) => handleProductionNumberRef(index, ref)}
                          readOnly={candidateInfo.pn_status === 'locked' && true}
                          style={
                            candidateInfo.pn_status === 'locked' ? { background: '#F9F5F6' } : {}
                          }
                          className="text-center"
                          type="number"
                          min="0"
                          max="10"
                          data-judge-id={userInfo.id}
                          data-candidate-id={candidateInfo.id}
                          value={
                            modifiedProductionNumberCandidateScores[candidateInfo.id] !== undefined
                              ? modifiedProductionNumberCandidateScores[candidateInfo.id]
                              : candidateInfo.pn_score || ''
                          }
                          onChange={(e) =>
                            handleScoreChange(
                              userInfo.id,
                              candidateInfo.id,
                              e.target.value,
                              'production_number',
                            )
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell>{candidateInfo.pn_rank}</CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          ref={(ref) => handleProductionAttireRef(index, ref)}
                          readOnly={candidateInfo.pa_status === 'locked' && true}
                          style={
                            candidateInfo.pa_status === 'locked' ? { background: '#F9F5F6' } : {}
                          }
                          className="text-center"
                          type="number"
                          min="0"
                          max="10"
                          data-judge-id={userInfo.id}
                          data-candidate-id={candidateInfo.id}
                          value={
                            modifiedProductionAttireCandidateScores[candidateInfo.id] !== undefined
                              ? modifiedProductionAttireCandidateScores[candidateInfo.id]
                              : candidateInfo.pa_score || ''
                          }
                          onChange={(e) =>
                            handleScoreChange(
                              userInfo.id,
                              candidateInfo.id,
                              e.target.value,
                              'production_attire',
                            )
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell>{candidateInfo.pa_rank}</CTableDataCell>
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

export default ProductionNumber
