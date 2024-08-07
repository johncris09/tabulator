import React, { useEffect, useState, useRef } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import { useFormik } from 'formik'

import * as Yup from 'yup'
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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormText,
  CForm,
} from '@coreui/react'
import Swal from 'sweetalert2'
import ip from '../../constant/ip'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faLock,
  faLockOpen,
  faPlusCircle,
  faPrint,
} from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import { cilList, cilPen, cilTrash } from '@coreui/icons'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
const Candidate = ({ userInfo }) => {
  const queryClient = useQueryClient()
  const api = 'candidate'
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const [consolidatedRank, setConsolidatedRank] = useState([])
  const [modifiedCandidateScores, setModifiedCandidateScores] = useState({})

  const [modalVisible, setModalVisible] = useState(true)

  useEffect(() => {
    // Check if the token is set in local storage or cookies
    const token = localStorage.getItem('token') // Assuming the token is stored in local storage

    if (!token) {
      // If the token is set, navigate to the dashboard
      navigate('/login', { replace: true })
    }
  }, [])

  const handleRef = (index, ref) => {
    inputRefs.current[index] = ref
  }

  const candidate = useQuery({
    queryFn: async () =>
      await axios.get(`${ip + api}`).then((response) => {
        return response.data
      }),
    queryKey: ['candidate'],
    staleTime: Infinity,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target

    form.setFieldValue(name, value)
  }

  const validationSchema = Yup.object().shape({
    supplier: Yup.string().required('Supplier Name is required'),
  })
  const form = useFormik({
    initialValues: {
      id: '',
      number: '',
      name: '',
      age: '',
      sponsor: '',
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.id) {
        await updateSupplier.mutate(values)
      } else {
        await insertSupplier.mutate(values)
      }
    },
  })

  const insertSupplier = useMutation({
    mutationFn: async (values) => {
      console.info(`${ip + api}/insert`)
      return await api.post(`${ip + api}/insert`, values)
    },
    onSuccess: async (response) => {
      console.info(response.data)
      // if (response.data.status) {
      //   toast.success(response.data.message)
      // }
      // form.resetForm()
      // // tripTicketProductInputRef.current.clearValue()
      // await queryClient.invalidateQueries(['supplier'])
    },
    onError: (error) => {
      toast.error('Duplicate Entry!')
    },
  })
  const updateSupplier = useMutation({
    mutationFn: async (values) => {
      return await api.put('supplier/update/' + values.id, values)
    },
    onSuccess: async (response) => {
      if (response.data.status) {
        toast.success(response.data.message)
      }
      form.resetForm()
      setModalVisible(false)
      await queryClient.invalidateQueries(['supplier'])
    },
    onError: (error) => {
      console.info(error.response.data)
      // toast.error(error.response.data.message)
    },
  })

  const handleScoreChange = async (judgeId, candidateId, score) => {
    // Validate the score
    if (score === '') {
      // Reset the score to an empty string in the state
      setModifiedCandidateScores((prevScores) => ({
        ...prevScores,
        [candidateId]: '',
      }))

      // Delete the score and rank of the candidate
      await axios.delete(`${ip + api}`, {
        params: { candidateId: candidateId, judgeId: judgeId },
      })
    } else if (score < 1 || score > 10) {
      Swal.fire({
        title: 'Error!',
        html: 'Please only provide ratings between 1 and 10.',
        icon: 'error',
      })

      // Reset the score to the previous value in the state
      setModifiedCandidateScores((prevScores) => ({
        ...prevScores,
        [candidateId]: prevScores[candidateId],
      }))

      // Delete the score and rank of the candidate
      await axios.delete(`${ip + api}`, {
        params: { candidateId: candidateId, judgeId: judgeId },
      })
    } else {
      // Update the score in the state
      setModifiedCandidateScores((prevScores) => ({
        ...prevScores,
        [candidateId]: score,
      }))

      const scoreData = {
        candidateId: candidateId,
        judgeId: judgeId,
        score: score,
      }

      // Perform the POST request to update the score
      const response = await axios.post(`${ip + api}`, scoreData)
    }
  }

  const handleAddNew = () => {
    setModalVisible(true)
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="justify-content-between">
            <CCol>
              <h5>Candidate</h5>
            </CCol>
            <CCol>
              <CButtonGroup className="float-end mx-1">
                <CButton
                  // disabled={candidate.some((candidateInfo) => candidateInfo.status === 'locked')}
                  color="primary"
                  size="sm"
                  onClick={handleAddNew}
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> Add New
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable className="userCriteriaTable">
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Age</CTableHeaderCell>
                <CTableHeaderCell>Sponsor</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
              {!candidate.isLoading &&
                candidate.data.map((row, index) => (
                  <CTableRow key={row.id}>
                    <CTableDataCell>{row.number}</CTableDataCell>
                    <CTableDataCell>{row.name}</CTableDataCell>
                    <CTableDataCell>{row.age}</CTableDataCell>
                    <CTableDataCell>{row.sponsor}</CTableDataCell>
                    <CTableDataCell>
                      <CIcon className="text-warning" icon={cilPen} size="xs" title="Edit" />
                      <CIcon className="text-danger" icon={cilTrash} size="xs" title="Delete" />
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal
        alignment="center"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        backdrop="static"
        keyboard={false}
        size="md"
      >
        <CModalHeader>
          <CModalTitle>{form.values.id ? `Edit Candidate` : `Add New Candidate`}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-2" onSubmit={form.handleSubmit}>
            <CRow>
              <CCol md={12}>
                <CFormInput
                  type="number"
                  label="Number"
                  name="number"
                  onChange={handleInputChange}
                  value={form.values.number}
                  placeholder="Number"
                  invalid={form.touched.number && form.errors.number}
                />
                {form.touched.number && form.errors.number && (
                  <CFormText classNumber="text-danger">{form.errors.number}</CFormText>
                )}
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Name"
                  name="name"
                  onChange={handleInputChange}
                  value={form.values.name}
                  placeholder="Name"
                  invalid={form.touched.name && form.errors.name}
                />
                {form.touched.name && form.errors.name && (
                  <CFormText className="text-danger">{form.errors.name}</CFormText>
                )}
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="number"
                  label="Age"
                  name="age"
                  onChange={handleInputChange}
                  value={form.values.age}
                  placeholder="Age"
                  invalid={form.touched.age && form.errors.age}
                />
                {form.touched.age && form.errors.age && (
                  <CFormText className="text-danger">{form.errors.age}</CFormText>
                )}
              </CCol>

              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Sponsor"
                  name="sponsor"
                  onChange={handleInputChange}
                  value={form.values.sponsor}
                  placeholder="Sponsor"
                  invalid={form.touched.sponsor && form.errors.sponsor}
                />
                {form.touched.sponsor && form.errors.sponsor && (
                  <CFormText className="text-danger">{form.errors.sponsor}</CFormText>
                )}
              </CCol>
            </CRow>

            <hr />
            <CRow>
              <CCol xs={12}>
                <CButton color="primary" type="submit" className="float-end">
                  {form.values.id ? 'Update' : 'Submit'}
                </CButton>
              </CCol>
            </CRow>
          </CForm>
          {/* {(insertSupplier.isPending || updateSupplier.isPending) && <DefaultLoading />} */}
        </CModalBody>
      </CModal>
    </>
  )
}

export default Candidate
