// ProfileDisplay.jsx

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@/utils/authSlice.js";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/config";
import { toast } from "react-toastify";
import styles from "@/styles/ProfileDisplay.module.css";
import { useTheme } from "@mui/material/styles"
import avatarImage from "./StudyBuddyLogo.png"

function ProfileDisplay() {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const router = useRouter();
    const [profile, setProfile] = useState('');
    const [userId, setUserId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedMeetingType, setSelectedMeetingType] = useState('');
    const theme = useTheme()
    const imagePath = avatarImage;
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const inputRef = useRef(null);
    const [profilePic, setProfilePic] = useState(null);
    const [triggerUpdate, setTriggerUpdate] = useState(false)
    // console.log(avatarImage);

    useEffect(() => {
        if (!token || !user) {
            router.push('/');
        }
    }, [token, router]);

    useEffect(() => {
        if (user) {
            setUserId(user.id);
            fetchProfileInfo(user.id);
            fetchProfilePic(user.id);
        }
    }, [user]);

    const fetchProfileInfo = async (userId) => {
        try {
            // console.log("API_URL: ", API_URL);
            const response = await axios.get(`${API_URL}/profile/${userId}`);
            setProfile(response.data);

            let coursesArray = [];
            if (response.data.areaOfStudy) {
                if (typeof response.data.areaOfStudy === 'string') {
                    coursesArray = response.data.areaOfStudy.split(',').map(course => course.trim());
                } else if (Array.isArray(response.data.areaOfStudy)) {
                    coursesArray = response.data.areaOfStudy;
                }
            }

            setSelectedCourses(coursesArray);
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    };

    const fetchProfilePic = async (userId) => {
        try {
            const picData = await getProfilePic(userId);
            setProfilePic(picData);
        } catch (error) {
            console.error("Error fetching profile pic:", error);
        }
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = async () => {
        try {
            const updatedProfile = {
                email: profile.emailAddress,
                username: profile.username,
                firstName: profile.nameFirst,
                lastName: profile.nameLast,
                courses: selectedCourses.join(', '),
                prefTime: selectedTime,
                prefMeetingType: selectedMeetingType,
            };
            console.log(updatedProfile);

            const response = await axios.put(`${API_URL}/profile/updateProfile/${userId}`, updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success("Account updated successfully!")
            } else {
                toast.error("Failed to update account")
            }
            setEditMode(false);
        } catch (error) {
            console.error("Error saving profile changes:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleCourseChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, name]);
        } else {
            setSelectedCourses((prevSelectedCourses) => prevSelectedCourses.filter((course) => course !== name));
        }
    };

    const handlePrefTimeChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedTime(name);
        } else {
            setSelectedTime('');
        }
    };

    const handleMeetingTypeChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedMeetingType(name);
        } else {
            setSelectedMeetingType('');
        }
    };

    // const compressImage = async (file, maxSizeInBytes) => {
    //     console.log("compressing...");
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = async (event) => {
    //             const img = new Image();
    //             img.src = event.target.result;
    //             img.onload = async () => {
    //                 const canvas = document.createElement('canvas');
    //                 const ctx = canvas.getContext('2d');
    //                 canvas.width = img.width;
    //                 canvas.height = img.height;
    //                 ctx.drawImage(img, 0, 0);
    //
    //                 // Convert the image to JPEG format with specified quality (e.g., 0.7)
    //                 const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.4);
    //
    //                 // Convert the data URL to a Blob
    //                 const compressedBlob = await fetch(compressedDataUrl).then((res) => res.blob());
    //
    //                 // Check the size of the compressed image
    //                 if (compressedBlob.size > maxSizeInBytes) {
    //                     // If still too large, recursively call the function with lower quality
    //                     resolve(compressImage(compressedBlob, maxSizeInBytes));
    //                 } else {
    //                     // If within the size limit, resolve with the compressed Blob
    //                     console.log("resolved compressing...");
    //                     resolve(compressedBlob);
    //                 }
    //             };
    //         };
    //         console.log("reject");
    //         reader.onerror = reject;
    //         reader.readAsDataURL(file);
    //     });
    // };

    const compressImage = async (file, maxSizeInBytes, quality = 0.9, maxAttempts = 9) => {
        console.log("compressing...");
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = async () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Convert the image to JPEG format with specified quality
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

                    // Convert the data URL to a Blob
                    const compressedBlob = await fetch(compressedDataUrl).then((res) => res.blob());

                    console.log(`Compressed file size: ${compressedBlob.size} bytes`);

                    // Check if the compressed image size is within the limit
                    if (compressedBlob.size <= maxSizeInBytes || maxAttempts <= 1) {
                        console.log("resolved compressing");
                        resolve(compressedBlob);
                    } else {
                        console.log("compressing again...")
                        // If the size is still too large, recursively call the function with lower quality
                        resolve(
                            compressImage(file, maxSizeInBytes, quality - 0.1, maxAttempts - 1)
                        );
                    }
                };
            };
            console.log("reject");
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        setSelectedPhoto(file);

        try {
            // Compress the image if it's larger than 30kb
            const compressedImage = await compressImage(file, 30 * 1024);
            const formData = new FormData();
            formData.append('photo', compressedImage);
            // const formData = new FormData();
            // formData.append('photo', file);

            // // Check if the selected photo meets the size requirement
            // if (file.size > 30 * 1024) {
            //     toast.error("Selected photo must be 30kb or less.");
            //     return;
            // }
            //
            // Check if the selected photo meets the size requirement
            if (compressedImage.size > 30 * 1024) {
                toast.error("Selected photo must be 225kb or less.");
                return;
            }

            // Upload the photo to the server
            console.log(formData);
            // const response = await axios.put(`${API_URL}/profile/updateProfilePhoto/${userId}`, formData, {
            const response = await axios.put(`${API_URL}/profile/updateProfilePhoto/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                toast.success("Photo uploaded successfully!");
                // Update the profile picture in the UI
                // You can implement this part based on your UI structure
                router.reload();
            } else {
                toast.error("Failed to upload photo");
            }
        } catch (error) {
            console.error("Error uploading photo:", error);
            toast.error("Error uploading photo");
        }
    };

    const handleUploadClick = () => {
        inputRef.current.click();
    };

    const getProfilePic = async (userId) => {
        try {
            const config = {
                responseType: "blob",
            };

            console.log("Fetching profile pic...");

            const response = await axios.get(`${API_URL}/friends/${userId}/pic`, config);
            const reader = new FileReader();

            return new Promise((resolve, reject) => {
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(response.data);
            });
        } catch (error) {
            console.error("Error fetching profile pic:", error);
            throw error;
        }
    };


    return (
        <Box className={styles.profileContainer}
             display="flex" flexDirection="column"
             sx={{
                 position: "relative",
                 backgroundColor: theme.palette.primary.secondary,
                 borderColor: theme.palette.primary.main
             }}
        >
            <div className={styles.profileHeader}>
                {/*<Avatar alt="Profile Picture" src={profilePics[profile.id]?.pic === "data:text/xml;base64," ? null : profilePics[profile.id]?.pic*/}
                {/*} style={{ width: 345, height: 230 }} variant="square"*/}
                {/*/>*/}
                <Avatar
                    // src={profile.profilePictureUrl}
                    // src={avatarImage}
                    // src="/_next/static/media/StudyBuddyLogo.4d4a46a7.png"
                    // alt="/StudyBuddyLogo.png"
                    src={profilePic || null}
                    alt="Profile Picture"
                    className={styles.avatar}
                    sx={{
                        width: "100px",
                        height: "100px",
                        border: "1px solid",
                        borderColor: theme.palette.primary.main,
                    }}
                />
                <Typography variant="h6" component="h2"
                    sx={{
                        display: "inline",
                        flexGrow: 0, // Allow the Typography to grow and shrink as needed
                        overflow: 'hidden', // Hide any overflowing text
                        textOverflow: 'ellipsis', // Add ellipsis for text overflow
                        whiteSpace: 'normal', // Prevent text from wrapping
                        marginLeft: "15px", // Add some space between Avatar and Typography
                        marginRight: "15px",
                        maxWidth: "150px",
                    }}
                >
                    {profile.nameFirst} {profile.nameLast}
                </Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                    ref={inputRef}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUploadClick}
                    sx={{
                        // marginLeft: "auto",
                        // marginRight: "auto",
                        marginTop: "15px",
                        marginBottom: "15px",
                        padding: "20px",
                        width: "200px",
                        // flexGrow: 1,
                        flexShrink: 0,
                        height: "30px"
                    }}
                >
                    Change Photo
                </Button>
            </div>
            <Box
                sx={{
                    //marginLeft: "10px",
                    // flexGrow: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "15px",
                    marginBottom: "15px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    width: "20vw",
                    '& .MuiInputLabel-root': {
                        color: theme.palette.primary.main, // Change the color of the label
                    },
                    // '& .MuiInputBase-input': {
                    //     color: theme.palette.primary.main, // Change the color of the input text
                    // },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: theme.palette.primary.main, // Change the color of the underline when the input is not focused
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: theme.palette.primary.main, // Change the color of the underline when the input is focused
                    },
                    '& .Mui-disabled': {
                        color: theme.palette.primary.main, // Change the color of the text when disabled
                    },
                }} >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    name="emailAddress"
                    value={profile.emailAddress || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    value={profile.username || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="First Name"
                    name="nameFirst"
                    value={profile.nameFirst || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="nameLast"
                    value={profile.nameLast || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                />
            </Box>
            <Box
                sx={{
                    // flexGrow: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "15px",
                    marginBottom: "15px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    width: "20vw"
                }} >
                <div className={styles.coursesContainer}>
                    <Typography variant="subtitle1">Area of Study:</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Computer Science")} onChange={handleCourseChange} name="Computer Science" />}
                        label="Computer Science"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Biology")} onChange={handleCourseChange} name="Biology" />}
                        label="Biology"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Physics")} onChange={handleCourseChange} name="Physics" />}
                        label="Physics"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Mathematics")} onChange={handleCourseChange} name="Mathematics" />}
                        label="Mathematics"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCourses.includes("Chemistry")} onChange={handleCourseChange} name="Chemistry" />}
                        label="Chemistry"
                        disabled={!editMode}
                    />
                </div>
            </Box>
            <Box
                sx={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "15px",
                marginBottom: "15px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                width: "20vw"
                }} >
                <div className={styles.coursesContainer}>
                    <Typography variant="subtitle1">Time Preference:</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={selectedTime === "morning"} onChange={handlePrefTimeChange} name="morning" />}
                        label="Morning"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedTime === "evening"} onChange={handlePrefTimeChange} name="evening" />}
                        label="Evening"
                        disabled={!editMode}
                    />
                </div>
            </Box>
            <Box
                sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "15px",
                    marginBottom: "15px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    width: "20vw"
                }} >
                <div className={styles.coursesContainer}>
                    <Typography variant="subtitle1">Meeting Type Preference:</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={selectedMeetingType === "physical"} onChange={handleMeetingTypeChange} name="physical" />}
                        label="Physical"
                        disabled={!editMode}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedMeetingType === "virtual"} onChange={handleMeetingTypeChange} name="virtual" />}
                        label="Virtual"
                        disabled={!editMode}
                    />
                </div>
            </Box>
            <Button
                sx={{
                    // flexGrow: 0,
                    variant: "contained",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10px",
                    marginBottom: "10px",
                    //padding: "20px",
                    //border: "1px solid #ddd",
                    //borderRadius: "5px",
                    width: "20vw"
                }}
                onClick={editMode ? handleSaveClick : handleEditClick} variant="contained" color="primary"
            >
                {editMode ? 'Save Changes' : 'Edit Profile'}
            </Button>
        </Box>
    );
}

export default ProfileDisplay;

