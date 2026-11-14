import { Assessment, Student } from "./interface.ts";

/**
 * Decides the final grade for a student depending on
 * their circumstances and how their assessment went
 *
 * @param student
 * @param assessment
 * @returns { string }
 */
export function gradeService(student: Student, assessment: Assessment): string {
  if (!student.enrolled) {
    return 'WD';
  }

  if (assessment.plagiarism) {
    return '00';
  }

  let mark = assessment.rawMark;

  if (assessment.daysLate > 0 && !student.specialConsideration) {
    if (assessment.daysLate > 5) {
      return 'FL';
    }
    mark -= assessment.daysLate * 5;
  }

  if (assessment.hurdle && assessment.examMark < 40) {
    return 'UF';
  }

  if (mark >= 85) {
    return 'HD';
  } else if (mark >= 75) {
    return 'DN';
  } else if (mark >= 65) {
    return 'CR';
  } else if (mark >= 50) {
    return 'PS';
  }
  return 'FL';
}
