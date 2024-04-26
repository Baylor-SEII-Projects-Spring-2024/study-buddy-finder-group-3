import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Divider,
  Container,
} from "@mui/material"
import axios from "axios"
import { Button, Checkbox } from "@mui/material"
import { useSelector } from "react-redux"
import { selectToken, selectUser } from "@/utils/authSlice.js"
import { useRouter } from "next/router"
import { API_URL } from "@/utils/config"
import CreateCourse from "@/components/CreateCourse"

function UserCourses() {
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const router = useRouter()
  const [openCreateCourseModal, setOpenCreateCourseModal] = useState(false)
  const [selectedCourses, setSelectedCourses] = useState([])


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${API_URL}/courseInfo/allCourses`);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);
  const handleCheckboxChange = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    } else {
      setSelectedCourses([...selectedCourses, courseId])
    }
  }
  const handleAddCourses = async () => {
        try {
            await axios.post(`${API_URL}/courseInfo/user/${user.id}/addCourses`, selectedCourses);
            router.push("/courses");
        } catch (error) {
            console.error("Error adding courses:", error);
        }
    };
  const handleOpenCreateCourseModal = () => {
    setOpenCreateCourseModal(true)
  }

  const handleCloseCreateCourseModal = () => {
    setOpenCreateCourseModal(false)
  }

  useEffect(() => {
    if (!token || !user) {
      router.push("/")
    }
  }, [token, router])
  
  const renderCourseList = (courses) => {
    return (
      <>
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        >
          {courses.map((course) => (
            <div key={course.id}>
              <Box
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
            </div>
          ))}
        </div>
      </>
    )
  }

  const renderSubjectBox = (subjectName, courses) => {
    return (
      <Box
        border={3}
        borderColor="primary.main"
        borderRadius={8}
        padding={2}
        display="flex"
        flexDirection="column"
        width={"50vw"}
      >
        <Typography variant="h8" gutterBottom>
          {subjectName}
        </Typography>
        <Divider />
        <br />
        {renderCourseList(courses)}
      </Box>
    )
  }

  const bioCourses = [
    { id: 1, name: "Biology I", data: { course_id: 1 } },
    { id: 2, name: "Biology II", data: { course_id: 2 } },
    { id: 3, name: "Anatomy", data: { course_id: 3 } },
    { id: 4, name: "Microbiology", data: { course_id: 4 } },
    { id: 5, name: "Genetics", data: { course_id: 5 } },
    { id: 6, name: "Physiology", data: { course_id: 6 } },
  ]

  const mathCourses = [
    { id: 7, name: "Pre-Calculus", data: { course_id: 7 } },
    { id: 8, name: "Calculus I", data: { course_id: 8 } },
    { id: 9, name: "Calculus II", data: { course_id: 9 } },
    { id: 10, name: "Calculus III", data: { course_id: 10 } },
    { id: 11, name: "Statistics", data: { course_id: 11 } },
    { id: 12, name: "Linear Algebra", data: { course_id: 12 } },
  ]

  const physCourses = [
    { id: 13, name: "Physics I", data: { course_id: 13 } },
    { id: 14, name: "Physics II", data: { course_id: 14 } },
    { id: 15, name: "Quantum Mechanics", data: { course_id: 15 } },
    { id: 16, name: "Astrophysics", data: { course_id: 16 } },
    { id: 17, name: "Optics", data: { course_id: 17 } },
    { id: 18, name: "Nuclear Physics", data: { course_id: 18 } },
  ]

  const chemCourses = [
    { id: 19, name: "Organic Chemistry", data: { course_id: 19 } },
    { id: 20, name: "General Chemistry", data: { course_id: 20 } },
    { id: 21, name: "Analytical Chemistry", data: { course_id: 21 } },
    { id: 22, name: "Biochemistry", data: { course_id: 22 } },
    { id: 23, name: "Environmental Chemistry", data: { course_id: 23 } },
    { id: 24, name: "Physical Chemistry", data: { course_id: 24 } },
  ]
  const scienceCourses = [
    { id: 25, name: "Geology", data: { course_id: 25 } },
    { id: 26, name: "Astronomy", data: { course_id: 26 } },
    { id: 27, name: "Neuroscience", data: { course_id: 27 } },
    { id: 28, name: "Environmental Science", data: { course_id: 28 } },
  ]

  const fineArtsCourses = [
    { id: 29, name: "Drawing", data: { course_id: 29 } },
    { id: 30, name: "Painting", data: { course_id: 30 } },
    { id: 31, name: "Sculpture", data: { course_id: 31 } },
    { id: 32, name: "Photography", data: { course_id: 32 } },
    { id: 33, name: "Art History", data: { course_id: 33 } },
  ]

  const LanguageCourses = [
    { id: 34, name: "Spanish", data: { course_id: 34 } },
    { id: 35, name: "French", data: { course_id: 35 } },
    { id: 36, name: "German", data: { course_id: 36 } },
    { id: 37, name: "Chinese", data: { course_id: 37 } },
  ]

  const LitCourses = [
    { id: 38, name: "English Literature", data: { course_id: 38 } },
    { id: 39, name: "World Literature", data: { course_id: 39 } },
    { id: 40, name: "American Literature", data: { course_id: 40 } },
    { id: 41, name: "Comparative Literature", data: { course_id: 41 } },
  ]

  const CompSciCourses = [
    {
      id: 42,
      name: "Introduction to Computer Science",
      data: { course_id: 42 },
    },
    { id: 43, name: "Data Structures and Algorithms", data: { course_id: 43 } },
    { id: 44, name: "Database Systems", data: { course_id: 44 } },
    { id: 45, name: "Operating Systems", data: { course_id: 45 } },
  ]

  const EngineerCourses = [
    { id: 46, name: "Introduction to Engineering", data: { course_id: 46 } },
    { id: 47, name: "Mechanical Engineering", data: { course_id: 47 } },
    { id: 48, name: "Electrical Engineering", data: { course_id: 48 } },
    { id: 49, name: "Civil Engineering", data: { course_id: 49 } },
  ]

  const BusinessCourses = [
    { id: 50, name: "Introduction to Business", data: { course_id: 50 } },
    { id: 51, name: "Marketing", data: { course_id: 51 } },
    { id: 52, name: "Finance", data: { course_id: 52 } },
    { id: 53, name: "Management", data: { course_id: 53 } },
  ]

  const PoliSciCourses = [
    {
      id: 54,
      name: "Introduction to Political Science",
      data: { course_id: 54 },
    },
    { id: 55, name: "Comparative Politics", data: { course_id: 55 } },
    { id: 56, name: "International Relations", data: { course_id: 56 } },
    { id: 57, name: "Public Policy", data: { course_id: 57 } },
  ]

  const EducationCourses = [
    { id: 58, name: "Introduction to Education", data: { course_id: 58 } },
    { id: 59, name: "Educational Psychology", data: { course_id: 59 } },
    { id: 60, name: "Curriculum and Instruction", data: { course_id: 60 } },
    { id: 61, name: "Special Education", data: { course_id: 61 } },
  ]

  const SocialCourses = [
    { id: 62, name: "Sociology", data: { course_id: 62 } },
    { id: 63, name: "Anthropology", data: { course_id: 63 } },
    { id: 64, name: "Psychology", data: { course_id: 64 } },
    { id: 65, name: "Economics", data: { course_id: 65 } },
  ]

  return (
    <Box
      id="home-section"
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
      <Typography variant="h4" gutterBottom>
        Add Course
      </Typography>

      <Container>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreateCourseModal}
        >
          New Course
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddCourses}>
          Add Selected Courses
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push("/courses/")}
        >
          Back
        </Button>
      </Container>
      <br />

      <CreateCourse
        open={openCreateCourseModal}
        onClose={handleCloseCreateCourseModal}
      />
      {renderSubjectBox("Math", mathCourses)}
      <br />
      {renderSubjectBox("Biology", bioCourses)}
      <br />
      {renderSubjectBox("Physics", physCourses)}
      <br />
      {renderSubjectBox("Chemistry", chemCourses)}
      <br />
      {renderSubjectBox("Science", scienceCourses)}
      <br />
      {renderSubjectBox("Fine Arts", fineArtsCourses)}
      <br />
      {renderSubjectBox("Languages", LanguageCourses)}
      <br />
      {renderSubjectBox("Literature", LitCourses)}
      <br />

      {renderSubjectBox("Computer Science", CompSciCourses)}
      <br />

      {renderSubjectBox("Engineering", EngineerCourses)}
      <br />

      {renderSubjectBox("Business", BusinessCourses)}
      <br />

      {renderSubjectBox("Political Science", PoliSciCourses)}
      <br />

      {renderSubjectBox("Education", EducationCourses)}
      <br />

      {renderSubjectBox("Social Science", SocialCourses)}
      <br />

      <Button variant="contained" color="primary" onClick={handleAddCourses}>
        Add Selected Courses
      </Button>
    </Box>
  )
}
export default UserCourses
