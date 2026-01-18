import { fetchClient } from "./fetchClient";

export const loginApi = (data) =>
  fetchClient("/auth/sign-in", { method: "POST", body: data });

export const signUpLearner = (data) =>
  fetchClient("/auth/sign-up/learner", { method: "POST", body: data });

export const signUpInstructor = (data) =>
  fetchClient("/auth/sign-up/instructor", { method: "POST", body: data });

export const getMeApi = async () => {
  const data = await fetchClient("/user/me");
  // console.log(data)
  return data;
}

export const getLearnerDashboardApi = async()=>{
  const data = await fetchClient("/progress/dashboard")
  return data
}


export const updateUserApi = async(data)=>{
  return fetchClient("/user/me", {
    method : "PUT",
    body : data
  })
}

export const isEnrolledApi = async(courseId) =>{
  const res =  fetchClient(`/enrollments/enrolled/${courseId}`)
  return res
}

export const enrollApi = async(courseId) =>{
  return fetchClient(`/enrollments/enroll/${courseId}`, {
    method : "POST"
  })
}

export const fetchCoursesApi = async()=>{
  const data = await fetchClient("/courses")
  return data;
}

export const fetchActiveCoursesApi = async()=>{
  const data = await fetchClient("/enrollments/user-courses")
  return data;
}

export const courseProgressApi = async(courseId)=>{
  const data = await fetchClient(`/progress/${courseId}`)
  return data
}

export const completeLessonApi = (courseId, lessonId) =>
  fetchClient(`/progress/${courseId}/lesson/${lessonId}`, {
    method: "POST"
  });



export const getCourseResourcesApi = async(courseId) => 
{
  const data = await fetchClient(`/resources/learner/course/${courseId}/resources`);
  return data
}

export const downloadResourceApi = async(resourceId) =>{
  const data = await fetchClient(`/resources/learner/resource/${resourceId}/download`)
  return data
}

export const getInstructorProfileApi = async () => {
  const data = await fetchClient("/instructor/profile");
  return data;
}

export const getInstructorDashboardApi = async () => {
  const data = await fetchClient("/progress/instructor/dashboard");
  return data;
}

export const updateInstructorProfileApi = async (data) => {
  return fetchClient("/user/me", {
    method: "PUT",
    body: data
  });
}

export const getInstructorStatsApi = async () => {
  const data = await fetchClient("/instructor/stats");
  return data;
}

export const getInstructorCoursesApi = async () => {
  const data = await fetchClient("/instructor/courses");
  return data;
}

export const checkAssessmentSubmissionApi = async (courseId) => {
  const token = localStorage.getItem('token');
  const response = await fetchClient(`/assessments/submission/${courseId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response;
};

// Fetch certificate data (returns JSON, not PDF)
export const fetchCertificate = async (courseId) => {
  const token = localStorage.getItem("token");
  
  const response = await fetchClient(`/certificates/course/${courseId}/certificate`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const data = await response.data;
  
  // Format the date
  const formatted = {
      certificateId: data.certificateId,
      learnerName: data.learnerName,
      courseTitle: data.courseTitle,
      instructorName: data.instructorName,
      score: data.score,
      status: data.status,
      dateIssued: new Date(data.dateIssued).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };
    return formatted;
};
    
export const verifyCertificateApi = async(certificateId) =>{
  const response = await fetchClient(`/certificates/${certificateId}`)

  const data = await response.data;
  const formatted = {
      name: data.name,
      course: data.course,
      instructor: data.instructor,
      score: data.score,
      date: new Date(data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };
    return formatted;

}