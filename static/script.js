const closebutton = document.getElementById("close");
const search = document.getElementById("search");
const searchbar = document.getElementById("searchbar");
const overlay = document.getElementById("overlay");
const autocompleteResults = document.querySelectorAll(".result");
const autocompleteContainer = document.getElementById("autocomplete");
let enabled = false;

$(document).ready(function() { $('[data-bs-toggle="tooltip"]').tooltip({animation: false}); $("#close").tooltip("disable") });

search.addEventListener("input", async function () {
    if (search.value) {
        response = await fetch(`/search?q=${search.value}`); 
        results = JSON.parse(await response.text())["gossip"]["results"];
        for (let i in results) {
            autocompleteResults[i].innerText = results[i]["key"];
        }

        if (!enabled) {
            enabled = true;
            $("#close").tooltip("enable");
            overlay.style.display = "block";
            closebutton.classList.remove("hidden");
            searchbar.style.borderRadius = "16px 16px 0 0";
            closebutton.addEventListener("click", clear);
            autocompleteContainer.classList.remove("d-none");
        }
    } else {
        enabled = false;
        $("#close").tooltip("disable");
        overlay.style.display = "none";
        closebutton.classList.add("hidden");
        searchbar.style.borderRadius = "100vw";
        closebutton.removeEventListener("click", clear);
        autocompleteContainer.classList.add("d-none");
    }
})

search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        yahooSearch()
    }
});

function clear() {
    enabled = false;
    search.value = "";
    $("#close").tooltip("disable");
    overlay.style.display = "none";
    closebutton.classList.add("hidden");
    searchbar.style.borderRadius = "100vw";
    closebutton.removeEventListener("click", clear);
    autocompleteContainer.classList.add("d-none");
}

function yahooSearch() {
    if (search.value) {
        window.location.href = `https://search.yahoo.com/search?p=${encodeURI(search.value)}`
    }
}

function autoSearch(event) {
    window.location.href = `https://search.yahoo.com/search?p=${encodeURI(event.target.innerText)}`
}
