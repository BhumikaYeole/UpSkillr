import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function CreateCourseForm() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    subject: '',
    level: 'beginner'
  });
  
  const [assessmentFile, setAssessmentFile] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle JSON file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      setError('Please upload a valid JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        
        // Validate JSON structure
        if (!json.questions || !Array.isArray(json.questions)) {
          throw new Error('Invalid JSON format: questions array required');
        }
        
        setAssessmentData(json);
        setAssessmentFile(file);
        setError(null);
        console.log('Assessment loaded:', json);
      } catch (err) {
        setError('Invalid JSON format: ' + err.message);
        setAssessmentData(null);
        setAssessmentFile(null);
      }
    };
    reader.readAsText(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Please login to create a course');
      }

      // Step 1: Create the course
      const courseResponse = await axios.post(
        `${API_BASE_URL}/courses`,
        courseData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const createdCourse = courseResponse.data.data;
      console.log('Course created:', createdCourse);

      // Step 2: If assessment data exists, create assessment
      if (assessmentData) {
        await axios.post(
          `${API_BASE_URL}/assessments/upload-json`,
          {
            courseId: createdCourse._id,
            assessmentData: assessmentData
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log('Assessment created successfully');
      }

      alert('Course created successfully!');
      
      // Reset form
      setCourseData({
        title: '',
        description: '',
        subject: '',
        level: 'beginner'
      });
      setAssessmentFile(null);
      setAssessmentData(null);
      
      // Redirect to courses page
      window.location.href = '/courses';
      
    } catch (err) {
      console.error('Error creating course:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'radial-gradient(circle at top, #0b3c4d 0%, #050b14 45%, #02040a 100%)'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px',
        borderRadius: '18px',
        background: 'linear-gradient(180deg, rgba(16, 34, 56, 0.92), rgba(8, 16, 30, 0.95))',
        border: '1px solid rgba(0, 255, 255, 0.08)'
      }}>
        <h1 style={{ color: '#00eaff', marginBottom: '2rem', fontSize: '2rem' }}>
          Create New Course
        </h1>

        {error && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            background: 'rgba(255, 68, 102, 0.1)',
            border: '1px solid rgba(255, 68, 102, 0.3)',
            color: '#ff4466'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
              Course Title *
            </label>
            <input
              type="text"
              required
              value={courseData.title}
              onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 234, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#fff',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
              Description *
            </label>
            <textarea
              required
              value={courseData.description}
              onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 234, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#fff',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
              Subject *
            </label>
            <input
              type="text"
              required
              value={courseData.subject}
              onChange={(e) => setCourseData({ ...courseData, subject: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 234, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#fff',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
              Upload Assessment JSON (Optional)
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 234, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#9fdcff',
                fontSize: '16px'
              }}
            />
            {assessmentData && (
              <div style={{
                marginTop: '0.5rem',
                padding: '10px',
                borderRadius: '6px',
                background: 'rgba(0, 234, 255, 0.1)',
                color: '#00eaff',
                fontSize: '14px'
              }}>
                ✅ Assessment loaded: {assessmentData.questions?.length} questions
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '18px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              color: '#021018',
              background: loading 
                ? 'rgba(0, 234, 255, 0.5)' 
                : 'linear-gradient(135deg, #00eaff, #1cbfff)',
              boxShadow: '0 0 20px rgba(0, 234, 255, 0.45)',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Creating Course...' : 'Create Course'}
          </button>
        </form>
      </div>
    </div>
  );
}