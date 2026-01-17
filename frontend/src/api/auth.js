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