import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@/utils/authSlice.js"
import {
    List,
    ListItem,
    Card,
    CardContent,
    Typography,
    Grid,
    Link,
    Container,
    Box,
    CardMedia,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import VideocamIcon from "@mui/icons-material/Videocam"
import axios from "axios"
import DeleteIcon from "@mui/icons-material/Delete"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"
import { toast } from "react-toastify"
import { API_URL } from "@/utils/config"
import Header from "./Header.jsx"

import courses from "@/pages/courses";

function DisplayCourses() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [courses, setCourses] = useState([]);
    //const courses = useSelector((state) => state.courses.courses);
    //const coursesStatus = useSelector((state) => state.courses.status);
    //const meetings = useSelector((state) => state.meetings.meetings)
    const router = useRouter()

    useEffect(() => {
        const fetchCourseByUserId = async () => {
                try{
                    const response = await axios.get(
                        `${API_URL}/courses/user/${user.id}/courses`
                    )
                    setCourses(response.data);
                    console.log("hello")
                } catch (error){
                    console.error("Error fetching courses:", error)
                }

            }
        fetchCourseByUserId(user.id);
        //dispatch(fetchCourseByUserId(user.id));
    }, [user.id]);

    /*
    const fetchCourseByUserId = createAsyncThunk(

        'courses/fetchByUserId',
        async (userId) => {
            const response = await axios.get(`${API_URL}/user/{userId}/courses`);
            return response.data;
        }
    );

    useEffect(() => {
        const fetchRecommendedMeetings = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/recommendations/meetings/${user.id}`
                )
                setRecommendedMeetings(response.data)
            } catch (error) {
                console.error("Error fetching recommended meetings:", error)
            }
        }

        fetchRecommendedMeetings() // Call the function to fetch recommended meetings
    }, [user])*/



    return (
        <Container>
            <Header />
            <Box
                id="home-section"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    height: "50vh",
                    padding: 2,
                    boxSizing: "border-box",
                    backgroundImage: "url('/home-gradient.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: "text.primary" }}>
                    Courses
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", "& > *": {
                    marginRight: 1,
                        },
                    }}
                >
                    <Button variant="contained" color="primary">
                        Add Course
                    </Button>
                </Box>
            </Box>

            <Box id="courses-section" sx={{ height: "100vh", pt: "64px" }}>
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    {courses.map((course) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={course.id}
                        >
                            <Card style={{ position: "relative" }}>
                                {" "}

                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="/StudyBuddyLogo Background Removed.png" // need to replace with random image idk what yet
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {course.name}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div">
                                            {course.subjectArea}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {course.description}
                                        </Typography>
                                    </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}
export default DisplayCourses