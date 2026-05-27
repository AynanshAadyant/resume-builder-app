import { BrowserRouter as Router, Routes, Route } from "react-router"

import LandingPage from "./pages/LandingPage"
import AuthPage from "./pages/Auth"

import SignupForm from "./components/signup-form"
import LoginForm from "./components/login-form"

import ProtectedRoute from "./components/protect-route"

import Dashboard from "./pages/Dashboard"

import MainContent from "./components/Dashboard/dashboard-content"
import ProfileBuilder from "./components/Dashboard/dashboard-profile"
import AIWorkspace from "./components/Dashboard/dashboard-ai"
import ResumeEditor from "./components/Dashboard/dashboard-resume-editor"
import Insights from "./components/Dashboard/dashboard-insights"
import DashboardSettings from "./components/Dashboard/dashboard-settings"
import DashboardSupport from "./components/Dashboard/dashboard-support"

import { Toaster } from "sonner"

export default function App() {
  return (
    <Router>
      <Toaster position="top-center"/>

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthPage />}>
          <Route
            path="signup"
            element={<SignupForm className="w-1/2 bg-black" />}
          />
          <Route path="login" element={<LoginForm />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            
            {/* Default Dashboard Page */}
            <Route index element={<MainContent />} />

            {/* Nested Dashboard Routes */}
            <Route path="profile" element={<ProfileBuilder />} />
            <Route path="ai" element={<AIWorkspace />} />
            <Route path="resume" element={<ResumeEditor />} />
            <Route path="insights" element={<Insights />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="support" element={<DashboardSupport />} />

          </Route>
        </Route>

      </Routes>
    </Router>
  )
}