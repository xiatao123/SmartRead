package smartread.db;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import smartread.ServeEvent;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

public class DBServeEvent {
    private static final Logger logger = LogManager.getLogger(DBUser.class);

    public static Map<String, List<ServeEvent>> QueryEvents(int min) {
        Long starttime = System.currentTimeMillis();

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

        DBCollection coll = db.getCollection("serve_events");
        BasicDBObject query = new BasicDBObject("timestamp", new BasicDBObject(
                "$gt", time));
        DBCursor cursor = coll.find(query);

        Map<String, List<ServeEvent>> serves = new HashMap<String, List<ServeEvent>>();
        try {
            while (cursor.hasNext()) {
                DBObject obj = cursor.next();
                if(!serves.containsKey((String) obj.get("uid"))){
                    serves.put((String) obj.get("uid"), new ArrayList<ServeEvent>());
                }
                
                serves.get((String) obj.get("uid")).add(new ServeEvent((String) obj.get("story_id"),
                        (String) obj.get("uid"), (String) obj.get("tags"),
                        (Integer) obj.get("timespend")));
            }
        } finally {
            cursor.close();
        }
        Long endtime = System.currentTimeMillis();
        logger.debug("Time(ms) taken to retrive serve events for the last "+min+" minutes: "+ String.valueOf(endtime-starttime));
        return serves;
    }
}
