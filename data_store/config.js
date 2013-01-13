var config = {};

config.host = '127.0.0.1';
config.port = 27017;

config.sites = {
	
	news: {
		url1: "http://nbweekly.feedsportal.com/c/34905/f/643776/index.rss",
		url2: ""
	},

	sports: {

	},

	tech: {
		url1: "http://tech2ipo.com/feed",
		url2: "http://www.ifanr.com/feed",
		url3: "http://www.36kr.com/feed",
		url4: "http://www.leiphone.com/feed", //not working with image and link
		url5: "http://feeds.geekpark.net" //not working with image
	},

	web: {

	},

	fashion: {
		url1: "http://www.fashiondes.com/rss",
		url2: "http://cn.nowness.com/issue/syndicate?output=rss"

	},

	education: {

	},

	movie: {
		url1: "http://smweekly.feedsportal.com/c/35020/f/646841/index.rss",
		url2: "http://news.baidu.com/n?cmd=1&class=enternews&tn=rss"		

	},

	finance: {

	}
}

config.category = {
	'http://www.ifanr.com/feed' : 'tech',
	'http://tech2ipo.com/feed' : 'tech'
}

module.exports = config;