
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
    user_id:string,
    _id: string,
    name: string,
    description: string,
    category: string,
    topic?: string,
    posterId?: string | null,
    like:number|undefined,
    unlike:number|undefined,
    isValid?:boolean|undefined
}

function QuizCard(props: propsType) {
    // const {_id,name,description,category,topic,posterId} = props
    // console.log(props._id);
    const showDescription=(description:string)=>(
        description.split(' ').splice(0, 20).join(' ')+"..."
    )

    return (
        <Card sx={{ maxWidth: 400 }}>
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
                <Button size="small" ><SlLike /><span>{props.like}</span></Button>
                <Button size="small"><SlDislike />{props.unlike}</Button>
            </CardActions>
        </Card>
    );
}

export default QuizCard
