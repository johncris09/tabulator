import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const TalentPresentation = React.lazy(() =>
  import('./views/talent_presentation/TalentPresentation'),
)
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/talent_presentation', name: 'Talent Presentation', element: TalentPresentation },
]

export default routes
