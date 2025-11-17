import { Routes, Route, Navigate } from "react-router-dom";
import { HomeLayout } from "./layouts/HomeLayout";
import { PrivateLayout } from "./layouts/PrivateLayout";

import Home from "./pages/Home";
import { LoginPage } from "./modules/auth/LoginPage";
import { RegisterPage } from "./modules/auth/RegisterPage";

import { Dashboard } from "./pages/Dashboard";

import { OffersList } from "./modules/offers/OffersList";
import { OfferDetail } from "./modules/offers/OfferDetail";
import { OfferForm } from "./modules/offers/OfferForm";

import { ProtectedRoute } from "./modules/auth/ProtectedRoute";

import { JobRequestsPage } from "./pages/jobrequests/JobRequestsPage";
import JobRequestFormPage from "./pages/jobrequests/JobRequestFormPage";

export const AppRoutes = () => (
  <Routes>

    <Route element={<HomeLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<PrivateLayout />}>

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="offers">
          <Route index element={<OffersList />} />
          <Route path="new" element={<OfferForm />} />
          <Route path=":id" element={<OfferDetail />} />
        </Route>

        <Route path="jobrequests">
          <Route index element={<JobRequestsPage />} />
          <Route path="new" element={<JobRequestFormPage />} />
        </Route>

      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
