
import { AttendQuizDetails } from '..';
import { SlLike, SlDislike } from "react-icons/sl";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../redux/store';
import { updateLike, updateUnlike } from '../services/QuizService';
import { useEffect, useState } from 'react';

const PreviousAttendQuizDetails = ({ quizDetails }:{quizDetails:AttendQuizDetails}) => {
  const dispatch=useAppDispatch()
  const loginUser=useAppSelector(state=>state.userAccountReducer.loginUser)
  const {
    Quiz_ID,
    Quiz_Name,
    Quiz_Category,
    Score,
    IsPassed,
   
  } = quizDetails;

  const [isLiked,setIsLiked]=useState<boolean>(loginUser.LikedList?.includes(Quiz_ID) ||false)
  const [isDisLiked,setIsDisLiked]=useState<boolean>(loginUser.DisLikedList?.includes(Quiz_ID) || false)

  const handleUpdateLike=()=>{
    console.log(isLiked);
    
    dispatch(updateLike(Quiz_ID))
    setIsLiked(!isLiked)
     setIsDisLiked(false)
  }
  const handleUpdateDisLike=()=>{
    dispatch(updateUnlike(Quiz_ID))
    setIsDisLiked(!isDisLiked)
    setIsLiked(false)
  }
  useEffect(()=>{
    setIsLiked(loginUser.LikedList?.includes(Quiz_ID)!)
    setIsDisLiked(loginUser.DisLikedList?.includes(Quiz_ID)!)
  },[loginUser])

  return (
    <tr>
      <td> {Quiz_ID}</td>
   
      <td>{Quiz_Name}</td>
      <td> {Quiz_Category}</td>
      <td> {Score}</td>
      <td>{IsPassed? 'Yes' : 'No'}</td>
     <td>{isLiked?<AiFillLike onClick={handleUpdateLike}/>:<SlLike onClick={handleUpdateLike}/>}</td>

     <td>{isDisLiked?<AiFillDislike onClick={handleUpdateDisLike}/>:<SlDislike onClick={handleUpdateDisLike}/>}</td>

     
    </tr>
  );
};

export default PreviousAttendQuizDetails;