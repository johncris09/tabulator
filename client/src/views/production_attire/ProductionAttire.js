import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
import { faLock, faLockOpen, faPrint } from '@fortawesome/free-solid-svg-icons'

const ProductionAttire = ({ userInfo }) => {
  const navigate = useNavigate()
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
    } catch (error) {
      console.error('Error fetching data:', error)
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

            await axios.post(ip + 'production_attire/lockScore', lockData)

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
    const isAllJudgeDoneScoring = await axios.get(ip + 'production_attire/isAllJudgeDoneScoring')

    if (isAllJudgeDoneScoring.data) {
      navigate('/production_attire/per_judge')
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
    const isAllJudgeDoneScoring = await axios.get(ip + 'production_attire/isAllJudgeDoneScoring')

    if (isAllJudgeDoneScoring.data) {
      navigate('/production_attire/summary')
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
    const isAllJudgeDoneScoring = await axios.get(ip + 'production_attire/isAllJudgeDoneScoring')

    if (isAllJudgeDoneScoring.data) {
      navigate('/production_attire/final_result')
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
              <h5>PRODUCTION ATTIRE</h5>
            </CCol>
            <CCol>
              <CButtonGroup className="float-end mx-1">
                <CButton
                  disabled={candidate.some((candidateInfo) => candidateInfo.status === 'locked')}
                  color="primary"
                  size="sm"
                  onClick={handlePrintJudgeScore}
                >
                  <FontAwesomeIcon icon={faPrint} /> Print The Judge&apos;s Score
                </CButton>

                <CButton
                  disabled={candidate.some((candidateInfo) => candidateInfo.status === 'locked')}
                  color="primary"
                  size="sm"
                  variant="outline"
                  onClick={handlePrintSummary}
                >
                  <FontAwesomeIcon icon={faPrint} /> Print Summary
                </CButton>
                <CButton
                  disabled={candidate.some((candidateInfo) => candidateInfo.status === 'locked')}
                  color="primary"
                  size="sm"
                  onClick={handlePrintResult}
                >
                  <FontAwesomeIcon icon={faPrint} /> Print Result
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable responsive striped hover bordered borderColor={'info'}>
            <CTableHead color="info" stripedColumns>
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
