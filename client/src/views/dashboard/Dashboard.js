import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCol, CRow } from '@coreui/react'
import ip from './../../constant/ip'
import axios from 'axios'

import auditionImage from 'src/assets/images/event/audition.jpg'
import talentPresentationImage from 'src/assets/images/event/talent presentation.jpg'
import productionAttireImage from 'src/assets/images/event/production_attire.jpg'
import swimWearImage from 'src/assets/images/event/swim_wear.jpg'
import eveningGownImage from 'src/assets/images/event/evening_gown.jpg'
import topFiveImage from 'src/assets/images/event/top_5.jpg'
import finalRoundImage from 'src/assets/images/event/final_round.jpg'
import { faCheckCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dashboard = ({ userInfo }) => {
  const [menuItems, setMenuItems] = useState([])
  const images = [
    talentPresentationImage,
    productionAttireImage,
    // productionNumberImage,
    swimWearImage,
    eveningGownImage,
    topFiveImage,
    finalRoundImage,
    auditionImage,
  ]

  useEffect(() => {
    fetchSettings()
  }, [menuItems])

  const fetchSettings = async () => {
    try {
      const response = await axios.get(ip + 'settings')
      setMenuItems(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const navigate = useNavigate()
  useEffect(() => {
    // Check if the token is set in local storage or cookies
    const token = localStorage.getItem('token') // Assuming the token is stored in local storage

    if (!token) {
      // If the token is set, navigate to the dashboard
      navigate('/login', { replace: true })
    }
  }, [navigate])

  const maxMenuCharacters = 40

  // D

  const toggleHide = async (id, hide) => {
    const hideData = {
      id: id,
      hide: hide ? false : true,
    }

    const hideToogle = await axios.post(ip + 'settings/toggleHide', hideData)
    console.info(hideToogle)
  }

  // Function to truncate or pad the menu title to a fixed length
  const formatMenuTitle = (title) => {
    if (title.length > maxMenuCharacters) {
      return title.substring(0, maxMenuCharacters)
    } else if (title.length < maxMenuCharacters) {
      return title + ' '.repeat(maxMenuCharacters - title.length)
    } else {
      return title
    }
  }

  // Create an array to hold the actual menu items with formatted titles
  const formattedMenuItems = menuItems.map((menuItem) => ({
    ...menuItem,
    formattedTitle: formatMenuTitle(menuItem.title),
  }))

  // Function to render the CCard components based on the formatted menu array
  const renderMenuCards = () => {
    return formattedMenuItems.map((menuItem, index) => (
      <CCol
        xs="12"
        sm="6"
        md="4"
        lg="3"
        key={index}
        hidden={userInfo.role_type !== 'admin' && menuItem.hide}
      >
        <CCard className="text-center mb-3">
          <CCardImage
            orientation="top"
            src={images[index]}
            alt={menuItem.image}
            width={250}
            height={userInfo.role_type !== 'admin' && index === 1 ? 275 : 300}
          />
          <CCardBody>
            <CCardText>
              <strong>{menuItem.formattedTitle}</strong>
            </CCardText>
            <CButton
              size={userInfo.role_type === 'admin' && 'sm'}
              className={userInfo.role_type === 'admin' && 'mx-1'}
              onClick={() => navigate(menuItem.link, { replace: true })}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              {userInfo.role_type === 'admin' ? ' View Score' : ' Score'}
            </CButton>
            {userInfo.role_type === 'admin' && (
              <CButton
                color="danger"
                className="text-white"
                size="sm"
                onClick={() => toggleHide(menuItem.id, menuItem.hide)}
              >
                <FontAwesomeIcon icon={menuItem.hide ? faEye : faEyeSlash} />

                {menuItem.hide ? ' Show Event' : ' Hide Event'}
              </CButton>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    ))
  }
  return <CRow>{renderMenuCards()}</CRow>
}

export default Dashboard
