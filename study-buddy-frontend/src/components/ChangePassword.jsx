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

function ChangePassword({ open, onClose }) {
    const dispatch = useDispatch();
    //const [c_name, setCourseName] = useState("");
    //const [description , setDescription] = useState("");
    //const [subjectArea , setSubjectArea] = useState("");
    const [old_password, setOldPassword] = useState("");
    const [new_password , setNewPassword] = useState("");
    const [v_password , setVerifiedPassword] = useState("");
    const user = useSelector(selectUser)
    const router = useRouter()


    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };
    const handleVerifiedPasswordChange = (event) => {
        setVerifiedPassword(event.target.value);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOldPassword("");
        setNewPassword("");
        setVerifiedPassword("");
        onClose();
    }

    const handleNewPassword = async (e) => {
        e.preventDefault();
        if (!old_password) {
            toast.error("Type Old Password");
            return;
        }
        if (!new_password) {
            toast.error("Type new password");
            return;
        }
        if (!v_password) {
            toast.error("Type new password");
            return;
        }

        /*
        try {
            const response = await axios.post(`${API_URL}/courses/user/${user.id}/newCourseforUser`, {
                name: old_password,
                new_password,
                subjectArea
            });
            console.log(response);
            handleClose();
        } catch (error){
            toast.error("Invalid Course");
            console.error(error);
        }*/

    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className={styles.loginCreate}>
                <Typography variant="h6" component="h2">
                    New Course
                </Typography>
                <br/>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleNewPassword}>

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Old Password"
                        name="old_password"
                        autoComplete="old_password"
                        autoFocus
                        onChange={handleOldPasswordChange}
                        value={old_password}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="new_password"
                        label="New Password"
                        autoComplete="new_password"
                        onChange={handleNewPasswordChange}
                        value={new_password}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="v_password"
                        label="Verify New Password"
                        autoComplete="current-password"
                        onChange={handleVerifiedPasswordChange}
                        value={v_password}
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
                        Change Password
                    </Button>
                    <Button fullWidth variant="text" onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ChangePassword;
