import { Routes, Route } from "react-router-dom"

import { HomeLayout } from "./layouts/HomeLayout"
import { PrivateLayout } from "./layouts/PrivateLayout"

import Home from "./pages/Home"
import { LoginPage } from "./modules/auth/LoginPage"
import { RegisterPage } from "./modules/auth/RegisterPage"
import { ProtectedRoute } from "./modules/auth/ProtectedRoute"

// JOB REQUESTS
import JobRequestFormPage from "./pages/jobrequests/JobRequestFormPage"
import { JobRequestsPage } from "./pages/jobrequests/JobRequestsPage"
import { JobRequestDetail } from "./modules/jobrequests/JobRequestDetail"

// OFFERS
import { OffersList } from "./modules/offers/OffersList"
import { OfferDetail } from "./modules/offers/OfferDetail"
import { OfferForm } from "./modules/offers/OfferForm"

// DASHBOARD
import { Dashboard } from "./pages/Dashboard"

export const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* PRIVATE */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Job Requests */}
          <Route path="/jobrequests" element={<JobRequestsPage />} />
          <Route path="/jobrequests/new" element={<JobRequestFormPage />} />
          <Route path="/jobrequests/:id" element={<JobRequestDetail />} />

          {/* Offers */}
          <Route path="/offers" element={<OffersList />} />
          <Route path="/offers/new" element={<OfferForm />} />
          <Route path="/offers/:id" element={<OfferDetail />} />

        </Route>
      </Route>

    </Routes>
  )
}
