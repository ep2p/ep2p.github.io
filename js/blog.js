item = "<div class=\"col-lg-4 col-md-6 col-xs-12 blog-item\">" +
    "<div class=\"blog-item-wrapper\">\n" +
    "    <div class=\"blog-item-img\">\n" +
    "        <a href=\"${post.url}\">\n" +
    "            <img src=\"${post.cover}\" alt=\"\">\n" +
    "        </a>\n" +
    "        <div class=\"author-img\">\n" +
    "            <img src=\"${post.user.picture}\" style=\"width: 60px; height: 60px;\" alt=\"\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"blog-item-text\">\n" +
    "        <h3><a href=\"${post.url}\">${post.title}</a></h3>\n" +
    "        <div class=\"author\">\n" +
    "            <span class=\"name\">Posted by ${post.user.name}</span>\n" +
    "            <span class=\"date float-right\">${post.date}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div></div>"

token = "98e4efc3fc6991916acf98bc2243fc95"
mainUrl = "https://blog.ep2p.io/api"

$(document).ready(function () {
    $.get(mainUrl + "/pages?token=" + token, function(responseData, status){
        $("#blog-loader").hide()
        responseData.data.forEach(function (post){
            postItem = item
                .replaceAll("${post.url}", post.permalink)
                .replaceAll("${post.cover}", post.coverImage)
                .replaceAll("${post.title}", post.title)
                .replaceAll("${post.date}", post.date)
            $.get(mainUrl + "/users/" + post.username + "?token=" + token, function (responseData, status) {
                postItem = postItem
                    .replaceAll("${post.user.name}", responseData.data.nickname)
                    .replaceAll("${post.user.picture}", responseData.data.profilePicture)
                $("#blog-items").append(postItem)
            })

        })
    });
})