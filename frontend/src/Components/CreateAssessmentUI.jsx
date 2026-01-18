import { useState } from 'react';
import { Trash2, Plus, Save } from 'lucide-react';

export default function CreateAssessmentUI() {
  // Get courseId from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const courseIdFromUrl = urlParams.get('courseId');

  const [assessmentData, setAssessmentData] = useState({
    title: '',
    description: '',
    duration: 15,
    passingPercentage: 50,
    courseId: courseIdFromUrl || ''
  });

  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const setCorrectAnswer = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = newQuestions[questionIndex].options[optionIndex];
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!assessmentData.title || !assessmentData.courseId) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      setLoading(false);
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || q.options.some(opt => !opt) || !q.correctAnswer) {
        setMessage({ type: 'error', text: `Question ${i + 1} is incomplete` });
        setLoading(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/assessments/upload-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: assessmentData.courseId,
          assessmentData: {
            title: assessmentData.title,
            courseSubject: assessmentData.description,
            duration: assessmentData.duration,
            totalMarks: questions.length * 2,
            passingPercentage: assessmentData.passingPercentage,
            questions: questions.map(q => ({
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer
            }))
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: '✅ Assessment created successfully! Redirecting...' });
        setTimeout(() => {
          window.location.href = '/instructor-dashboard';
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to create assessment' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, #0b3c4d 0%, #050b14 45%, #02040a 100%)',
      padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{
          color: '#00eaff',
          fontSize: '2.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Create Assessment
        </h1>

        {message.text && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '8px',
            background: message.type === 'success' 
              ? 'rgba(0, 255, 136, 0.1)' 
              : 'rgba(255, 68, 102, 0.1)',
            border: `1px solid ${message.type === 'success' ? '#00ff88' : '#ff4466'}`,
            color: message.type === 'success' ? '#00ff88' : '#ff4466'
          }}>
            {message.text}
          </div>
        )}

        <div style={{
          padding: '2rem',
          borderRadius: '12px',
          background: 'linear-gradient(180deg, rgba(16, 34, 56, 0.92), rgba(8, 16, 30, 0.95))',
          border: '1px solid rgba(0, 255, 255, 0.08)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#00eaff', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            Assessment Details
          </h2>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
                Course ID * {courseIdFromUrl && <span style={{ color: '#00ff88' }}>✓ Auto-filled</span>}
              </label>
              <input
                type="text"
                placeholder="Enter course ID"
                value={assessmentData.courseId}
                onChange={(e) => setAssessmentData({...assessmentData, courseId: e.target.value})}
                disabled={courseIdFromUrl}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 234, 255, 0.3)',
                  background: courseIdFromUrl ? 'rgba(0, 255, 136, 0.1)' : 'rgba(0, 0, 0, 0.3)',
                  color: '#fff',
                  fontSize: '16px',
                  cursor: courseIdFromUrl ? 'not-allowed' : 'text'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
                Assessment Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Web Development Fundamentals Assessment"
                value={assessmentData.title}
                onChange={(e) => setAssessmentData({...assessmentData, title: e.target.value})}
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

            <div>
              <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
                Description
              </label>
              <input
                type="text"
                placeholder="e.g., Web Development"
                value={assessmentData.description}
                onChange={(e) => setAssessmentData({...assessmentData, description: e.target.value})}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={assessmentData.duration}
                  onChange={(e) => setAssessmentData({...assessmentData, duration: parseInt(e.target.value)})}
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

              <div>
                <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
                  Passing Percentage (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={assessmentData.passingPercentage}
                  onChange={(e) => setAssessmentData({...assessmentData, passingPercentage: parseInt(e.target.value)})}
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
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#00eaff', fontSize: '1.5rem' }}>
              Questions ({questions.length})
            </h2>
            <button
              onClick={addQuestion}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #00eaff, #1cbfff)',
                color: '#021018',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Plus size={20} />
              Add Question
            </button>
          </div>

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              style={{
                padding: '1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(180deg, rgba(16, 34, 56, 0.92), rgba(8, 16, 30, 0.95))',
                border: '1px solid rgba(0, 255, 255, 0.08)',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: '#00eaff', fontSize: '1.1rem' }}>
                  Question {qIndex + 1}
                </h3>
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(qIndex)}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 68, 102, 0.3)',
                      background: 'rgba(255, 68, 102, 0.1)',
                      color: '#ff4466',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
                  Question Text *
                </label>
                <textarea
                  placeholder="Enter your question here..."
                  value={q.question}
                  onChange={(e) => updateQuestion(qIndex, e.target.value)}
                  rows={3}
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#9fdcff', marginBottom: '0.5rem' }}>
                  Options (Select the correct answer) *
                </label>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {q.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center'
                      }}
                    >
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={q.correctAnswer === option}
                        onChange={() => setCorrectAnswer(qIndex, optIndex)}
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer'
                        }}
                      />
                      <input
                        type="text"
                        placeholder={`Option ${optIndex + 1}`}
                        value={option}
                        onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '6px',
                          border: '1px solid rgba(0, 234, 255, 0.3)',
                          background: 'rgba(0, 0, 0, 0.3)',
                          color: '#fff',
                          fontSize: '15px'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {q.correctAnswer && (
                <div style={{
                  padding: '10px',
                  borderRadius: '6px',
                  background: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  color: '#00ff88',
                  fontSize: '14px'
                }}>
                  ✓ Correct Answer: {q.correctAnswer}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
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
            opacity: loading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <Save size={20} />
          {loading ? 'Creating Assessment...' : 'Create Assessment'}
        </button>
      </div>
    </div>
  );
} 