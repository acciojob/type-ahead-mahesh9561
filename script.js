//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
    const typeahead = document.getElementById("typeahead");
    const suggestionsList = document.getElementById("suggestions-list");
    let debounceTimer;

    // Function to fetch glossary terms from the API
    const fetchSuggestions = async (query) => {
        try {
            const response = await fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${query}`);
            const data = await response.json();

            // Update the suggestions list
            updateSuggestions(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    // Function to update the suggestions list in the DOM
    const updateSuggestions = (terms) => {
        // Clear the previous suggestions
        suggestionsList.innerHTML = "";

        // If there are no suggestions, exit early
        if (terms.length === 0) return;

        // Append new suggestions to the list
        terms.forEach(term => {
            const li = document.createElement("li");
            li.textContent = term;
            li.addEventListener("click", function () {
                typeahead.value = term;
                suggestionsList.innerHTML = ""; // Clear suggestions after selection
            });
            suggestionsList.appendChild(li);
        });
    };

    // Event listener for keyup event on the typeahead input
    typeahead.addEventListener("keyup", function (event) {
        const query = typeahead.value.trim();

        // Clear suggestions when input is empty
        if (query === "") {
            suggestionsList.innerHTML = "";
            return;
        }

        // Clear any previous debounce timer
        clearTimeout(debounceTimer);

        // Set a new debounce timer
        debounceTimer = setTimeout(() => {
            fetchSuggestions(query);
        }, 500); // Wait for 500ms after user stops typing
    });
});
