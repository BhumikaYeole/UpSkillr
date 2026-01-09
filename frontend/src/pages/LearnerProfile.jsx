import React from 'react';
import StudentProfile from '../Components/StudentProfile';
import ProtectedRoute from '../Components/ProtectedRoute';

export default function LearnerProfile() {
  return (
    <ProtectedRoute role="learner"> 
    <StudentProfile />;
    </ProtectedRoute>
  )
}