import { useEffect, useState } from "react";
import axios from "axios";

const TOTAL_TIME = 15 * 60; // 15 minutes
const API_BASE_URL = "https://upskillr-mzox.onrender.com/api"; // Change to your backend URL

export default function Quiz({ courseId }) { 
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [testEnded, setTestEnded] = useState(false);
  const [result, setResult] = useState(null);

  // Logout function to handle user logout
  const handleLogout = async () => {
    try {
      // Clear authentication tokens from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Optional: Notify backend about logout
      try {
        await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } catch (err) {
        console.error('Backend logout failed:', err);
      }
      
      // Redirect to login page
      window.location.href = "/login"; // Change to your login route
    } catch (err) {
      console.error('Logout error:', err);
      // Force redirect even if there's an error
      window.location.href = "/login";
    }
  };

  // Fetch assessment from backend API
 useEffect(() => {
  const fetchAssessment = async () => {
    if (!courseId) {
      setError("Course ID is required");
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching assessment for courseId:', courseId);
      
      // ✅ Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError("Please login to access this assessment");
        setLoading(false);
        return;
      }
      
      // ✅ Include Authorization header
      const response = await axios.get(
        `${API_BASE_URL}/assessments/course/${courseId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success && response.data.data.length > 0) {
        const assessment = response.data.data[0];
        
        const transformedData = {
          _id: assessment._id, // ✅ Store assessment ID
          title: assessment.title,
          description: assessment.description,
          duration: assessment.duration,
          totalMarks: assessment.totalMarks,
          passingPercentage: assessment.passingPercentage,
          questions: assessment.questions.map(q => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.answer
          }))
        };
        
        setAssessmentData(transformedData);
        if (assessment.duration) {
          setTimeLeft(assessment.duration * 60);
        }
      } else {
        setError("No assessment found for this course");
      }
    } catch (err) {
      console.error('Failed to fetch assessment:', err);
      
      // ✅ Better error handling
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => {
          handleLogout();
        }, 2000);
      } else {
        setError(err.response?.data?.message || "Failed to load assessment");
      }
    } finally {
      setLoading(false);
    }
  };
  
  fetchAssessment();
}, [courseId]);

  const questions = assessmentData?.questions || [];

  useEffect(() => {
    if (!started || testEnded) return;
    if (timeLeft <= 0) {
      submitTest();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [started, timeLeft, testEnded]);

  // Tab switching detection with proper logout
  useEffect(() => {
  if (!started || testEnded) return; // ✅ Also check testEnded
  
  const handleVisibilityChange = () => {
    if (document.hidden) {
      alert("Tab switching detected. You are being logged out!");
      handleLogout();
    }
  };
  
  const handleBlur = () => {
    alert("Tab switching detected. You are being logged out!");
    handleLogout();
  };
  
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("blur", handleBlur);
  
  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("blur", handleBlur);
  };
}, [started, testEnded]); // ✅ Add testEnded to dependency array

  const selectOption = (option) => {
    setAnswers({ ...answers, [currentIndex]: option });
  };

  const submitTest = async () => {
  let score = 0;
  questions.forEach((q, index) => {
    if (answers[index] === q.correctAnswer) score++;
  });
  const totalMarks = score * 2;
  const maxMarks = questions.length * 2;
  const percentage = Math.round((totalMarks / maxMarks) * 100);
  const passingPercentage = assessmentData?.passingPercentage || 50;
  const status = percentage >= passingPercentage ? "PASS" : "FAIL";
  
  setResult({
    score,
    totalMarks,
    percentage,
    status,
    total: questions.length,
    incorrect: questions.length - score,
    coins: score * 2
  });
  setTestEnded(true);

  // ✅ Save results to backend with better error handling
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No authentication token found');
      alert('Session expired. Please login again.');
      handleLogout();
      return;
    }

    const response = await axios.post(
      `${API_BASE_URL}/assessments/submit`,
      {
        courseId,
        assessmentId: assessmentData._id, // ✅ Make sure this is set
        answers,
        score,
        percentage,
        totalQuestions: questions.length,
        status
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Assessment submitted successfully:', response.data);
  } catch (err) {
    console.error('Failed to submit results:', err);
    
    if (err.response?.status === 401) {
      alert('Session expired. Please login again.');
      handleLogout();
    } else if (err.response?.status === 400) {
      alert(err.response.data.message || 'Submission failed');
    } else {
      console.error('Submission error:', err.response?.data || err.message);
    }
  }
};
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const timePercent = (timeLeft / TOTAL_TIME) * 100;

  if (loading) {
    return (
      <div className="quiz-wrapper">
        <style>{`
          .quiz-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at top, #0b3c4d 0%, #050b14 45%, #02040a 100%);
            color: #00eaff;
            font-size: 1.5rem;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(0, 234, 255, 0.2);
            border-top-color: #00eaff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
          <div>Loading assessment...</div>
        </div>
      </div>
    );
  }

  if (error || !assessmentData || questions.length === 0) {
    return (
      <div className="quiz-wrapper">
        <style>{`
          .quiz-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at top, #0b3c4d 0%, #050b14 45%, #02040a 100%);
            padding: 2rem;
          }
        `}</style>
        <div style={{
          textAlign: "center",
          padding: "3rem",
          borderRadius: "18px",
          background: "linear-gradient(180deg, rgba(16, 34, 56, 0.92), rgba(8, 16, 30, 0.95))",
          border: "1px solid rgba(0, 255, 255, 0.08)"
        }}>
          <h2 style={{ color: "#ff4466", fontSize: "2rem", marginBottom: "1rem" }}>
            ❌ Assessment Not Available
          </h2>
          <p style={{ color: "#9fdcff", marginBottom: "1rem" }}>
            {error || "No questions found for this course."}
          </p>
          <p style={{ color: "#7fb8d4", fontSize: "0.9rem" }}>
            Course ID: {courseId}
          </p>
          <button
            onClick={() => window.location.href = '/courses'}
            style={{
              marginTop: "2rem",
              padding: "12px 28px",
              borderRadius: "10px",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              color: "#021018",
              background: "linear-gradient(135deg, #00eaff, #1cbfff)",
              boxShadow: "0 0 20px rgba(0, 234, 255, 0.45)"
            }}
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // INSTRUCTION PAGE
  if (!started) {
    return (
      <div className="quiz-wrapper">
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Inter", "Segoe UI", sans-serif;
          }
          
          body {
            background: radial-gradient(
              circle at top,
              #0b3c4d 0%,
              #050b14 45%,
              #02040a 100%
            );
            min-height: 100vh;
            color: #e5f6ff;
          }

          .quiz-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
            background: radial-gradient(
              circle at top,
              #0b3c4d 0%,
              #050b14 45%,
              #02040a 100%
            );
          }

          .quiz-card {
            width: 100%;
            max-width: 720px;
            padding: 40px 45px;
            border-radius: 18px;
            background: linear-gradient(
              180deg,
              rgba(16, 34, 56, 0.92),
              rgba(8, 16, 30, 0.95)
            );
            backdrop-filter: blur(12px);
            box-shadow:
              0 0 0 1px rgba(0, 255, 255, 0.08),
              0 30px 60px rgba(0, 0, 0, 0.6);
            animation: slideIn 0.6s ease-out;
          }

          @keyframes slideIn {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }

          .quiz-title {
            text-align: center;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 30px;
            color: #ffffff;
          }

          .instruction-box {
            display: flex;
            flex-direction: column;
            gap: 14px;
            margin-bottom: 20px;
          }

          .instruction-item {
            padding: 18px 20px;
            border-radius: 10px;
            background: rgba(0, 234, 255, 0.06);
            border: 1px solid rgba(0, 234, 255, 0.15);
            font-size: 16px;
            color: #d8f3ff;
            transition: all 0.3s ease;
          }

          .instruction-item:hover {
            background: rgba(0, 234, 255, 0.1);
            border-color: rgba(0, 234, 255, 0.3);
          }

          .instruction-warning {
            padding: 18px 20px;
            border-radius: 10px;
            background: rgba(255, 68, 102, 0.08);
            border: 1px solid rgba(255, 68, 102, 0.25);
            font-size: 15px;
            color: #ffbcbc;
          }

          .primary-btn {
            width: 100%;
            margin-top: 25px;
            padding: 15px;
            border-radius: 12px;
            border: none;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            color: #021018;
            background: linear-gradient(135deg, #00eaff, #1cbfff);
            box-shadow:
              0 0 20px rgba(0, 234, 255, 0.45),
              0 8px 25px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
          }

          .primary-btn:hover {
            transform: translateY(-2px);
            box-shadow:
              0 0 28px rgba(0, 234, 255, 0.65),
              0 12px 30px rgba(0, 0, 0, 0.5);
          }

          .primary-btn:active {
            transform: translateY(0);
          }
        `}</style>

        <div className="quiz-card">
          <h2 className="quiz-title">{assessmentData.title || "Assessment Instructions"}</h2>

          <div className="instruction-box">
            <div className="instruction-item">
              📌 Total Questions: {questions.length}
            </div>
            <div className="instruction-item">
              📝 Total Marks: {assessmentData.totalMarks || questions.length * 2}
            </div>
            <div className="instruction-item">
              ✅ Each correct answer: 2 points
            </div>
            <div className="instruction-item">
              ⏱ Duration: {assessmentData.duration || 15} Minutes
            </div>
            <div className="instruction-item">
              📊 Passing Percentage: {assessmentData.passingPercentage || 50}%
            </div>
            <div className="instruction-item">
              🚫 Do not refresh, switch tabs, or minimize.
            </div>
            <div className="instruction-warning">
              ⚠️ If any cheating activity is detected, you will be logged out immediately.
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={() => setStarted(true)}
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  // RESULT PAGE
  if (testEnded && result) {
    return (
      <div className="quiz-wrapper">
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Inter", "Segoe UI", sans-serif;
          }
          
          body {
            background: radial-gradient(
              circle at top,
              #0b3c4d 0%,
              #050b14 45%,
              #02040a 100%
            );
            min-height: 100vh;
            color: #e5f6ff;
          }

          .quiz-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
            background: radial-gradient(
              circle at top,
              #0b3c4d 0%,
              #050b14 45%,
              #02040a 100%
            );
          }

          .quiz-card {
            width: 100%;
            max-width: 720px;
            padding: 40px 45px;
            border-radius: 18px;
            background: linear-gradient(
              180deg,
              rgba(16, 34, 56, 0.92),
              rgba(8, 16, 30, 0.95)
            );
            backdrop-filter: blur(12px);
            box-shadow:
              0 0 0 1px rgba(0, 255, 255, 0.08),
              0 30px 60px rgba(0, 0, 0, 0.6);
            animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          @keyframes popIn {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }

          .quiz-title {
            text-align: center;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 30px;
            color: #ffffff;
          }

          .result-icon {
            text-align: center;
            font-size: 60px;
            margin-bottom: 15px;
            animation: bounce 0.6s ease-in-out infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          .result-status {
            text-align: center;
            font-size: 42px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #00eaff;
          }

          .result-status.pass {
            color: #00ff88;
          }

          .result-status.fail {
            color: #ff4466;
          }

          .result-label {
            text-align: center;
            font-size: 16px;
            color: #9fdcff;
            margin-bottom: 30px;
          }

          .result-row {
            display: flex;
            justify-content: space-between;
            padding: 16px 18px;
            margin-bottom: 12px;
            border-radius: 10px;
            background: rgba(0, 234, 255, 0.08);
            border: 1px solid rgba(0, 234, 255, 0.2);
          }

          .result-row-label {
            color: #cfeeff;
            font-weight: 600;
          }

          .result-row-value {
            color: #00eaff;
            font-weight: 700;
            font-size: 18px;
          }

          .primary-btn {
            width: 100%;
            margin-top: 35px;
            padding: 15px;
            border-radius: 12px;
            border: none;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            color: #021018;
            background: linear-gradient(135deg, #00eaff, #1cbfff);
            box-shadow:
              0 0 20px rgba(0, 234, 255, 0.45),
              0 8px 25px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
          }

          .primary-btn:hover {
            transform: translateY(-2px);
            box-shadow:
              0 0 28px rgba(0, 234, 255, 0.65),
              0 12px 30px rgba(0, 0, 0, 0.5);
          }
        `}</style>

        <div className="quiz-card">
          <div className="result-icon">
            {result.status === "PASS" ? "✅" : "❌"}
          </div>
          <h2 className={`result-status ${result.status === "PASS" ? "pass" : "fail"}`}>
            {result.status}
          </h2>
          <p className="result-label">Quiz Completed</p>

          <div className="result-row">
            <span className="result-row-label">📌 Total Questions</span>
            <span className="result-row-value">{result.total}</span>
          </div>

          <div className="result-row">
            <span className="result-row-label">📝 Total Points</span>
            <span className="result-row-value">{result.totalMarks}</span>
          </div>

          <div className="result-row">
            <span className="result-row-label">🪙 Coins Earned</span>
            <span className="result-row-value">+{result.coins}</span>
          </div>

          <div className="result-row">
            <span className="result-row-label">✅ Correct Answers</span>
            <span className="result-row-value">{result.score}</span>
          </div>

          <div className="result-row">
            <span className="result-row-label">❌ Incorrect Answers</span>
            <span className="result-row-value">{result.incorrect}</span>
          </div>

          <div className="result-row">
            <span className="result-row-label">📈 Percentage</span>
            <span className="result-row-value">{result.percentage}%</span>
          </div>

          <button
            className="primary-btn"
            onClick={() => window.location.href = '/courses'}
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // QUIZ PAGE
  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-wrapper">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter", "Segoe UI", sans-serif;
        }
        
        body {
          background: radial-gradient(
            circle at top,
            #0b3c4d 0%,
            #050b14 45%,
            #02040a 100%
          );
          min-height: 100vh;
          color: #e5f6ff;
        }

        .quiz-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          background: radial-gradient(
            circle at top,
            #0b3c4d 0%,
            #050b14 45%,
            #02040a 100%
          );
        }

        .quiz-card {
          width: 100%;
          max-width: 720px;
          padding: 40px 45px;
          border-radius: 18px;
          background: linear-gradient(
            180deg,
            rgba(16, 34, 56, 0.92),
            rgba(8, 16, 30, 0.95)
          );
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 0 1px rgba(0, 255, 255, 0.08),
            0 30px 60px rgba(0, 0, 0, 0.6);
          position: relative;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .timer {
          position: absolute;
          top: 25px;
          right: 35px;
          font-weight: 600;
          color: #00eaff;
          font-size: 16px;
          padding: 8px 16px;
          background: rgba(0, 234, 255, 0.12);
          border: 1px solid rgba(0, 234, 255, 0.4);
          border-radius: 8px;
        }

        .timer.warning {
          color: #ffaa00;
          border-color: rgba(255, 170, 0, 0.4);
          background: rgba(255, 170, 0, 0.12);
        }

        .timer.danger {
          color: #ff4466;
          border-color: rgba(255, 68, 102, 0.4);
          background: rgba(255, 68, 102, 0.12);
        }

        .question-count {
          font-size: 15px;
          color: #9fdcff;
          margin-bottom: 10px;
          margin-top: 20px;
        }

        .question-text {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 25px;
          color: #ffffff;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 25px;
        }

        .option {
          padding: 14px 16px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #d8f3ff;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .option:hover {
          background: rgba(0, 234, 255, 0.12);
          border-color: rgba(0, 234, 255, 0.5);
        }

        .option.selected {
          background: linear-gradient(
            135deg,
            rgba(0, 234, 255, 0.35),
            rgba(28, 191, 255, 0.25)
          );
          border-color: #00eaff;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(0, 234, 255, 0.3);
        }

        .quiz-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 35px;
          gap: 15px;
        }

        .secondary-btn {
          padding: 12px 22px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: transparent;
          color: #e5f6ff;
          cursor: pointer;
          transition: 0.3s ease;
          font-weight: 600;
        }

        .secondary-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 234, 255, 0.5);
          color: #00eaff;
        }

        .secondary-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .primary-btn {
          padding: 12px 28px;
          border-radius: 10px;
          border: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          color: #021018;
          background: linear-gradient(135deg, #00eaff, #1cbfff);
          box-shadow:
            0 0 20px rgba(0, 234, 255, 0.45),
            0 8px 25px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 28px rgba(0, 234, 255, 0.65),
            0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .primary-btn:active {
          transform: translateY(0);
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 20px;
          border: 1px solid rgba(0, 234, 255, 0.2);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00eaff, #1cbfff);
          transition: width 0.3s ease;
          box-shadow: 0 0 10px rgba(0, 234, 255, 0.5);
        }

        @media (max-width: 768px) {
          .quiz-card {
            padding: 28px 25px;
          }

          .question-text {
            font-size: 18px;
          }

          .timer {
            position: static;
            margin-bottom: 15px;
            text-align: center;
          }

          .quiz-nav {
            flex-direction: column;
          }

          .secondary-btn,
          .primary-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="quiz-card">
        <div className={`timer ${timePercent <= 33 && timePercent > 16 ? 'warning' : timePercent <= 16 ? 'danger' : ''}`}>
          ⏱ {formatTime(timeLeft)}
        </div>

        <div className="question-count">
          Question {currentIndex + 1} / {questions.length}
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="question-text">
          {question.question}
        </div>

        <div className="options">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option ${answers[currentIndex] === option ? "selected" : ""}`}
              onClick={() => selectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="quiz-nav">
          <button
            className="secondary-btn"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              className="primary-btn"
              onClick={submitTest}
            >
              Submit Test
            </button>
          ) : (
            <button
              className="primary-btn"
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}