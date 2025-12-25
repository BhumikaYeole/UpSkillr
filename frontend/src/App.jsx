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
          <Route path="/learner-dashboard" element={<LearnerDashboard />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/learner-profile" element={<LearnerProfile />} />
          <Route path="/instructor-profile" element={<InstructorProfile />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;