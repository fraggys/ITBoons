$(document).ready(function () {
    localStorage.msgCount = 0;
    getData();

    window.setInterval(function () {
        getData();
    }, 50000);

    $("#notificationLink").click(function () {
        $("#feedArea").fadeToggle(300);
        $("#msgCount").fadeOut("slow");
        return false;
    });
//Document Click hiding the popup
    $(document).click(function () {
        $("#feedArea").hide();
    });

    function getData() {
        console.log("asdasd");
        var htmlStr = "";
        $.get('feed.xml', function (data) {
            $(data).find("item").each(function () {
                var el = $(this);
                htmlStr = htmlStr + "<a class='list-group-item' href='" + el.find("link").text() + "'\>"
                + "\<h4 class='list-group-item-heading'>" + el.find("title").text() + "\</h4></a>";

                if (Number(localStorage.msgCount)>=0) {
                    localStorage.msgCount = Number(localStorage.msgCount) + 1;
                } else {
                    localStorage.msgCount = 1;
                }
            });
            $('#feedList').append(htmlStr);
            updateMsgCount();
        });
    }

    function updateMsgCount() {
        $('#msgCount').text(localStorage.msgCount);
    }
});