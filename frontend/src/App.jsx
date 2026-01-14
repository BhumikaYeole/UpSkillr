import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import CourseDetailPage from './Components/CourseDetailPage';
import CertificatePage from './pages/CertificatePage';
import AboutPage from './pages/AboutPage';
import TeachPage from './pages/TeachPage';
import LearnerDashboard from './pages/LearnerDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import LearnerProfile from './pages/LearnerProfile';
import InstructorProfile from './pages/InstructorProfile';
import SignUp from './pages/Signup';  
import Login from './pages/Login';
import CreateCourse from "./pages/CreateCourse"
import EditCourse from './pages/EditCourse';
import ProtectedRoute from './Components/ProtectedRoute';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/course/:courseId" element={<CourseDetailPage />} />
          <Route path="/certificates" element={<CertificatePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/teach" element={<TeachPage />} />
          <Route
            path="/learner-dashboard"
            element={
              <ProtectedRoute role="learner">
                <LearnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-course"
            element={
              <ProtectedRoute role="instructor">
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:courseId/edit"
            element={
              <ProtectedRoute role="instructor">
                <EditCourse />
              </ProtectedRoute>
            }
          />

          <Route path="/instructor-dashboard" element={
              <ProtectedRoute role="instructor">
                <InstructorDashboard />
              </ProtectedRoute>
            } />
          <Route path="/learner-profile" element={
            <ProtectedRoute role="learner">
                <LearnerProfile />
              </ProtectedRoute>
            } />
          <Route path="/instructor-profile" element={
              <ProtectedRoute role="instructor">
                <InstructorProfile />
              </ProtectedRoute>
            } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;