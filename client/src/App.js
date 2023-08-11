import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import TalentPresentationPrintPerJudge from './views/talent_presentation/TalentPresentationPrintPerJudge'
import TalentPresentationPrintSummary from './views/talent_presentation/TalentPresentationPrintSummary'
import ProductionNumberPrintPerJudge from './views/production_number/ProductionNumberPrintPerJudge'
import ProductionNumberPrintSummary from './views/production_number/ProductionNumberPrintSummary'
import ProductionAttirePrintPerJudge from './views/production_attire/ProductionAttirePrintPerJudge'
import ProductionAttirePrintSummary from './views/production_attire/ProductionAttirePrintSummary'
import SwimWearPrintPerJudge from './views/swim_wear/SwimWearPrintPerJudge'
import SwimWearPrintSummary from './views/swim_wear/SwimWearPrintSummary'
import EveningGownPrintPerJudge from './views/evening_gowm/EveningGownPrintPerJudge'
import EveningGownPrintSummary from './views/evening_gowm/EveningGownPrintSummary'
import TopFivePrintPerJudge from './views/top_five/TopFivePrintPerJudge'
import TopFivePrintSummary from './views/top_five/TopFivePrintSummary'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
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
            {/* Tpp Five Print */}
            <Route
              exact
              path="/top_five/per_judge"
              name="Tpp Five Per Judge"
              element={<TopFivePrintPerJudge />}
            />
            <Route
              exact
              path="/top_five/summary"
              name="Tpp Five Print Summary"
              element={<TopFivePrintSummary />}
            />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
