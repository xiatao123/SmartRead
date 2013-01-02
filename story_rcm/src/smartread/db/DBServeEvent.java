package smartread.db;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import smartread.ServeEvent;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

public class DBServeEvent {

    public static List<ServeEvent> QueryEvents(int min) {
        MongoClient mongoClient = null;
        try {
            mongoClient = new MongoClient();
        } catch (UnknownHostException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }
        DB db = mongoClient.getDB("test");

        Long current = System.currentTimeMillis();
        Long time = current - min * 60 * 1000;
        // System.out.println(current+" "+time);
        time = Long.valueOf("1357049969819");

        DBCollection coll = db.getCollection("serve_events");
        BasicDBObject query = new BasicDBObject("timestamp", new BasicDBObject(
                "$gt", time));
        DBCursor cursor = coll.find(query);

        List<ServeEvent> serves = new ArrayList<ServeEvent>();
        try {
            while (cursor.hasNext()) {
                DBObject obj = cursor.next();
                serves.add(new ServeEvent((String) obj.get("story_id"),
                        (String) obj.get("uid"), (String) obj.get("tags"),
                        (Integer) obj.get("timespend")));
            }
        } finally {
            cursor.close();
        }
        return serves;
    }
}
