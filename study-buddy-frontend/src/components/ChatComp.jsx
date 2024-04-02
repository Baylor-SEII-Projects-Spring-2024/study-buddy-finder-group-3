import React from "react"
import styles from "@/styles/Chat.module.css";
import Messages from "@/components/Messages"
import ChatInput from "@/components/ChatInput"

const ChatComp = () => {
  return (
    <div className={styles.ChatComp}>
      <div className={styles.chatInfo}>
        <span>Keith</span>
        <div className={styles.chatIcons}>
          <img src = {"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6409/6409982_sd.jpg;maxHeight=640;maxWidth=550"} alt={""}/>
          <img src = {"https://media.istockphoto.com/id/1135563582/vector/user-add-plus-icon-can-be-used-for-web-logo-mobile-app-ui-ux.jpg?s=612x612&w=0&k=20&c=u3P_ftqcWMZ4IbMHcP791jwBMpPEaQjYh-YUua3iz9s="} alt={""}/>
          <img src = {"https://media.licdn.com/dms/image/C4D12AQHuT37YRsxMXA/article-cover_image-shrink_600_2000/0/1598988274873?e=2147483647&v=beta&t=VVWsmFNjMrGE63fn2jWfWlsGBUGnzLDCInAthXYztJY"} alt={""}/>
        </div>
      </div>
      <Messages />
      <ChatInput />
    </div>
  )
}
export default ChatComp
