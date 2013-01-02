package smartread.db;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

import smartread.Story;

public class DBStory {
    public static List<Story> retrieveDefaultStory() {
        MongoClient mongoClient = null;
        try {
            mongoClient = new MongoClient();
        } catch (UnknownHostException e) {
            e.printStackTrace();
            return null;
        }
        DB db = mongoClient.getDB("test");

        DBCollection coll = db.getCollection("stories");

        DBCursor cursor = coll.find();
        List<Story> stories = new ArrayList<Story>();
        try {
            while (cursor.hasNext()) {
                DBObject obj = cursor.next();
                Double score = Double.valueOf(obj.get("score").toString());
                String id = obj.get("_id").toString();
                List<String> tags = new ArrayList<String>();
                tags.add((String) obj.get("category"));
                stories.add(new Story(id, tags, score));
            }
        } finally {
            cursor.close();
        }
        return stories;
    }
}
