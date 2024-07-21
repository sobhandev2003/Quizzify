
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SlLike, SlDislike } from "react-icons/sl";
import { drivePhotoBaseUrl } from '../App';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../redux/store';
import { useEffect, useState } from 'react';
import { AiFillLike ,AiFillDislike} from "react-icons/ai";
// import { AiFillDislike } from "react-icons/ai";
interface propsType {
    user_id:string,
    _id: string,
    name: string,
    description: string,
    category: string,
    topic?: string,
    posterId?: string | null,
    likeBy:string[],
    unlikeBy:string[],
    isValid?:boolean|undefined
}

function QuizCard(props: propsType) {
    const [isLiked,setIsLiked]=useState<boolean>(false)
    const [isUnLiked,setIsUnLiked]=useState<boolean>(false)
    const loginUser=useAppSelector(state=>state.userAccountReducer.loginUser);
    useEffect(()=>{
        // setUser(loginUser);
        setIsLiked(props.likeBy.includes(loginUser.id))
        setIsUnLiked(props.unlikeBy.includes(loginUser.id))
    },[loginUser])
    const showDescription=(description:string)=>(
        description.split(' ').splice(0, 20).join(' ')+"..."
    )

    return (
        <Card sx={{ width: 350 }}>
            {props.posterId?<CardMedia
                sx={{ height: 140 }}
                image={`${drivePhotoBaseUrl}${props.posterId}`}
                title="green iguana"
            />:<Avatar name={props.name} />}
            

            {/* <Avatar name={props.name} /> */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {/* //NOTE - Name */}
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {/* //NOTE - Category */}
                    {props.category}
                </Typography>
                {props.topic &&
                    <Typography variant="body2" color="text.secondary">
                        {/* //NOTE - Topic */}
                        {props.topic}
                    </Typography>}
                <Typography variant="body2" color="text.secondary">
                    {/* //NOTE - Description */}
                    {/* {props.description} */}
                    {showDescription(props.description)}
                </Typography>
                {props.isValid!==undefined && <Typography><b>Validity : </b>{props.isValid?"True":"False"}</Typography>}
            </CardContent>
            <CardActions>
                <Button size="small" >{isLiked?<AiFillLike />:<SlLike />}<span>{props.likeBy.length}</span></Button>
                <Button size="small">{isUnLiked? <AiFillDislike />:<SlDislike />}<span>{props.unlikeBy.length}</span></Button>

            </CardActions>
        </Card>
    );
}

export default QuizCard
