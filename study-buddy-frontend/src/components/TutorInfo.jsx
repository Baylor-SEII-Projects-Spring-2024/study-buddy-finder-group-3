import React, { useState, useEffect } from "react";
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
import {Star as StarIcon} from "@mui/icons-material";
import {StarHalf as StarHalfIcon} from "@mui/icons-material";
import StarBorderIcon from '@mui/icons-material/StarBorder';

function TutorInfo() {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const router = useRouter();
    const [profile, setProfile] = useState('');
    const [userId, setUserId] = useState('');
    const [tutorRatings, setTutorRatings] = useState([]);
    const theme = useTheme()
    const imagePath = avatarImage;
    const [loading, setLoading] = useState(true); // Add loading state
    // console.log(avatarImage);

    useEffect(() => {
        if (user) {
            setUserId(user.id);
            fetchProfileInfo(user.id);
        }
    }, [user]);

    const fetchProfileInfo = async (userId) => {
        try {
            const profileResponse = await axios.get(`${API_URL}/profile/${userId}`);
            setProfile(profileResponse.data);

            console.log("USER:", profileResponse.data);

            console.log("Tutor Status:", profileResponse.data.userType);

            if (profileResponse.data.userType) {
                const tutorRatingResponse = await axios.get(`${API_URL}/tutor/${userId}/rating`);
                setTutorRatings(tutorRatingResponse.data);
                console.log(tutorRatings);
                setLoading(false); // Set loading to false when ratings are fetched
            }
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>; // Render loading indicator
    }

    // Render the TutorInfo component only if tutorBool is true
    if (profile.userType == false) {
        console.log("NOT A TUTOR")
        return null; // If tutorBool is false, don't render anything
    }

    // function calculateAverageRating(ratings) {
    //     const sum = ratings.reduce((acc, ratingString) => {
    //         const [, rating] = ratingString.split(',');
    //         return acc + parseInt(rating);
    //     }, 0);
    //     const average = sum / ratings.length;
    //     return isNaN(average) ? 'N/A' : average.toFixed(1); // Display 'N/A' if no ratings
    // }

    // function calculateAverageRating(ratings) {
    //     if (!ratings || ratings.length === 0) {
    //         return 'N/A';
    //     }
    //
    //     const sum = ratings.reduce((acc, ratingString) => {
    //         const rating = parseFloat(ratingString.split(',')[1]);
    //         return acc + rating;
    //     }, 0);
    //
    //     const average = sum / ratings.length;
    //     return isNaN(average) ? 'N/A' : average.toFixed(1);
    // }

    function calculateAverageRating(ratings) {
        if (!ratings || ratings.length === 0) {
            return 'N/A';
        }

        const sum = ratings.reduce((acc, ratingString) => {
            const match = ratingString.match(/^(.*?),\s*(\d+(\.\d+)?|\.\d+)$/);
            if (!match) return acc; // If the ratingString doesn't match the pattern, skip it
            const [, , rating] = match; // Extract the rating from the match
            const numericRating = parseFloat(rating); // Convert the rating string to a number
            return acc + numericRating;
        }, 0);

        const average = sum / ratings.length;
        return isNaN(average) ? 'N/A' : average.toFixed(1);
    }


    // Calculate the average rating, assuming it's a decimal
    const averageRating = calculateAverageRating(tutorRatings);
    const wholeStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;
    console.log(profile.userType);
    console.log(averageRating);
    console.log(wholeStars);
    console.log(tutorRatings.length);
    console.log(tutorRatings);
    return (
        <Box className={styles.profileContainer}
             display="flex" flexDirection="column"
             sx={{
                 position: "relative",
                 backgroundColor: theme.palette.primary.secondary,
                 borderColor: theme.palette.primary.main
             }}
        >
            <Typography variant="h4">Tutor Information</Typography>
            <Typography variant="h6">Name: {profile.nameFirst} {profile.nameLast}</Typography>
            <Typography variant="body1">Email: {profile.emailAddress}</Typography>
            <Typography variant="body1">Username: {profile.username}</Typography>
            {tutorRatings.length > 0 && (
                <Box mt={2}>
                    <Box mt={2}>
                        <Typography variant="h6" mr={1}>
                            Average Rating: {isNaN(averageRating) ? 'N/A' : averageRating}
                        </Typography>
                        {!isNaN(wholeStars) && [...Array(wholeStars)].map((_, i) => (
                            <StarIcon
                                key={i}
                                sx={{ color: theme.palette.secondary.main }}
                            />
                        ))}
                        {hasHalfStar && (
                            <span style={{ position: 'relative', display: 'inline-block' }}>
                                {/*<StarIcon sx={{ color: theme.palette.secondary.main }} />*/}
                                {/*<StarBorderIcon sx={{ position: 'absolute', color: theme.palette.secondary.main, clip: 'rect(0, 0.5em, 1em, 0)' }} />*/}
                                <StarHalfIcon sx={{ color: theme.palette.secondary.main }} />
                            </span>
                        )}
                    </Box>

                    <br/>

                    <Typography variant="h5">Reviews:</Typography>
                    {tutorRatings.map((ratingString, index) => {
                        // Use regular expression to match the comment and rating
                        const match = ratingString.match(/^(.*?),\s*(\d+(\.\d+)?|\.\d+)$/);
                        if (!match) return null; // If the ratingString doesn't match the pattern, skip it
                        const [, comment, rating] = match; // Extract the comment and rating from the match
                        const numericRating = parseInt(rating); // Convert the rating string to a number
                        // Add a check to ensure numericRating is a valid number
                        const validNumericRating = isNaN(numericRating) ? 0 : numericRating;
                        return (
                            <Box key={index} mt={1}>
                                {[...Array(validNumericRating)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        sx={{ color: theme.palette.secondary.main }}
                                    />
                                ))}
                                <Typography variant="body1">Rating: {rating}</Typography>
                                <Typography variant="body1">Comment: {comment}</Typography>
                                <br/>
                            </Box>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}

export default TutorInfo;
