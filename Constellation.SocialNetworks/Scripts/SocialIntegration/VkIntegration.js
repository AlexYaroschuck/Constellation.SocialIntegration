VK.init({
    apiId: 5352309
});
function authInfo(response) {
    if (response.session) {
        for (var el in response.session)
            console.log(el["user.id"]);
    } else {
        alert('not auth');
    }
}


$("#VkGetNews").click(function () {
    var count = 20;
    VK.Api.call('newsfeed.get', { count: count, filters: "post" }, function (r) {
        if (r.response) {

          var items = r.response.items;

          var j = 0;
          var posts = {};
           
          while (j < items.length) {
               posts = {};
               var item = items[j];
               for (var key in item) {
                   if (item.hasOwnProperty(key)) {
                       posts[key] = item[key];
                   }
               }
          
               j = j + 1;
               VkNews.push(posts);
          }

          var groups = r.response.groups;

            var k = 0;
            var gr = {};
            while (k < groups.length) {
                gr = {};
                var group = groups[k];
                for (var key in group) {
                    if (group.hasOwnProperty(key)) {
                        gr[key] = group[key];
                    }
                }

                k+=1;
                VkGroups.push(gr);
            }

            
            console.log(VkGroups[0]);
            console.log(VkNews[0]);
            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    if (VkGroups[j]["gid"] === VkNews[i]["source_id"] * -1) {
                        VkFeedList.push(new VkPost().init(VkNews[i], VkGroups[j]));
                    }
                    else {
                        //for user's news
                    }
                }
                
            }
            // VkPost = new VkPost();
           // VkPost.init(VkGroups[0], VkNews[0]);
        }
    });
});
VK.UI.button('login_button');

var VkNews = [];
var VkGroups = [];
var VkFeedList = [];

var VkPost = function () {

    this.newsfeed = {};
    this.newsgroups = {};
    var self = this;

    this.init = function (newsFeed, newsGroups) {

        this.newsfeed = newsFeed;
        this.newsgroups = newsGroups;

        self.setNewsFeed();
    }

    this.setGroup = function () {

        self.vk_group_wrapper = $('<div>', { class: "vk_group_wrapper" }).appendTo(self.wrapper);
        self.vk_group_name = $('<img>', { class: "vk_group_icon ", src: self.newsgroups["photo"] }).appendTo(self.vk_group_wrapper);
        self.vk_group_icon = $('<div>', { class: "vk_group_text ", text: self.newsgroups["name"] }).appendTo(self.vk_group_wrapper);
    };

    this.setNews = function() {

        if (self.newsgroups["gid"] === self.newsfeed["source_id"] * -1) {

            self.vk_news_wrapper = $('<div>', { class: "vk_news_wrapper" }).appendTo(self.wrapper);

            if (self.newsfeed["text"]) {
                self.vk_news_text = $('<div>', { class: "vk_news_text" }).appendTo(self.vk_news_wrapper);
                $("<p style='height:100%' >" + self.newsfeed["text"] + "</p >").appendTo(self.vk_news_text);
            }
            if (self.newsfeed["attachments"] && self.newsfeed["attachments"][0]["type"] === "photo") {
                self.vk_news_photo = $('<div>', { class: "vk_news_photo_wrapper" }).appendTo(self.vk_news_wrapper);
                self.setPhotos();
            }
            //console.log(self.newsfeed["attachments"][0]["photo"]["src"])
        }

    };

    this.setNewsFeed = function () {

        self.wrapper = $('<div>', { class: "vk_wrapper" }).appendTo("#vk_feed_container");

        self.setGroup();
        self.setNews();
    };

    this.setPhotos = function() {
        
        var item = self.newsfeed["attachments"];
        var count = 0;

        for (var i=0; i<item.length;i++) {
            if (self.newsfeed["attachments"][i]["type"]==="photo")
                count++;
        }

        var textH = 0;

        if (self.vk_news_text)
            textH = self.vk_news_text.height();

        if (count == 1) {
            self.vk_photo_one = $('<img>',
                { class: "vk_photo_one",
                src: self.newsfeed["attachments"][0]["photo"]["src_big"], 
                width: self.wrapper.width(),
                height: self.vk_news_wrapper.height() - textH
                }).appendTo(self.vk_news_photo);
        }
        else
            if (count > 1){
                for (var i = 0; i < item.length; i++) {
                    if (self.newsfeed["attachments"][i]["type"] === "photo") {

                    }
                }
            }
    }

}

