import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const TalentPresentation = React.lazy(() =>
  import('./views/talent_presentation/TalentPresentation'),
)
const ProductionNumber = React.lazy(() => import('./views/production_number/ProductionNumber'))
const ProductionAttire = React.lazy(() => import('./views/production_attire/ProductionAttire'))
const SwimWear = React.lazy(() => import('./views/swim_wear/SwimWear'))
const EveningGown = React.lazy(() => import('./views/evening_gowm/EveningGown'))
const TopFive = React.lazy(() => import('./views/top_five/TopFive'))
const FinalRound = React.lazy(() => import('./views/final_round/FinalRound'))
const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/', name: 'Dashboard', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/talent_presentation', name: 'Talent Presentation', element: TalentPresentation },
  { path: '/production_number', name: 'Production Number', element: ProductionNumber },
  { path: '/production_attire', name: 'Production Attire', element: ProductionAttire },
  { path: '/swim_wear', name: 'Swim Wear', element: SwimWear },
  { path: '/evening_gown', name: 'Evening Gown', element: EveningGown },
  { path: '/top_five', name: 'Top Five', element: TopFive },
  { path: '/final_round', name: 'Final Round', element: FinalRound },
]

export default routes
