import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import TalentPresentationPrintPerJudge from './views/talent_presentation/TalentPresentationPrintPerJudge'
import TalentPresentationPrintSummary from './views/talent_presentation/TalentPresentationPrintSummary'
import TalentPresentationPrintFinalResult from './views/talent_presentation/TalentPresentationPrintFinalResult'
import ProductionNumberPrintPerJudge from './views/production_number/ProductionNumberPrintPerJudge'
import ProductionNumberPrintSummary from './views/production_number/ProductionNumberPrintSummary'
import ProductionNumberPrintFinalResult from './views/production_number/ProductionNumberPrintFinalResult'
import ProductionAttirePrintPerJudge from './views/production_attire/ProductionAttirePrintPerJudge'
import ProductionAttirePrintSummary from './views/production_attire/ProductionAttirePrintSummary'
import ProductionAttirePrintFinalResult from './views/production_attire/ProductionAttirePrintFinalResult'
import SwimWearPrintPerJudge from './views/swim_wear/SwimWearPrintPerJudge'
import SwimWearPrintSummary from './views/swim_wear/SwimWearPrintSummary'
import SwimWearPrintFinalResult from './views/swim_wear/SwimWearPrintFinalResult'
import EveningGownPrintPerJudge from './views/evening_gowm/EveningGownPrintPerJudge'
import EveningGownPrintSummary from './views/evening_gowm/EveningGownPrintSummary'
import EveningGownPrintFinalResult from './views/evening_gowm/EveningGownPrintFinalResult'
import TopFivePrintPerJudge from './views/top_five/TopFivePrintPerJudge'
import TopFivePrintSummary from './views/top_five/TopFivePrintSummary'
import TopFivePrintFinalResult from './views/top_five/TopFivePrintFinalResult'
import FinalRoundPrintPerJudge from './views/final_round/FinalRoundPrintPerJudge'
import FinalRoundPrintSummary from './views/final_round/FinalRoundPrintSummary'
import FinalRoundPrintFinalResult from './views/final_round/FinalRoundPrintFinalResult'
import AuditionPrintSummary from './views/audition/AuditionPrintSummary'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />

            {/* Talent Presentation Print */}
            <Route
              exact
              path="/talent_presentation/per_judge"
              name="Talent Persentation Print Per Judge"
              element={<TalentPresentationPrintPerJudge />}
            />
            <Route
              exact
              path="/talent_presentation/summary"
              name="Talent Persentation Print Summary"
              element={<TalentPresentationPrintSummary />}
            />
            <Route
              exact
              path="/talent_presentation/final_result"
              name="Talent Persentation Print Final Result"
              element={<TalentPresentationPrintFinalResult />}
            />

            {/* Production Number Print */}
            <Route
              exact
              path="/production_number/per_judge"
              name="Production Number Per Judge"
              element={<ProductionNumberPrintPerJudge />}
            />
            <Route
              exact
              path="/production_number/summary"
              name="Production Number Print Summary"
              element={<ProductionNumberPrintSummary />}
            />
            <Route
              exact
              path="/production_number/final_result"
              name="Production Number Print Final Result"
              element={<ProductionNumberPrintFinalResult />}
            />

            {/* Production Attire Print */}
            <Route
              exact
              path="/production_attire/per_judge"
              name="Prodiction Attire Per Judge"
              element={<ProductionAttirePrintPerJudge />}
            />
            <Route
              exact
              path="/production_attire/summary"
              name="Prodiction Attire Print Summary"
              element={<ProductionAttirePrintSummary />}
            />
            <Route
              exact
              path="/production_attire/final_result"
              name="Prodiction Attire Print Final Result"
              element={<ProductionAttirePrintFinalResult />}
            />

            {/* Swim Wear Print */}
            <Route
              exact
              path="/swim_wear/per_judge"
              name="Swim Wear Per Judge"
              element={<SwimWearPrintPerJudge />}
            />
            <Route
              exact
              path="/swim_wear/summary"
              name="Swim Wear Print Summary"
              element={<SwimWearPrintSummary />}
            />
            <Route
              exact
              path="/swim_wear/final_result"
              name="Swim Wear Print Final Result"
              element={<SwimWearPrintFinalResult />}
            />

            {/* Evening Gown Print */}
            <Route
              exact
              path="/evening_gown/per_judge"
              name="Evening Gown Per Judge"
              element={<EveningGownPrintPerJudge />}
            />
            <Route
              exact
              path="/evening_gown/summary"
              name="Evening Gown Print Summary"
              element={<EveningGownPrintSummary />}
            />
            <Route
              exact
              path="/evening_gown/final_result"
              name="Evening Gown Print Final Result"
              element={<EveningGownPrintFinalResult />}
            />
            {/* Top Five Print */}
            <Route
              exact
              path="/top_five/per_judge"
              name="Top Five Per Judge"
              element={<TopFivePrintPerJudge />}
            />
            <Route
              exact
              path="/top_five/summary"
              name="Top Five Print Summary"
              element={<TopFivePrintSummary />}
            />
            <Route
              exact
              path="/top_five/final_result"
              name="Top Five Print Final Result"
              element={<TopFivePrintFinalResult />}
            />
            {/* Final Round Print */}
            <Route
              exact
              path="/final_round/per_judge"
              name="Final Round Per Judge"
              element={<FinalRoundPrintPerJudge />}
            />
            <Route
              exact
              path="/final_round/summary"
              name="Final Round Print Summary"
              element={<FinalRoundPrintSummary />}
            />
            <Route
              exact
              path="/final_round/final_result"
              name="Final Round Print Final Result"
              element={<FinalRoundPrintFinalResult />}
            />
            <Route path="*" name="Home" element={<DefaultLayout />} />

            <Route
              exact
              path="/audition/summary"
              name="Audition Print Summary"
              element={<AuditionPrintSummary />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
