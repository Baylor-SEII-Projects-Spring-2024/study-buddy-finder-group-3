import React from 'react';
import { Link, Typography } from '@mui/material';
import { Button } from 'react-scroll';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Terms = () => {

    const returnHome = () => {
        window.location.href = "/";
    }

    return (
        <div>
            <Header/>
            <Typography variant="h1">Terms of Service</Typography>
            <Typography variant="h3">1. Terms</Typography>
            <Typography variant="body1">
                By accessing the website at https://studybuddy.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trade mark law.
            </Typography>
            <Typography variant="h3">2. Use License</Typography>
            <Typography variant="body1">
                Permission is granted to temporarily download one copy of the materials (information or software) on StudyBuddy's website for personal
                transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </Typography>
            <Typography variant="body1">
                modify or copy the materials;
                use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
                attempt to decompile or reverse engineer any software contained on StudyBuddy's website;
                remove any copyright or other
                proprietary notations from the materials; or
                transfer the materials to another person or "mirror" the materials on any other server.
            </Typography>
            <Typography variant="body1">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by StudyBuddy at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
            </Typography>
            <Typography variant="h3">3. Disclaimer</Typography>
            <Typography variant="body1">
                The materials on StudyBuddy's website are provided on an 'as is' basis. StudyBuddy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </Typography>
            <Typography variant="body1">
                Further, StudyBuddy does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </Typography>
            <Typography variant="h3">4. Limitations</Typography>
            <Typography variant="body1">
                In no event shall StudyBuddy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on StudyBuddy's website, even if StudyBuddy or a StudyBuddy authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </Typography>
            <Footer/>
        </div>
    );
};

export default Terms;