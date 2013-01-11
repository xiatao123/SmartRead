var DataProvider = require('../db-provider').DataProvider;
var options = require('../db-settings');

var PM = {};

var dp = new DataProvider(options);

PM.db = dp.db;
PM.posts =  PM.db.collection('posts');

module.exports = PM;

PM.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving post: ' + id);
    PM.posts.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
        res.send(item);
    });
};

PM.findAll = function(req, res) {
    PM.posts.find().sort({pubDate:-1}).toArray(function(err, items) {
        res.send(items);
    });
};

PM.addPost = function(req, res) {
    var post = req.body;
    console.log('Adding post: ' + JSON.stringify(post));
    PM.posts.insert(post, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            console.log('Success: ' + JSON.stringify(result[0]));
            res.send(result[0]);
        }
    });
};

PM.updatePost = function(req, res) {
    var id = req.params.id;
    var post = req.body;
    delete post._id;
    console.log('Updating post: ' + id);
    console.log(JSON.stringify(post));
    PM.posts.update({'_id':new BSON.ObjectID(id)}, post, {safe:true}, function(err, result) {
        if (err) {
            console.log('Error updating post: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log('' + result + ' document(s) updated');
            res.send(post);
        }
    });
};

PM.deletePost = function(req, res) {
    var id = req.params.id;
    console.log('Deleting post: ' + id);
    PM.posts.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var posts = [
    {
        name: "苹果发布年度最佳iOS应用与游戏榜单：Paper等击败群雄摘获殊荣",
        description: "苹果日前公布了2012年最佳iOS应用和游戏榜单。今年最佳娱乐类和最佳工具类应用分别被Action Movie FX（iPhone）和Paper（iPad）获得，另外，Unisoft的《雷曼：丛林冒险》荣膺本年度最佳付费应用。",
        content: '<p><img src="http://img0.tech2ipo.com/upload/img/article/2012/12/1355458403478.jpg" style="float:none;width:642px;height:283px;" title="年度最佳" border="0" hspace="0" vspace="0" width="642" height="283" /></p><p>继Google公布“<a href="http://tech2ipo.com/56969" target="_blank">2012年搜索热榜</a>”和Facebook“<a href="http://tech2ipo.com/56983" target="_blank">20大精彩瞬间</a>”榜单之后。日前，据科技媒体<a href="http://news.cnet.com/8301-13579_3-57559063-37/apple-names-top-apps-games-of-2012/" target="_blank">CNET</a>报道，苹果也在本周四公布了“2012年最佳iOS应用和游戏榜单”，这项排名涉及内容包括免费与付费应用、音乐、电影、电视剧和图书等，且应用分别来自OSX和iOS的App Store。今年最佳娱乐类和最佳工具类应用分别被<a href="https://itunes.apple.com/us/app/id489321253?mt=8" target="_blank">Action Movie FX</a>（iPhone）和<a href="https://itunes.apple.com/us/app/id506003812?mt=8" target="_blank">Paper</a>（iPad）获得，另外，Unisoft的《<a href="https://itunes.apple.com/us/app/id537931449?mt=8" target="_blank">雷曼：丛林冒险</a>》荣膺本年度最佳付费游戏。</p><!--more--><p>此外，Fireproof出品的游戏《<a href="https://itunes.apple.com/us/app/id422304217?mt=12" target="_blank">The Room</a>》获得年度最佳iPad游戏，付费新闻应用《<a href="https://itunes.apple.com/us/app/id422304217?mt=12" target="_blank">Day One</a>》荣获Mac付费应用榜冠军。OSX游戏榜单中，6月份获得“苹果世界开发者大会暨Mac开发者会议”应用设计大奖的“<a href="https://itunes.apple.com/us/app/id489813114?mt=12" target="_blank">Dues EX:Human Revolution-Ultimate Edition</a>”获得OSX游戏榜最佳应用。以下为全部媒体类与应用类榜单：</p><p><img src="http://img0.tech2ipo.com/upload/img/article/2012/12/1355462100435.jpg" style="float:none;width:642px;height:332px;" title="音乐类" border="0" hspace="0" vspace="0" width="642" height="332" /></p><p><strong><span style="font-size:18px;">音乐类：</span></strong><br /></p><ol style="list-style-type:decimal;"><li><p>最佳艺术家——<a href="https://itunes.apple.com/us/album/channel-orange/id541953504" target="_blank">Frank Ocean</a>（歌曲：Channel Orange）</p></li><li><p>最佳专辑——<a href="https://itunes.apple.com/us/album/shields/id557858458" target="_blank">Shields</a>（歌手：Grizzly Bear）</p></li><li><p>最佳歌曲——<a href="https://itunes.apple.com/us/album/we-are-young-single-feat./id463207143" target="_blank">We Are Young</a>（歌手：Fun.）</p></li><li><p>最具突破专辑——<a href="https://itunes.apple.com/us/album/the-lumineers/id502683755" target="_blank">The Lumineers</a>（歌手：The Lumineers）</p></li></ol><p><img src="http://img0.tech2ipo.com/upload/img/article/2012/12/1355462405513.jpg" style="float:none;width:642px;height:316px;" title="iPhone与iPad应用" border="0" hspace="0" vspace="0" width="642" height="316" /></p><p><strong><span style="font-size:18px;">iPhone与iPad应用和游戏类：</span></strong></p><ul style="list-style-type:square;"><li><p>年度最佳iPhone应用——<a href="https://itunes.apple.com/us/app/action-movie-fx/id489321253?mt=8" target="_blank">Action Movie FX</a></p></li><li><p>年度最佳iPhone游戏——<a href="https://itunes.apple.com/us/app/rayman-jungle-run/id537931449?mt=8" target="_blank">雷曼：丛林逃跑</a></p></li><li><p>年度最佳iPad应用——<a href="https://itunes.apple.com/us/app/paper-by-fiftythree/id506003812?mt=8" target="_blank">Paper</a></p></li><li><p>年度最佳iPad游戏——<a href="https://itunes.apple.com/us/app/the-room/id552039496?mt=8" target="_blank">The Room</a></p></li></ul><p><img src="http://img0.tech2ipo.com/upload/img/article/2012/12/1355462685577.jpg" style="float:none;width:642px;height:355px;" title="电影类" border="0" hspace="0" vspace="0" width="642" height="355" /></p><p><strong><span style="font-size:18px;">电影类：</span></strong></p><ul style="list-style-type:square;"><li><p>最佳畅销电影——<a href="https://itunes.apple.com/us/movie/the-avengers/id533654020" target="_blank">《复仇者联盟》</a></p></li><li><p>最佳导演奖——<a href="https://itunes.apple.com/us/movie/moonrise-kingdom/id537947696" target="_blank">《月升王国》</a></p></li><li><p>最佳发现奖——<a href="https://itunes.apple.com/us/movie/beasts-of-the-southern-wild/id557700186" target="_blank">《南国野兽》</a></p></li><li><p>最佳表演奖——<a href="https://itunes.apple.com/us/movie/the-hunger-games/id521035514" target="_blank">《饥饿游戏》</a></p></li></ul><p><img src="http://img0.tech2ipo.com/upload/img/article/2012/12/1355463108663.jpg" style="float:none;width:642px;height:359px;" title="书籍类" border="0" hspace="0" vspace="0" width="642" height="359" /></p><p><strong><span style="font-size:18px;">书籍类：</span></strong></p><ul style="list-style-type:square;"><li><p>最佳小说——《<a href="https://itunes.apple.com/us/book/the-dog-stars/id504188911?mt=11" target="_blank">The Dog Stars</a>》</p></li><li><p>最佳非小说类文学作品——《<a href="https://itunes.apple.com/us/book/behind-beautiful-forevers/id422547805?mt=11" target="_blank">Behind the Beautiful Forevers：Life，Death and Hope in Mumbai Undercity</a>》</p></li><li><p>最佳青少年小说——《<a href="https://itunes.apple.com/us/book/the-dog-stars/id504188911?mt=11" target="_blank">The Fault in Our Stars</a>》</p></li><li><p>最适合多点触控书籍——《<a href="https://itunes.apple.com/us/book/fashion/id566404565?mt=11" target="_blank">Fashion</a>》</p></li></ul><p><img src="http://img0.tech2ipo.com/upload/img/article/2012/12/1355463511014.jpg" style="float:none;width:642px;height:322px;" title="电视节目类" border="0" hspace="0" vspace="0" width="642" height="322" /></p><p><strong><span style="font-size:18px;">电视节目类：</span></strong></p><ul style="list-style-type:square;"><li><p>最佳节目奖——《<a href="https://itunes.apple.com/us/tv-season/breaking-bad-season-5/id533936970" target="_blank">绝命毒师</a>》第五季</p></li><li><p>最佳情节奖——《<a href="https://itunes.apple.com/us/tv-season/the-weekend/id544435219?i=546519007" target="_blank">国土安全</a>》第一季</p></li><li><p>最佳处女作奖——《<a href="https://itunes.apple.com/us/tv-season/girls-season-1/id526752134" target="_blank">都市女郎</a>》第一季</p></li><li><p>最佳表演奖——《<a href="https://itunes.apple.com/us/tv-season/happy-endings-season-3/id564225829" target="_blank">Happy Ending</a>》第三季</p></li></ul><p><img src="http://img0.tech2ipo.com/upload/img/article/2012/12/1355464089577.jpg" style="float:none;width:642px;height:307px;" title="播客类" border="0" hspace="0" vspace="0" width="642" height="307" /></p><p><strong><span style="font-size:18px;">播客类：</span></strong></p><ul style="list-style-type:square;"><li><p>最佳新语音播客——<a href="https://itunes.apple.com/us/podcast/npr-ted-radio-hour-podcast/id523121474?mt=2" target="_blank">NPR:Ted Radio Hour Podcast</a></p></li><li><p>最佳语音播客——<a href="https://itunes.apple.com/us/podcast/the-adam-carolla-show/id306390087?mt=2" target="_blank">The Adam Carolla Show</a></p></li><li><p>最佳新视频播客 ——<a href="https://itunes.apple.com/us/podcast/minutephysics/id515562086?mt=2" target="_blank">MinutePhysics</a></p></li><li><p>最佳视频播客——<a href="https://itunes.apple.com/us/podcast/sesame-street-podcast/id264537349?mt=2" target="_blank">Sesame Street Podcast</a></p></li></ul><p>此外，《<a href="https://itunes.apple.com/us/app/angry-birds-space/id499511971?mt=8" target="_blank">愤怒的小鸟：太空冒险</a>》仍然是本年度最畅销iPhone付费应用，通信类应用<a href="https://itunes.apple.com/us/app/whatsapp-messenger/id310633997?mt=8" target="_blank">WhatsApp</a>居于第二位，《<a href="https://itunes.apple.com/us/app/draw-something/id488627858?mt=8" target="_blank">Draw Something</a>》、<a href="https://itunes.apple.com/us/app/camera+/id329670577?mt=8" target="_blank">Camera+</a>、《<a href="https://itunes.apple.com/us/app/wheres-my-water/id449735650?mt=8" target="_blank">顽皮的小鳄鱼洗澡</a>》、《<a href="https://itunes.apple.com/us/app/angry-birds-star-wars/id557137623?mt=8" target="_blank">愤怒的小鸟：星球大战</a>》、《<a href="https://itunes.apple.com/us/app/fruit-ninja/id362949845?mt=8" target="_blank">水果忍者</a>》、《<a href="https://itunes.apple.com/us/app/angry-birds/id343200656?mt=8" target="_blank">愤怒的小鸟</a>》、《<a href="https://itunes.apple.com/us/app/bejeweled/id479536744?mt=8" target="_blank">宝石迷阵</a>》和《<a href="https://itunes.apple.com/us/app/tetris/id479943969?mt=8" target="_blank">俄罗斯方块</a>》均分列iPhone畅销应用和游戏榜前10位，且数款由Rovio出品的《愤怒的小鸟》游戏等也进入了付费iPad应用和游戏榜单的前10位。另外，免费应用与游戏下载量前10位分别为：YouTube、<a href="https://itunes.apple.com/us/app/instagram/id389801252?mt=8" target="_blank">Instagram</a>、《Draw Something》免费版、手电筒、Facebook、Pandora Radio、《<a href="https://itunes.apple.com/us/app/temple-run/id420009108?mt=8" target="_blank">神庙逃跑</a>》、<a href="https://itunes.apple.com/us/app/pinterest/id429047995?mt=8" target="_blank">Pinterest</a>、Twitter和<a href="https://itunes.apple.com/us/app/skype/id304878510?mt=8" target="_blank">Skype</a>。</p><img width="1" height="1" src="http://tech2ipo.feedsportal.com/c/34822/f/641707/s/2696c9fb/mf.gif" border="0"/><br/><br/><a href="http://da.feedsportal.com/r/151883387163/u/88/f/641707/c/34822/s/2696c9fb/a2.htm"><img src="http://da.feedsportal.com/r/151883387163/u/88/f/641707/c/34822/s/2696c9fb/a2.img" border="0"/></a><img width="1" height="1" src="http://pi.feedsportal.com/r/151883387163/u/88/f/641707/c/34822/s/2696c9fb/a2t.img" border="0"/>',
        link: "http://tech2ipo.com/56924",
        source: "Tech2IPO",
        author: "SugarCHH",
        pubDate: "2012-12-14 14:53:59",
        picture: "1.jpg"
    },
    {
        name: "史上最抠门初创风投：只投37美元鼓励创业",
        description: "最近几年的发展趋势证明，创业所花费的成本越来越低，与2008年相比，创业要花到的钱越来越少。许多工作中需要用到的科技产品都可以找到免费版或者开源版，只要员工免费，基本上创业就没有成本了。",
        content: '<p><em><img src="http://img0.tech2ipo.com/upload/img/article/2012/12/1355549900083.jpg" style="float:none;" title="抠门风投" border="0" hspace="0" vspace="0" /></em></p><p><em>我希望这笔钱能鼓励那些不能改变市场的新观点。---Cegłowski</em></p><p>据国外媒体<a href="http://www.wired.com/business/2012/12/worlds-cheapest-venture-capitalist/?utm_source=feedburner&amp;utm_medium=feed&amp;utm_campaign=Feed%3A+wired%2Findex+%28Wired%3A+Top+Stories%29" target="_blank">报道</a>，近日，一家名为The Pinboard Investment Co-Prosperity Cloud（插接板共同繁荣云投资基金）的风险投资公司宣布成立，将为所有选定的创业企业提供37美元的风险投资。没错！你没有看错，不是37万的孵化器基金也不是3700万巨额融资，是37张一美元的现钞。</p><p>这家投资基金的创始人Maciej Cegłowski表示：“最近几年的发展趋势证明，创业所花费的成本越来越低，与2008年相比，创业要花到的钱越来越少。许多工作中需要用到的科技产品都可以找到免费版或者开源版，只要员工免费，基本上创业就没有成本了。”</p><!--more--><p>共同繁荣云投资基金的简历不仅仅表明创业软件成本下降，更说明了投资者在整个创业环境中角色的变化。投资者资金的重要性相比应用程序安装率、分发水平、网站、软件以及硬件的重要性已经开始下滑。越是无形的投资，对于当下的创业企业来说越重要。</p><p>共同繁荣云投资基金投资的企业收获的不仅仅是37美元，更多的是来自Cegłowski的信心。现在Cegłowski只投资6家公司，然后“尽最大可能帮助宣传他们”。Cegłowski将会在其书签网站Pinboard.in和其个人博客中大力宣传者6家公司，甚至会邀请这些公司的创始人来阿根廷参观。这也验证了Cegłowski的想法：投资者的资本的重要性已经不如社会资本，在整个社会上，获得认可、关注、荣誉远比获得投资更重要，更能推动成功创业。据估计，本轮投资共计耗资200美元。</p><p>Cegłowski说：“我只想看到以我的能力能否帮助这些人宣传、解释他们的理念，帮助他们吸引到第一批消费者。因为一旦有第一批人开始用你的产品，你就有可能获得成功，这是创业成功的第一步。”</p><p>YCombinator以5位数的投资鼓励了Dropbox、Airbnb等公司，安德森·霍洛维茨基金用千万美元投资促成了Facebook、Twitter、Skype。Cegłowski将共同繁荣云投资基金的目标称之为“微成功模式”，不需要多大的成功，能让一个应用程序养活自己就足够了。</p><img width="1" height="1" src="http://tech2ipo.feedsportal.com/c/34822/f/641707/s/269f58e8/mf.gif" border="0"/><br/><br/><a href="http://da.feedsportal.com/r/151883601077/u/88/f/641707/c/34822/s/269f58e8/a2.htm"><img src="http://da.feedsportal.com/r/151883601077/u/88/f/641707/c/34822/s/269f58e8/a2.img" border="0"/></a><img width="1" height="1" src="http://pi.feedsportal.com/r/151883601077/u/88/f/641707/c/34822/s/269f58e8/a2t.img" border="0"/>',
        link: "http://tech2ipo.com/56924",
        source: "Tech2IPO",
        author: "张珑馨",
        pubDate: "Sat, 15 Dec 2012 08:05:15 GMT",
        picture: "2.jpg"
    },
    {
        name: "腾讯内部调整频繁：一切为微信商业化进程提速",
        description: "微信的商业化和腾讯电商控股在该公司内部正被视为未来股价上涨的驱动力，微信这两年更是成为腾讯的希望所在，腾讯内部的各个方面资源都在向微信倾斜。",
        content: '<p><img src="http://img0.tech2ipo.com/upload/img/article/2012/08/1345789362507.jpg" width="642" height="349" style="float:none;" border="0" hspace="0" vspace="0" /></p><p>一次意味深长的内部架构调整已经在腾讯电商控股公司基本完成。其中最为重要的变化是将原“生活电商事业部”更名为“移动生活电商部”，<strong>负责以会员优惠和便利生活为核心，连接商家打造一站式的移动生活服务平台。</strong>看起来这几乎就是为微信商业化量身定做。腾讯移动生活电商部的几位高管深圳工作的张颖、北京工作的戴志康和耿志军，已在腾讯广州研发院工作多日，他们正就生活电商与微信商业模式的开拓细节进行商讨。</p><p>一位腾讯内部人士充满信心地认为，如果微信的商业化和腾讯电商将来都能够做成，“腾讯的股价再翻一倍到500应该没问题”。截止到12月14日，腾讯股价为252港元。</p><p>微信已成腾讯最为看好的下一个收入增长驱动力。微信的商业化和腾讯电商控股在该公司内部正被视为未来股价上涨的驱动力，微信这两年更是成为腾讯的希望所在，为了让这个被称为“第一个拿到移动互联网船票”的产品迅速商业化，腾讯内部的各个方面资源都在向微信倾斜。</p><!--more--><p><strong>资源倾斜</strong></p><p>一位知情者透露，最近坊间盛传的“马化腾宴请张小龙，并在席间讲述做人道理”的故事并不真实。该人士认为，事实上小马哥和小龙哥的关系其实很好，他们两个都是技术产品派，而非运营派，<strong>因此外界猜测的“微信姓马还是姓张”的问题是搞错了对象。</strong></p><p>微信“掌门”张小龙给人印象最深的是其“技术派”和“文艺范”，微信现在在腾讯集团内部很“牛”、很强势。微信的设计思路是形成一个闭环，例如微信用户在“朋友圈”中分享的图片和言论并不能同时发到腾讯“朋友网”上。有传言，腾讯的朋友网也一直在向微信要数据，但微信也不给。</p><p>当然，<strong>微信要把这个产品做成一个私密的封闭圈子并没有什么错，因为这样才能区别于“一点对多点的微博”以及“点对点的QQ”，腾讯旗下产品才能形成差异不同质化的竞争。</strong>但也许是因为微信天生就获得了腾讯的“龙脉”QQ好友关系链，而且手机QQ每天帮微信向安卓用户推500万个tips（编者注：可以理解为“提示”）才能如此迅速崛起，<strong>因此腾讯内部都视微信为公有财产。</strong></p><p>做实物电商的团队主要在深圳，而移动电商中的微生活项目则是北京戴志康及重点做微信O2O的耿志军负责，统一由腾讯电商控股公司CEO吴宵光负责。当微信的商业化进入到更深层次时，出现了电商控股公司历史上的又一次架构调整。</p><p>据悉，这次架构调整中，<strong>撤消了电商研发部</strong>，取而代之的是一个虚拟组织“技术架构委员会”，负责实物电商和虚拟电商业务相关的技术专案审核，其目的是为腾讯电商控股公司的长期业务战略目标提供技术保障。</p><p>此外，还<strong>成立了电商质量管理部</strong>，负责电商所有产品、服务与工具的测试、质量保证及质量分析等工作，通过建立测试及研发流程、测试工具与自动化回归等手段，腾讯电商部门希望提升研发测试效率及质量。同时，还要通过建立电商产品及服务的质量评估体系与分析体系来促进整体电商产品和服务质量。</p><p>伴随此次架构调整的是人事的调整。移动生活电商部的副总经理由原电商研发部副总经理张颖担任，全面负责部门管理工作，同时兼任技术架构委员会主任，向腾讯电商控股公司首席执行官吴宵光汇报；原电商研发部助理总经理吴凯华兼任电商质量管理部助理总经理，向技术架构委员会张颖汇报。移动生活电商部副总经理则由戴志康担任，也向张颖汇报。</p><p>戴志康，一手创立了社区论坛工具Discuz的人，也是2010年8月最终决策成为腾讯全资子公司的人，当时他的竞争对手被阿里收入囊中。在进入腾讯之后，他的团队一直在北京，且办公地点位于上地而非中关村，独立于腾讯网及其他系统之外。</p><p>事实上，Discuz在被腾讯收购之后，戴志康和耿志军就开始做生活类电商，最开始是QQ美食，当时还属于 Qzone 的一个业务。</p><p>耿志军，微信会员卡业务负责人，称 O2O 是一个苦活，不是一个 idea 就能成功的，而是要“扫街”挨家挨户地攻城略地，且一条街上每年会有 20% 的门店商家自然淘汰消失。“<strong>如果说实物电商的难点是&quot;最后一公里&quot;，那么服务类电商的难点就是&quot;最后十米</strong>&quot;，需要扫街的工作人员进入到商家，去说服，去教育。”耿志军称。</p><p>后来，耿志军就开始做“life.qq.com”，最开始也是主攻 PC 端，但随着移动互联网的飞速发展，戴志康和耿志军逐步将更多精力放到移动端。微信迅速崛起后，2011年年底，耿志军开始与微信的张小龙接触，商谈怎样合作 O2O 的业务。</p><p><strong>野心勃勃</strong></p><p>腾讯电商控股公司 CEO 吴宵光称，在线零售交易市场已经很成熟了，现在线下的生意越来越多往线上转。而 O2O 则还是非常创新的模式，整个全球也没有看到特别成功的模式，因为这得益于移动互联网爆发性的增长，中国跟美国也是同步的。目前腾讯也在摸索 O2O 商业模式，而且摸索的过程中大的思路不外乎是用信息化解决传统商业模式提高效率，但是具体做的时候就发现这个时间肯定还是非常长，因为它的链条注定了不是由互联网平台提供的，例如跟线下联动就是一个很大的问题。</p><p>在吴宵光看来，微信部门的核心任务是把基础平台和体验做好，其他业务会根据这个平台不断的延伸服务。</p><p>腾讯电商公司副总经理宋旸则透露，在微信的实物商业化方面，尚在探索阶段，还没有形成明确的思路，目前推进最快的主要还是移动虚拟电商微生活。</p><p><strong>据悉，微信的思路是通过 SNS 方式传播二维码来进行推广，靠朋友关系推广的“微信会员卡”更加精准且使用率较高。</strong></p><p><strong>微信会员卡给合作的商家生成独有的、只有微信才能“认识”的二维码，且商家要通过“第一批种子用户”来推广，种子用户的朋友看到种子用户的“会员卡”就可加成自己的会员。</strong></p><p>这种方法是植入式的，因此更为高效和精准，且用户到店率和重复消费率高，可以帮助商家在最短的时间里建立起一个庞大的会员体系。而微信则可以与商家进行消费分成。</p><p>到目前为止进驻微信的有上千个品牌、覆盖上万个店。而耿的想法是，从大品牌逐步渗透到小品牌如可通过微信摇一摇身边的杂货店，让小店送来一条烟等。</p><p>微信的“商业版图”还不仅于此，其未来是让微信代替所有的会员卡、打折卡和积分卡，再扩展则是代替门禁卡等其他身份识别类卡片。例如航空公司希望与微信绑定得更深入，未来用户可以通过微信来购买机票、得到登机牌，升舱，查询航班状态……微信可以做到把商家和用户直接连接起来，不需要其他中间环节。</p><p>从微信延伸到支付环节，如果微信对接了财付通，财付通可替代所有银行卡但事实上微信的“胃口”还不仅于此，目前微信还可能干的一件事，就是连第三方支付工具也被绕过。</p><p>现在微信可实现的功能是，将银行卡、信用卡与微信账号绑定，用户每次刷卡消费就收到一条微信，此外还可以通过微信查询信用卡账单，将来融入语音后还可用语音触发这些指令。但银行更希望实现的功能是，将银行卡与微信绑定生成一个二维码，用户每次出门就刷二维码，不用再带银行卡银行界称此为“码付”。</p><p><strong>微信还有另一个产品，名为“公众账号”。该产品更加偏向媒体属性，可管理所有会员，但每天只能发送一条信息，目前尚没有商业化的思路。</strong></p><p><strong>树大招风</strong></p><p><strong>但微信商业化路径中最蹩脚的一点恰恰是会员卡的不容易获得你可以把它的设计初衷理解为“更加精准”，也可以理解为“不容易得到的才会被珍惜”。</strong></p><p>按照微信的传播逻辑，如果一个用户周围的人里没有人加麦当劳的会员卡，你就必须亲自去一趟麦当劳，自己先成为“种子”。尽管这也符合微信的目标，因为到店的人是最精准的，但对于“想找却找不到”的用户来讲这无疑是一种让人很恼怒的事。</p><p>微信在使用上未做到简便，容易给用户造成很多不便，例如不能像QQ那样对朋友分组进行管理；例如在朋友圈中想发言，似乎必须发一张图片，很少有人知道按很长很长时间之后就能直接输入文字等。</p><p>事实上，随着微信越做越大，树大招风后引来的诟病也越来越多。</p><p>例如，微信的壮大也引起了运营商的忌惮。就连中国联通宽带在线总经理何华杰也表示，如果按照用户数来说，腾讯实际上已经是中国的第二大运营商。腾讯的微信等业务，确实给运营商的传统电信业务带来了冲击，运营商面临变成数据管道化的挑战。</p><p>腾讯内部的这场新“造山”运动，微信地位被不断抬高，而与微信同样生存在手机上的手机QQ却沉默寡言。据悉，手机QQ被要求每天给微信推送500万个 tips ，一位知情者感叹，“这是在<strong>杀手机QQ养活微信</strong>”。</p><p>为什么腾讯内部这样厚此薄彼？</p><p>一个可能的原因是，微信是腾讯最成功的“马甲”，让人们忘却了QQ的低龄化和幼稚形象，让那些此前嫌弃QQ太低龄化的用户轻而易举地越过了心理障碍，这样一来，微信的用户数未来将可能比QQ的用户群更广。</p><p>腾讯在北京世贸天阶的会所“腾讯汇”中有位帅小伙保安，同时是手机QQ和微信的用户，但他并不知道自己所服务的这家公司就是这两个产品的共同缔造者。而与这位保安同在使用微信的也有爱奇艺CEO龚宇，现在他越来越少地登录微博，而把更多的时间消耗在了微信上。</p><p>来源：<a href="http://www.eeo.com.cn/2012/1215/237555.shtml" target="_blank">经济观察网</a> 记者：杨阳</p><img width="1" height="1" src="http://tech2ipo.feedsportal.com/c/34822/f/641707/s/269eccae/mf.gif" border="0"/><br/><br/><a href="http://da.feedsportal.com/r/151883402697/u/88/f/641707/c/34822/s/269eccae/a2.htm"><img src="http://da.feedsportal.com/r/151883402697/u/88/f/641707/c/34822/s/269eccae/a2.img" border="0"/></a><img width="1" height="1" src="http://pi.feedsportal.com/r/151883402697/u/88/f/641707/c/34822/s/269eccae/a2t.img" border="0"/>',
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "3.jpg"
    },
    {
        name: "IM app 全球市场与腾讯的海外布局",
        description: "腾讯除了在大陆市场精耕细作发展微信以外，在 2012 年，也对海外市场进行了布局，一方面通过资本层面的操作，入股了韩国 Kakao 获得 13.54% 的股份，投资额为 6300 万美金。另一方面也针对印度尼西亚市场也特别新发布了一个 App，名字叫 Qute，根据国外媒体的报道，在今年 7 月份，Qute 的用户数超过 100 万。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "4.jpg"
    },
    {
        name: "苹果为何害怕三星？",
        description: "三星的市值今天突破 2000 亿美元大关。Galaxy S3、Galaxy Note 2 等手机也持续热卖，“销量破千万”的新闻不绝于耳。作为一家手机、平板制造商，三星对苹果已经构成威胁。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "5.jpg"
    },
    {
        name: "移动开发者的饕餮大餐或将到来",
        description: "乔布斯 07 年振臂一挥：我们重定义了手机。移动互联网由此拉开帷幕，各路豪杰杀出江湖，整个移动互联网生态系统发生了翻天覆地的变化，一晃五年过去了，移动开发者，是否又走到了一个新的十字路口？",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "6.jpg"
    },
    {
        name: "一个果粉的 iPad mini 主观感受",
        description: "是的，非 retina 已成为谈论 mini 时必须的陈词滥调。而我们何妨看看他带来的好处？即使今天的科技先进到可以用 3D 打印机制造枪支，高的分辨率下的电力消耗，也仍然是问题。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "7.jpg"
    },
    {
        name: "LinkedIn 通过 InCubator 鼓励员工创新",
        description: "科技公司常常会想出各种办法鼓励员工创新。对此，你可能会立刻想起 Google 的 20% 自由时间，或者 Facebook 的黑客马拉松。在 LinkedIn 看来，上述公司的办法都有不足之处，于是，他们发明了一种新的形式：InCubator。Wired 网站就此问题采访了公司的几位高管。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "8.jpg"
    },
    {
        name: "Tim Cook 年终考核，CEO 不易做",
        description: "Tim Cook 上任 CEO 以来，苹果推出了 iPhone 5、iPad mini 、iPad 4 和 MacBook 等一系列产品。尽管没有扩展到新的领域（例如传言已久的苹果电视），但是外界依旧能感受到苹果的变化。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "9.jpg"
    },
    {
        name: "陌陌改名？为平台化铺路",
        description: "刚刚跟圈内的朋友聊完陌陌，就看到新浪科技的一篇报道，陌陌 COO 王力讲的一番话，谈陌陌的“去陌生人化”，甚至不惜改名字：",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "10.jpg"
    },
    {
        name: "苹果电视脚步渐近",
        description: "苹果电视机的传言由来已久，关于这款设备任何捕风捉影的消息都可能受到大众的品味。当人们经历了 iPod、iPhone、iPad 带来的一次次产业革命后，就会对苹果下一个可能的“颠覆性”产品充满想象，而这一次许多人不约而同地指向客厅。库克今天的一番评论，让一切更加贴近真实。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "11.jpg"
    },
    {
        name: "Instagram 禁用 Twitter 图片显示，嫌隙在所难免",
        description: "自 Instagram 被 Facebook 收购后，它与曾经的盟友 Twitter 之间的关系似乎就产生了裂痕，尽管当事人从来不承认这种嫌隙。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "12.jpg"
    },
    {
        name: "电子新闻应用 Zite 迈向“杂志风”",
        description: "手机上如何阅读新闻？Flipboard 汇聚社交平台上的信息流，然后以杂志的方式呈现。而令外一款新闻阅读器 Zite，则探索用户的阅读兴趣，打造“个性化电子杂志”。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "13.jpg"
    },
    {
        name: "可变形材料的重要一步：MIT 开发出机械蛋白质",
        description: "电脑界有句趣话：世界上有 10 种人，一种是懂二进制的，一种是不懂二进制的。作为人类最复杂的发明物之一，电脑的运作原理却是惊人的简单：任何信息都能用 0 和 1 来编码。如今， MIT 原子和字节中心将同样的想法用在了可变形材料的实现上。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "14.jpg"
    },
    {
        name: "Phorce：随时为 MacBook 充电的时尚包",
        description: "移动设备的普及让我们经常要担心设备是否足电的问题。尤其对于一些商旅人士，当外出乘飞机或者坐火车时，设备没电可能还会影响工作进度。一款号称“全球首款智能包”的 Phorce 可能为我们解决了后顾之忧。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "15.jpg"
    },
    {
        name: "WhatsApp 是 Facebook 的那杯茶吗？",
        description: "Facebook Messager 的 Android 版已经去掉了“账号审核”，这意味着用户直接打开应用便可与联系人发送信息，也意味着 Facebook Messager 变为更纯粹的移动通讯软件。WhatsApp 的竞争压力变大。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "16.jpg"
    },
    {
        name: "艺术配不上游戏？",
        description: "每次读到《核舟记》，脑海中自然浮现出泛舟江上的情景。魏学洢描写得好，而令其创作出传世之作的核舟也是令人称道的艺术品，可惜无缘一睹。王叔远用简单的工具就可以用一颗桃核还原场景，这得需要多高的技艺。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "17.jpg"
    },
    {
        name: "电子邮件的“用户体验”",
        description: "邮箱里经常堆满了来自世界各地的电子邮件。这倒不是因为我人脉有多广，大多数的发件人，用的都是以 no-reply 开头，或者是以某某公司结尾的邮箱。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "18.jpg"
    },
    {
        name: "安卓进化",
        description: "看看 Android 的历程，想想另外一个著名的漫画，从猿到人。:)",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "19.jpg"
    },
    {
        name: "人机交互的未来——与虚拟角色进行情感交流",
        description: "来自 TechnologyReview 的一篇题为《心理学家为虚拟角色发布情感需求的插件》的报道让我们可以畅想未来的人机交互又将给我们带来什么样的惊喜。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "20.jpg"
    },
    {
        name: "奥巴马竞选团队分享邮件筹款技巧",
        description: "今年美国大选中，奥巴马竞选团队从网上筹集了 6.9 亿美元捐款，其中大部分是通过筹款邮件获得的。彭博社的 Joshua Green 在与竞选团队主要管理人员的交流中，了解到不少有趣的相关信息。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "21.jpg"
    },
    {
        name: "IPTV 继续前进",
        description: "前一阵子小米盒子把产业搅得沸沸扬扬，OTT TV（互联网电视）阵营好一番热闹。与 OTT TV 阵营相对应的，是电信运营商的 IPTV。",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "22.jpg"
    },
    {
        name: "Walknomics：手机帮你多散步",
        description: "点评美食、点评电影、点评音乐，点评书籍。我们还能点评什么？",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        picture: "23.jpg"
    },
    {
        name: "Kickstarter：造梦还是毁梦？",
        link: "",
        source: "",
        author: "",
        pubDate: "December 14, 2012 8:00 PM",
        description: "苹果的附件必须配得上苹果的质量和设计。如果给 iPad 配一个高质量的键盘？这个键盘跟 iPad 的结合浑然一体，两者搭配看起来像 MacBook Air。为了打造这样一个键盘，Brydge 在 Kickstarter 发起了筹款：",
        picture: "24.jpg"
    }];

    PM.db.collection('posts', function(err, collection) {
        collection.insert(posts, {safe:true}, function(err, result) {});
    });

};