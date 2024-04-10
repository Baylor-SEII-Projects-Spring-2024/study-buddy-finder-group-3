package studybuddy.api.user;

import java.sql.Time;

public class Message {

    private Long id;
    private Time timestamp;
    private String content;
    private User sender;
    private Chat chat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Time getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Time timestamp) {
        this.timestamp = timestamp;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public Message(Long id, Time timestamp, String content, User sender, Chat chat) {
        this.id = id;
        this.timestamp = timestamp;
        this.content = content;
        this.sender = sender;
        this.chat = chat;
    }

    public Message(){
    }


}
