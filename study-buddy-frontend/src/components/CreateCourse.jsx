import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "@/styles/login-create.module.css";
import { toast } from 'react-toastify';
import { useRouter } from "next/router"
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { API_URL } from "@/utils/config";
import {selectUser} from "@/utils/authSlice";

function CreateCourse({ open, onClose }) {
    const dispatch = useDispatch();
    const [c_name, setCourseName] = useState("");
    const [description , setDescription] = useState("");
    const [subjectArea , setSubjectArea] = useState("");
    const user = useSelector(selectUser)
    const router = useRouter()


    const handleCourseNameChange = (event) => {
        setCourseName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleSubjectAreaChange = (event) => {
        setSubjectArea(event.target.value);
    };

    const handleClose = () => {
        setCourseName("")
        setDescription("")
        setSubjectArea("")
        onClose()
    }

    const handleNewCourse = async (e) => {
        e.preventDefault();
        if (!c_name) {
            toast.error("Course name cannot be empty");
            return;
        }
        if (!description) {
            toast.error("Description cannot be empty");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/courseInfo/user/${user.id}/newCourseforUser`, {
                name: c_name,
                description,
                subjectArea
            });
            console.log(response);

            handleClose();
        } catch (error){
            toast.error("Invalid Course");
            console.error(error);
        }

    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className={styles.loginCreate} >
                <Typography variant="h6" component="h2">
                    New Course
                </Typography>
                <br/>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleNewCourse}>

                    <Select
                        fullWidth
                        label="Subject Area"
                        name="subject_area"
                        autoComplete="subject_area"
                        value={subjectArea}
                        onChange={handleSubjectAreaChange}

                    >
                        <MenuItem value="Math">Math</MenuItem>
                        <MenuItem value="Biology">Biology</MenuItem>
                        <MenuItem value="Physics">Physics</MenuItem>
                        <MenuItem value="Chemistry">Chemistry</MenuItem>
                        <MenuItem value="Science">Science</MenuItem>
                        <MenuItem value="Fine Arts">Fine Arts</MenuItem>
                        <MenuItem value="Languages">Languages</MenuItem>
                        <MenuItem value="Literature">Literature</MenuItem>
                        <MenuItem value="Computer Science">Computer Science</MenuItem>
                        <MenuItem value="Engineering">Engineering</MenuItem>
                        <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="Political Science">Political Science</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Social Science">Social Science</MenuItem>
                    </Select>

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Course Name"
                        name="c_name"
                        autoComplete="c_name"
                        autoFocus
                        onChange={handleCourseNameChange}
                        value={c_name}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="Description"
                        label="Description"
                        autoComplete="current-password"
                        onChange={handleDescriptionChange}
                        value={description}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: "bluegrey",
                            "&:hover": {
                                backgroundColor: "bluegrey",
                            },
                        }}
                    >
                        Add Course
                    </Button>
                    <Button fullWidth variant="text" onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default CreateCourse;
