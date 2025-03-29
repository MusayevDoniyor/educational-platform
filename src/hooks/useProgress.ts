import { useState, useEffect } from "react";
import { Lesson } from "../data/lessons";

interface Progress {
  completedLessons: number[];
  scores: Record<number, number>;
}

const STORAGE_KEY = "lesson_progress";

export const useProgress = (lessons: Lesson[]) => {
  const [progress, setProgress] = useState<Progress>(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    return savedProgress
      ? JSON.parse(savedProgress)
      : { completedLessons: [], scores: {} };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markLessonCompleted = (lessonId: number, score: number) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
      scores: {
        ...prev.scores,
        [lessonId]: score,
      },
    }));
  };

  const isLessonCompleted = (lessonId: number) => {
    return progress.completedLessons.includes(lessonId);
  };

  const getLessonScore = (lessonId: number) => {
    return progress.scores[lessonId] || 0;
  };

  const getOverallProgress = () => {
    return {
      completed: progress.completedLessons.length,
      total: lessons.length,
      percentage: (progress.completedLessons.length / lessons.length) * 100,
    };
  };

  return {
    progress,
    markLessonCompleted,
    isLessonCompleted,
    getLessonScore,
    getOverallProgress,
  };
};
