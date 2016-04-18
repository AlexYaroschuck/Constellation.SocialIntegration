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
// VK.Auth.getLoginStatus(authInfo);

$("#VkGetNews").click(function () {
    VK.Api.call('newsfeed.get', { count: 100 }, function (r) {
        if (r.response) {
            for (var el in r.response) {
                console.log(el);
            }
        }
    });
});
VK.UI.button('login_button');