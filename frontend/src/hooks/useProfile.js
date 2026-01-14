import { useEffect, useState, useCallback } from "react";
import {
  getMeApi,
  getLearnerDashboardApi,
  updateUserApi,
  getInstructorDashboardApi
} from "../api/auth";

export function useProfile() {
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const meRes = await getMeApi();
      const userData = meRes.profile.user;

      setUser(userData);

      if (userData.role === "learner") {
        const dashboardRes = await getLearnerDashboardApi();

        setDashboard({
          ...dashboardRes,
          enrolledCourses: meRes.profile.enrolledCourses?.filter(Boolean) ?? [],
        });

        return;
      }

      if (userData.role === "instructor") {
        const dashboardRes = await getInstructorDashboardApi();
        const d =
          dashboardRes?.data?.dashboard ||
          dashboardRes?.dashboard ||
          dashboardRes?.data ||
          {};


        // Normalize instructor dashboard
        setDashboard({
          enrolledCourses: [],
          dashboard: {
            completedCourses: 0,
            lessonsCompleted: 0,
            learningTime: "0 min",
            progressData: [],
            totalCourses: d.totalCourses ?? 0,
            totalStudents: d.totalStudents ?? 0,
            newEnrollments: d.newEnrollments ?? 0,
            publishedCourses: d.publishedCourses ?? [],
          },
        });
        return;
      }
    } catch (err) {
      console.error("Profile load failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (payload) => {
    const res = await updateUserApi(payload);
    setUser(res.user);
    return res.user;
  };

  return {
    loading,
    user,
    dashboard,
    enrolledCourses: dashboard?.enrolledCourses ?? [],
    completedCourses: dashboard?.dashboard?.completedCourses ?? 0,
    lessonsCompleted: dashboard?.dashboard?.lessonsCompleted ?? 0,
    learningTime: dashboard?.dashboard?.learningTime ?? "0 min",
    progressData: dashboard?.dashboard?.progressData ?? [],
    updateProfile,
    refetchProfile: fetchProfile,
  };
}
