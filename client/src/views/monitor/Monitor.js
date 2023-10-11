import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
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
import Swal from 'sweetalert2'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Dashboard = ({ userInfo }) => {
  const [monitorScore, setMonitorScore] = useState({})
  const [link, setLink] = useState('talent_presentation')
  const api = 'monitor'

  const navigate = useNavigate()
  useEffect(() => {
    // Check if the token is set in local storage or cookies
    const token = localStorage.getItem('token') // Assuming the token is stored in local storage

    if (!token) {
      // If the token is set, navigate to the dashboard
      navigate('/login', { replace: true })
    }
    fetchScore(link)
  }, [monitorScore])

  const fetchScore = async (link) => {
    try {
      const response = await axios.get(`${ip + api}?award=${link}`)
      const rawData = response.data

      setMonitorScore(rawData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const colors = [
    { value: 'Talent Presentation', link: 'talent_presentation' },
    { value: 'Production Number', link: 'production_number' },
    { value: 'Production Attire', link: 'production_attire' },
    { value: 'Swim Wear', link: 'swim_wear' },
    { value: 'Evening Gown', link: 'evening_gown' },
    { value: 'Top Five', link: 'top_five' },
    { value: 'Final Round', link: 'final_round' },
  ]
  return (
    <>
      <CRow>
        <CCol>
          {colors.map((row, rowIndex) => (
            <CButton
              onClick={() => {
                setLink(row.link)
              }}
              key={rowIndex}
              className="mx-1"
              color="primary"
              variant="outline"
            >
              {row.value}
            </CButton>
          ))}
        </CCol>
      </CRow>
      <CRow>
        {Object.keys(monitorScore).map((data) => (
          <CCol key={data}>
            <h2>{data}</h2>
            <CTable responsive striped hover bordered borderColor={'info'}>
              <CTableHead color="info" stripedColumns>
                <CTableRow className="text-center">
                  <CTableHeaderCell rowSpan={2} scope="col" className="centerTextRowspan">
                    Candidate #
                  </CTableHeaderCell>
                  <CTableHeaderCell rowSpan={2} scope="col" className="centerTextRowspan">
                    Judge
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Score</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Rank</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {monitorScore[data].map((row) => (
                  <CTableRow key={row.id} className="text-center">
                    <CTableDataCell className="text-left">{row.candidate}</CTableDataCell>
                    <CTableDataCell className="text-left">{row.judge}</CTableDataCell>
                    <CTableDataCell className="text-left">{row.score}</CTableDataCell>
                    <CTableDataCell className="text-left">{row.rank}</CTableDataCell>
                    <CTableDataCell className="text-left">
                      <CButton
                        color="danger"
                        size="sm"
                        className="text-white"
                        onClick={() => {
                          Swal.fire({
                            title: 'Delete',
                            html: 'Are you sure you want to delete this data?',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            icon: 'info',
                          }).then(async function (result) {
                            if (result.value) {
                              const response = await axios.delete(`${ip + api}`, {
                                params: { id: row.id, link },
                              })

                              Swal.fire({
                                title: 'Success!',
                                html: response.data.message,
                                icon: 'success',
                              })
                            }
                          })
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default Dashboard
