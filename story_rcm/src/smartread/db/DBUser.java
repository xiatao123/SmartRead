package smartread.db;

import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

import smartread.User;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

public class DBUser {
    public static User retrieveUser(String uid) {
        MongoClient mongoClient = null;
        try {
            mongoClient = new MongoClient();
        } catch (UnknownHostException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }
        DB db = mongoClient.getDB("test");
        DBCollection coll = db.getCollection("users");

        DBObject obj = new BasicDBObject("uid", uid);
        DBObject userInfo = coll.findOne(obj);

        Map<String, Double> maps = new HashMap<String, Double>();
        DBObject interests;

        String[] int_info = { "interests_5m", "interests_1d", "interests_7d" };
        for (String s : int_info) {
            interests = (DBObject) userInfo.get(s);
            for (String key : interests.keySet()) {
                if (maps.containsKey(key)) {
                    maps.put(
                            key,
                            maps.get(key)
                                    + Double.valueOf(interests.get(key)
                                            .toString()));
                } else {
                    maps.put(key, Double.valueOf(interests.get(key).toString()));
                }
            }
        }

        return new User((String) userInfo.get("uid"), maps);
    }

    public static void updateUserInterest(User user) {
        MongoClient mongoClient = null;
        try {
            mongoClient = new MongoClient();
        } catch (UnknownHostException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return;
        }
        DB db = mongoClient.getDB("test");
        DBCollection coll = db.getCollection("users");

        DBObject q = new BasicDBObject("uid", user.getUid());
        BasicDBObject interestsDB = null;
        for (String key : user.getInterests().keySet()) {
            if (interestsDB == null) {
                interestsDB = new BasicDBObject(key, user.getInterests().get(
                        key));
            } else {
                interestsDB.append(key, user.getInterests().get(key));
            }
        }
        coll.update(q, new BasicDBObject("interests", interestsDB));
    }
}
