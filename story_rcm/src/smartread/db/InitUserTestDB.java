package smartread.db;

import java.net.UnknownHostException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

public class InitUserTestDB {
	public static void main(String args[]) throws UnknownHostException {
		MongoClient mongoClient = new MongoClient();
		DB db = mongoClient.getDB("test");
		DBCollection coll = db.getCollection("users");

		BasicDBObject doc = new BasicDBObject("uid", "test_user1").append(
				"interests", new BasicDBObject("tech", 2).append("news", 3));
		coll.insert(doc);

		doc = new BasicDBObject("uid", "test_user2").append(
				"interests", new BasicDBObject("spt", 3).append("fin", 2));
		coll.insert(doc);
	}
}
