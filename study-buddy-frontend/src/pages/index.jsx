import React, { useState } from "react";
import Head from "next/head";
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import styles from "@/styles/Home.module.css";
import landingstyles from "@/styles/landing.module.css";
import Header from "@/components/Header.jsx"

function landing() {

  return (
    <>
      <Head>
        <title>StudyBuddy | Your Go-To Study Site</title>
      </Head>
      <Header/>

      <main>
        <h1 className={landingstyles.testingCss}>Landing page</h1>

      </main>
    </>
  );
}

export default landing;

// export default function HomePage() {
//   const onButtonPress = () => {
//     alert('You pressed a button!');
//   }

//   return (
//     <>
//       <Head>
//         <title>Home Page</title>
//       </Head>

//       <main>
//         <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
//           <Card sx={{ width: 600 }} elevation={4}>
//             <CardContent>
//               <Typography variant='h3' align='center'>Study Buddy Spring 2024</Typography>
//               <Typography variant='body1' color='text.secondary'>This is your template project for the Spring 2024 Baylor Software Engineering II class project! See the README for insturctions on how to set this project up and run it locally.</Typography>
//             </CardContent>
//           </Card>
//           <Stack direction="row">
//             {/* There are multiple ways to apply styling to Material UI components. One way is using the `sx` prop: */}
//             <Button variant='contained' onClick={onButtonPress} sx={{ width: 200 }}>I am a button</Button>

//             {/* Another way is by creating a dedicated CSS file and using the styles from there: */}
//             <Button variant='contained' color="secondary" onClick={onButtonPress} className={styles.wideButton}>I am a wider button</Button>
//           </Stack>
//         </Stack>
//       </main>
//     </>
//   );
// }
