import React, { createContext, useState, useContext } from 'react';
interface CourseContextType {
    courses: fetchData[]; // Assuming 'fetchData[]' is your expected type for courses
  }

// Create a context for the course
export const CourseContext = createContext<any>(null);
export const LessonContext = createContext(null)

// Create a custom hook for easy access to the context
export const useLesson = () => useContext(LessonContext)
export const useCourse = () => useContext(CourseContext);

