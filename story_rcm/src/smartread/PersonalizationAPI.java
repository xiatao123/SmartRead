package smartread;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import smartread.db.DBServeEvent;
import smartread.db.DBStory;
import smartread.db.DBUser;

public class PersonalizationAPI {
    public List<Story> getUserStory(String uid) {
        List<Story> stories = DBStory.retrieveDefaultStory();
        User user = DBUser.retrieveUser(uid);
        return calcualte(user, stories);
    }

    public void updateUserInterests(int lookbackMinute) {
        Map<String, List<ServeEvent>> serves = DBServeEvent.QueryEvents(lookbackMinute);
        String freq;
        if(lookbackMinute==5)
            freq = "5m";
        else if(lookbackMinute==60*24)
            freq = "1d";
        else if(lookbackMinute==60*24*7)
            freq = "7d";
        else{
            return;
        }
        
        for (String uid : serves.keySet()) {
            List<String> tags = new ArrayList<String>();
            List<ServeEvent> userServes = serves.get(uid);
            for(ServeEvent s: userServes){
                String storyID = s.getStoryID();
                Story story = DBStory.getStory(storyID);
                tags.addAll(story.getTags());
            }
            DBUser.updateUserInterest(uid, freq, tags);
        }
    }

    private List<Story> calcualte(User user, List<Story> stories) {
        Map<String, Double> interest = user.getInterests();
        if (interest.size() == 0)
            return stories;

        for (Story s : stories) {
            List<String> tags = s.getTags();
            s.setScore(s.getScore()*Utils.evaluateInterest(interest, tags));
        }
        return stories;
    }

    public static void main(String args[]) {
        PersonalizationAPI api = new PersonalizationAPI();
        api.updateUserInterests(5);

        List<Story> stories = api.getUserStory("test_user1");
        for (Story s : stories) {
            System.out.println(s);
        }
    }
}
