import { useEffect, useState, useCallback } from "react";
import { getMeApi, getLearnerDashboardApi, updateUserApi } from "../api/auth";

export function useProfile() {
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const [meRes, dashboardRes] = await Promise.all([
        getMeApi(),
        getLearnerDashboardApi()
      ]);

      setUser(meRes.profile.user);
      setDashboard({
        ...dashboardRes,
        enrolledCourses: meRes.profile.enrolledCourses.filter(Boolean)
      });

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
    enrolledCourses: dashboard?.enrolledCourses ?? [],
    completedCourses: dashboard?.dashboard?.completedCourses ?? 0,
    lessonsCompleted: dashboard?.dashboard?.lessonsCompleted ?? 0,
    learningTime: dashboard?.dashboard?.learningTime ?? "0 min",
    progressData: dashboard?.dashboard?.progressData ?? [],
    updateProfile,
    refetchProfile: fetchProfile 
  };
}
