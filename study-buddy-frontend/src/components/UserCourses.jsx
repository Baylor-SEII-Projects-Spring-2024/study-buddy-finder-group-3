import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, Container, Divider, Typography } from "@mui/material"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import { API_URL } from "@/utils/config"
import CreateCourse from "@/components/CreateCourse"
import Header from "./Header"

function UserCourses() {
  const user = useSelector(selectUser);
  const router = useRouter();
  const [courses, setCourses] = useState({});
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [openCreateCourseModal, setOpenCreateCourseModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses/allCourses`);
        const coursesBySubject = response.data.reduce((acc, course) => {
          const { subjectArea } = course;
          if (!acc[subjectArea]) {
            acc[subjectArea] = [];
          }
          acc[subjectArea].push(course);
          return acc;
        }, {});
        setCourses(coursesBySubject);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleCheckboxChange = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleAddCourses = async () => {
    try {
      await axios.post(`${API_URL}/courses/user/${user.id}/addCourses`, selectedCourses);
      router.push("/courses");
    } catch (error) {
      console.error("Error adding courses:", error);
    }
  };

  const handleOpenCreateCourseModal = () => {
    setOpenCreateCourseModal(true);
  };

  const handleCloseCreateCourseModal = () => {
    setOpenCreateCourseModal(false);
  };


  const renderCourseList = (courses) => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      {courses.map((course) => (
        <Box key={course.id}
          border={2}
          borderColor="primary.main"
          borderRadius={6}
          padding={2}
          display="flex"
          flexDirection="row"
          marginRight={1}
          marginLeft={1}
          marginBottom={1}
        >
          <Typography>{course.name}</Typography>
          <Checkbox
            checked={selectedCourses.includes(course.id)}
            onChange={() => handleCheckboxChange(course.id)}
          />
        </Box>
      ))}
    </div>
  );

  const renderSubjectBox = (subjectName, courses) => (
    <Box
      border={3}
      borderColor="primary.main"
      borderRadius={8}
      padding={2}
      display="flex"
      flexDirection="column"
      width={"50vw"}
    >
      <Typography variant="h8" gutterBottom>{subjectName}</Typography>
      <Divider />
      <br />
      {renderCourseList(courses)}
    </Box>
  );

  return (
    <>
      <Header />
      <Box id="home-section"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          marginLeft: "25vw",
          height: "auto",
          overflowY: "auto",
          padding: 2,
          marginTop: "64px"
        }}
      >
        <Typography variant="h4" gutterBottom>Add Course</Typography>
        Don't see your course? Click "New Course" to add it.

        <Container>
          <Button variant="contained" color="primary" onClick={handleOpenCreateCourseModal}>New Course</Button>
          <Button variant="contained" color="primary" onClick={handleAddCourses}>Add Selected Courses</Button>
          <Button variant="outlined" color="primary" onClick={() => router.push("/courses/")}>Back</Button>
          
        </Container>
        <br />
        <CreateCourse open={openCreateCourseModal} onClose={handleCloseCreateCourseModal} />
        {Object.keys(courses).map(subject => (
          <React.Fragment key={subject}>
            {renderSubjectBox(subject, courses[subject])}
            <br />
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}

export default UserCourses;
