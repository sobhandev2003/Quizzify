import React from 'react';
import { AttendQuizDetails } from '..';

const PreviousAttendQuizDetails = ({ quizDetails }:{quizDetails:AttendQuizDetails}) => {
  const {
    Quiz_ID,
    Quiz_Name,
    Quiz_Category,
    Score,
    IsPassed
  } = quizDetails;

  return (
    <tr>
      <td> {Quiz_ID}</td>
   
      <td>{Quiz_Name}</td>
      <td> {Quiz_Category}</td>
      <td> {Score}</td>
      <td>{IsPassed? 'Yes' : 'No'}</td>
    </tr>
  );
};

export default PreviousAttendQuizDetails;