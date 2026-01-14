import { fetchClient } from "./fetchClient";

export const createCourseApi = (data)=>{ 
    return fetchClient("/courses/",{ method :"POST", body : data})
}
export const addSectionApi = (courseId, data)=>{
    return fetchClient(`/courses/${courseId}/section`, {method : "POST", body : data})
}
export const addLessonApi = ( courseId, sectionId, data)=>{
    return fetchClient(`/courses/${courseId}/section/${sectionId}/lesson`, {method : "POST", body : data})
}

export const updateSectionApi = (sectionId, data) =>{
    return fetchClient(`/courses/sections/${sectionId}`, {method : "PUT", body : data})
}

export const updateLessonApi = (lessonId, data) =>{
    return fetchClient(`/courses/lessons/${lessonId}`, {method : "PUT", body : data})
}

export const deleteLessonApi = (lessonId, data) =>{
    return fetchClient(`/courses/lessons/${lessonId}`, {method : "DELETE", body : data})
}

export const deleteSectionApi = (sectionId, data) =>{
    return fetchClient(`/courses/sections/${sectionId}`, {method : "DELETE", body : data})
}

export const deleteCourseApi = (courseId, data) =>{
    return fetchClient(`/courses/courses/${courseId}`, {method : "DELETE", body : data})
}

export const updateCourseApi = (courseId, data) =>{
    return fetchClient(`/courses/courses/${courseId}`, {method : "PUT", body : data})
}

export const getCourseCurriculumApi = (courseId)=>{ 
    const data =  fetchClient(`/courses/${courseId}/curriculum`)
    //  console.log(data)
    return data
}

export const addResourceApi = (courseId, data) =>{
    return fetchClient(`/resources/instructor/course/${courseId}/resource`, {method : "POST", body : data})
}
