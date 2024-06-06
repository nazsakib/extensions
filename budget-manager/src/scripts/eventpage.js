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
    
});
