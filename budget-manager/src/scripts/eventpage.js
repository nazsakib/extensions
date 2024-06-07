var contextMenuItem = {
    id: "spendMoney",
    title: "Spend Money",
    contexts: ["selection"],
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
    );
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(["total", "limit"], function (budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({ total: newTotal }, function () {
                    if (newTotal >= budget.limit) {
                        //limit exceeded notification function
                        var notificationOptions = {
                            type: "basic",
                            iconUrl: "../../icons8-limit-48.png",
                            title: "Limit Reached",
                            message:
                                "You've reached your budget limit for this month!",
                        };
                        chrome.notifications.create(
                            "notificationsLimit",
                            notificationOptions
                        );
                    }
                });
            });
        }
    }
});

// badge showing function

chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.action.setBadgeText({
        text: changes.total.newValue.toString(),
    });
});
