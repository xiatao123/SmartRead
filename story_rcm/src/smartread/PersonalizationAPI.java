package smartread;

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
        List<ServeEvent> serves = DBServeEvent.QueryEvents(lookbackMinute);
        for (ServeEvent s : serves) {
            System.out.println(s);
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
        (new PersonalizationAPI()).updateUserInterests(5);

        // List<Story> stories = (new PersonalizationAPI())
        // .getUserStory("test_user1");
        // for (Story s : stories) {
        // System.out.println(s);
        // }
    }
}
