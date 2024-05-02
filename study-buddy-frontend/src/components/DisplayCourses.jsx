import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { selectUser } from "@/utils/authSlice.js"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from "@mui/material"
import axios from "axios"
import DeleteIcon from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import { API_URL } from "@/utils/config"
import Header from "./Header.jsx"

function DisplayCourses() {
    const user = useSelector(selectUser)
    const [courses, setCourses] = useState([]);
    const router = useRouter()
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


    useEffect(() => {
        if (user && user.id) {

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
        }
        //dispatch(fetchCourseByUserId(user.id));
    }, [user?.id]);


    const handleDeleteCourse = async () => {
        try {
            await axios.delete(`${API_URL}/courses/user/${user?.id}/courses/${selectedCourse?.id}`);
            setCourses(courses.filter(course => course?.id !== selectedCourse?.id));
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const handleDeleteIconClick = (course) => {
        setSelectedCourse(course);
        setOpenDeleteDialog(true);
    };



    return (
        <Container style={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
            <Header />

                <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                    <DialogTitle>Delete Course</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the course "{selectedCourse && selectedCourse.name}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={handleDeleteCourse} color="error">Delete</Button>
                    </DialogActions>
                </Dialog>

            <Box
                id="home-section"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    height: "40vh",
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
                    <Button variant="contained" color="primary"
                            onClick={() => router.push("/addCourse")}>
                        Add Course
                    </Button>
                </Box>
            </Box>

            <Box id="courses-section" >
                {courses.length === 0 ? (
                    <Typography variant="h4" gutterBottom style={{ textAlign: "center", marginTop: "2rem" }}>
                        You have not joined any courses. Join one now by clicking "Add Course"!
                    </Typography>
                ) : (
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {courses.map((course) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={course?.id}
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
                                            <IconButton
                                                style={{ position: "absolute", top: 5, right: 5 }}
                                                onClick={() => handleDeleteIconClick(course)}
                                            >
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    )}
            </Box>
        </Container>
    )
}
export default DisplayCourses