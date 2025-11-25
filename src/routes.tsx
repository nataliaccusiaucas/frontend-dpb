import { Routes, Route } from "react-router-dom"

import { HomeLayout } from "./layouts/HomeLayout"
import { PrivateLayout } from "./layouts/PrivateLayout"


import Home from "./pages/Home"
import { LoginPage } from "./modules/auth/LoginPage"
import { RegisterPage } from "./modules/auth/RegisterPage"
import { ProtectedRoute } from "./modules/auth/ProtectedRoute"


import { JobRequestDetail } from "./modules/jobrequests/JobRequestDetail"
import { JobRequestForm } from "./modules/jobrequests/JobRequestForm"
import { JobRequestList} from "./modules/jobrequests/JobRequestList"

import { OfferDetail } from "./modules/offers/OfferDetail"
import { OfferForm } from "./modules/offers/OfferForm"

import { FreelancerProfileView } from "./modules/freelancerprofile/FreelancerProfileView"
import { FreelancerProfileEdit } from "./modules/freelancerprofile/FreelancerProfileEdit"
import { ReviewForm } from "./modules/reviews/ReviewForm"
import { ReviewsList } from "./modules/reviews/ReviewLists"

import { CommissionsList } from "./modules/commissions/CommissionsList"
import { InvoiceList } from "./modules/commissions/InvoiceList"
import { ClientOfferFeed } from "./modules/offers/ClientOfferFeed"


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

          <Route path="/jobrequests" element={<JobRequestList />} />
          <Route path="/jobrequests/new" element={<JobRequestForm />} />
          <Route path="/jobrequests/:id" element={<JobRequestDetail />} />

          <Route path="/offers" element={<ClientOfferFeed />} />
          <Route path="/offers/new" element={<OfferForm />} />
          <Route path="/offers/:id" element={<OfferDetail />} />

          <Route path="/freelancers/:id/profile" element={<FreelancerProfileView />} />
          <Route path="/freelancers/:id/profile/edit" element={<FreelancerProfileEdit />} />

          <Route path="/reviews/new/:jobRequestId/:freelancerId" element={<ReviewForm />} />
          <Route path="/reviews/freelancer/:freelancerId" element={<ReviewsList />} />

          <Route path="/admin/commissions" element={<CommissionsList />} />
          <Route path="/admin/invoices" element={<InvoiceList />} />

        </Route>
      </Route>

    </Routes>
  )
}