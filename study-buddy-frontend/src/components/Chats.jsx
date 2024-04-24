import React, { useEffect, useState } from "react"
import styles from "@/styles/Chat.module.css";
import axios from "axios"
import { API_URL } from "@/utils/config"

const fallbackPic = "profilePicture.png"

const Chats = ({ friends, onUserSelect, selectedUser }) => {
  // const [profilePics, setProfilePics] = useState([])
  //
  // const getProfilePics = async (friends) => {
  //   try {
  //     const config = {
  //       responseType: "blob",
  //     }
  //     console.log("Fetching profile pics...")
  //     const promises = []
  //
  //     for (let i = 0; i < users.length; i++) {
  //       promises.push(
  //         new Promise((resolve, reject) => {
  //           axios
  //             .get(`${API_URL}/friends/${users[i].id}/pic`, config)
  //             .then((response) => {
  //               const reader = new FileReader()
  //               reader.readAsDataURL(response.data)
  //               reader.onload = () => {
  //                 resolve({ id: users[i].id, pic: reader.result })
  //               }
  //               reader.onloadend = () => {
  //                 if (i === friends.length - 1) {
  //                   setLoadingPics(false)
  //                 }
  //               }
  //             })
  //             .catch((error) => {
  //               reject(error)
  //               if (i === users.length - 1) {
  //                 setLoadingPics(false)
  //               }
  //             })
  //         })
  //       )
  //     }
  //
  //     // Wait for all promises to resolve
  //     const profilePicsArray = await Promise.all(promises)
  //
  //     // Update state with all profile pictures
  //     setProfilePics(profilePicsArray)
  //   } catch (error) {
  //     console.error("Error fetching profile pics:", error)
  //   }
  // }

  const handleUserClick = (selectedUser) => {
    // Call the onUserSelect callback with the selected user data
    onUserSelect(selectedUser);
  };



  return (
    <div className={styles.Chats}>
      <h2>Your Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li
            key={friend.id}
            onClick={() => handleUserClick(friend)}
            className={selectedUser && friend.id === selectedUser.id ? styles.SelectedUser : ""}
          >
            <div className={styles.UserChat}>
              {/*<img className={styles.img}*/}
              {/*     alt="Profile Picture"*/}
              {/*     src={*/}
              {/*       profilePics[index]?.pic === "data:text/xml;base64,"*/}
              {/*         ? null*/}
              {/*         : profilePics[index]?.pic} />*/}
              <div className={styles.UserChatInfo}>
                <span>{friend.username}</span>
                {/*<p>{friend.statusMessage}</p>*/}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
