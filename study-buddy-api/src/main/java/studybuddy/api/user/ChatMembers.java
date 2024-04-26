//package studybuddy.api.user;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//@Data
//@Entity
//@Table(name = ChatMembers.TABLE_NAME)
//public class ChatMembers {
//    public static final String TABLE_NAME = "CHAT_MEMBERS";
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "CHAT_MEMBERS_ID")
//    Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "CHAT_ID", referencedColumnName = "CHAT_ID", foreignKey = @ForeignKey(name = "FK_CHAT_ID"))
//    Chat chat_id;
//
//    @ManyToOne //User in the chat
//    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_MEMBER_ID"))
//    User user_id;
//}
