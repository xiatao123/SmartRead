package smartread;

public class ServeEvent {
    String storyID;
    String uid;
    String tags;
    int timespend;

    public ServeEvent(String storyID, String uid, String tags, int timespend) {
        super();
        this.storyID = storyID;
        this.uid = uid;
        this.tags = tags;
        this.timespend = timespend;
    }
}
