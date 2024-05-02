import React, { useEffect, useState } from "react"
import ProfileDisplay from "@/components/ProfileDisplay"
import { useSelector } from "react-redux"
import { selectToken } from "@/utils/authSlice.js"
import Box from "@mui/material/Box"
import { useRouter } from "next/router"
import { useTheme } from "@mui/material/styles"
import TutorInfo from "@/components/TutorInfo"
import axios from "axios"
import { API_URL } from "@/utils/config"
import { Modal } from "@mui/material"

function UserProfileModal({ open, onClose, user }) {
  const theme = useTheme()
  const token = useSelector(selectToken)
  const router = useRouter()
  const [profile, setProfile] = useState("")

  useEffect(() => {
    if (user) {
      console.log("user", user)
      fetchProfileInfo(user.id)
    }
  }, [user])

  const fetchProfileInfo = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/profile/${userId}`)
      setProfile(response.data)
    } catch (error) {
      console.error("Error fetching profile info:", error)
    }
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        }}

      >
        <Box
          sx={{
            pt: 2,
            padding: 2,

            display: 'flex',
            justifyContent: 'center',
            overflow: 'auto',
            height: 'calc(100vh - 64px)',
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Box
            sx={{
              display: 'flex', // Set display to flex to align children horizontally
              alignItems: 'start',
              gap: 2, // Adjust gap for space between components
              marginTop: 2,
            //   width: 'auto', // Adjust width as per content
            //   maxWidth: 'calc(100vw - 64px)', // Adjust max width for viewport minus padding
              bgcolor: 'background.paper',
            }}
          >
            {/* ProfileDisplay without the sx prop */}
            <ProfileDisplay
              editable={false}
              uniqueId={user.id}
            />
            {profile.userType && (
              <Box
                sx={{
                  p: 2, // padding inside the Box wrapping TutorInfo
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  borderRadius: 1,
                //   width: 300, // Assign a fixed width or use flex properties
                  minHeight: '100%', // Assign a min-height to match ProfileDisplay
                  bgcolor: 'background.paper',
                  boxShadow: 1, // Optional shadow effect
                  overflowY: 'auto', // Allows scrolling for overflow content
                }}
              >
                <TutorInfo modalUserId={user.id} />
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default UserProfileModal
