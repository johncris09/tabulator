import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCol, CRow } from '@coreui/react'

import talentPresentationImage from 'src/assets/images/event/talent presentation.jpg'
import productionAttireImage from 'src/assets/images/event/production_attire.jpg'
import productionNumberImage from 'src/assets/images/event/production_number.jpg'
import swimWearImage from 'src/assets/images/event/swim_wear.jpg'
import eveningGownImage from 'src/assets/images/event/evening_gown.jpg'
import topFiveImage from 'src/assets/images/event/top_5.jpg'
import finalRoundImage from 'src/assets/images/event/final_round.jpg'

const Dashboard = ({ userInfo }) => {
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

  // Define the menuItems array directly within the component
  const menuItems = [
    {
      title: 'TALENT PRESENTATION',
      image: talentPresentationImage,
      link: 'http://localhost:3000/#/talent_presentation',
    },
    ...(userInfo.role_type !== 'admin'
      ? [
          {
            title: 'PRODUCTION NUMBER & PRODUCTION ATTIRE',
            image: productionAttireImage,
            link: 'http://localhost:3000/#/production_number',
          },
        ]
      : [
          {
            title: 'PRODUCTION NUMBER',
            image: productionAttireImage,
            link: 'http://localhost:3000/#/production_number',
          },
          {
            title: 'PRODUCTION ATTIRE',
            image: productionNumberImage,
            link: 'http://localhost:3000/#/production_attire',
          },
        ]),
    {
      title: 'BEST IN SWIM WEAR',
      image: swimWearImage,
      link: 'http://localhost:3000/#/swim_wear',
    },
    {
      title: 'BEST IN EVENING GOWN',
      image: eveningGownImage,
      link: 'http://localhost:3000/#/evening_gown',
    },
    {
      title: 'TOP FIVE',
      image: topFiveImage,
      link: 'http://localhost:3000/#/top_five',
    },
    {
      title: 'FINAL ROUND',
      image: finalRoundImage,
      link: 'http://localhost:3000/#/final_round',
    },
  ]

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
      <CCol xs="12" sm="6" md="4" lg="3" key={index}>
        <CCard className="text-center mb-3">
          <CCardImage
            orientation="top"
            src={menuItem.image}
            width={250}
            height={userInfo.role_type !== 'admin' && index === 1 ? 275 : 300}
          />
          <CCardBody>
            <CCardText>
              <strong>{menuItem.formattedTitle}</strong>
            </CCardText>
            <CButton href={menuItem.link}>
              {userInfo.role_type === 'admin' ? 'View Score' : 'Score'}
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    ))
  }
  return <CRow>{renderMenuCards()}</CRow>
}

export default Dashboard
