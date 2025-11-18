import { Routes, Route } from "react-router-dom"

import { HomeLayout } from "./layouts/HomeLayout"
import { PrivateLayout } from "./layouts/PrivateLayout"


import Home from "./pages/Home"
import { LoginPage } from "./modules/auth/LoginPage"
import { RegisterPage } from "./modules/auth/RegisterPage"
import { ProtectedRoute } from "./modules/auth/ProtectedRoute"


import JobRequestFormPage from "./pages/jobrequests/JobRequestFormPage"
import { JobRequestsPage } from "./pages/jobrequests/JobRequestsPage"
import { JobRequestDetail } from "./modules/jobrequests/JobRequestDetail"

import { OffersList } from "./modules/offers/OffersList"
import { OfferDetail } from "./modules/offers/OfferDetail"
import { OfferForm } from "./modules/offers/OfferForm"

import { FreelancerProfileView } from "./modules/freelancerprofile/FreelancerProfileView"
import { FreelancerProfileEdit } from "./modules/freelancerprofile/FreelancerProfileEdit"

import { Dashboard } from "./pages/Dashboard"

export const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/jobrequests" element={<JobRequestsPage />} />
          <Route path="/jobrequests/new" element={<JobRequestFormPage />} />
          <Route path="/jobrequests/:id" element={<JobRequestDetail />} />

          <Route path="/offers" element={<OffersList />} />
          <Route path="/offers/new" element={<OfferForm />} />
          <Route path="/offers/:id" element={<OfferDetail />} />

          <Route path="/freelancers/:id/profile" element={<FreelancerProfileView />} />
          <Route path="/freelancers/:id/profile/edit" element={<FreelancerProfileEdit />} />

        </Route>
      </Route>

    </Routes>
  )
}