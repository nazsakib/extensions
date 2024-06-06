$(function () {
    chrome.storage.sync.get("limit", function (budget) {
        $("#limit").val(budget.limit);
    });

    $("#saveLimit").click(function () {
        var limit = $("#limit").val();
        if (limit) {
            chrome.storage.sync.set({ limit: limit }, function () {
                close();
            });
        }
    });

    $("#resetTotal").click(function () {
        chrome.storage.sync.set({ total: 0 }, function () {
            var notificationOptions = {
                type: "basic",
                iconUrl: "../../icons8-limit-48.png",
                title: "Total Reset",
                message: "Total amount resetted to 0",
            };
            chrome.notifications.create(
                "notificationsLimit",
                notificationOptions
            );
        });
    });
});
