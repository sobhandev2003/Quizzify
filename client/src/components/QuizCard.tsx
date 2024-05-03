import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SlLike, SlDislike } from "react-icons/sl";
import { drivePhotoBaseUrl } from '../App';
import Avatar from 'react-avatar';
interface propsType {
    _id: string,
    name: string,
    description: string,
    category: string,
    topic?: string,
    posterId?: string | null
}

function QuizCard(props: propsType) {
    // const {_id,name,description,category,topic,posterId} = props
    // console.log(props._id);

    return (
        <Card sx={{ maxWidth: 345 }}>
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
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" ><SlLike /><span>12k</span></Button>
                <Button size="small"><SlDislike />200</Button>
            </CardActions>
        </Card>
    );
}

export default QuizCard
