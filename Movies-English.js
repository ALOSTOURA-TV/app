document.addEventListener('DOMContentLoaded', () => {
  let movieData; // Declare movieData here

  // Function to load movie data from "home.html"
  function loadMovieData() {
    fetch('home.html')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((html) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        // Include figures with and without the data-requested attribute
        const movieFigures = tempElement.querySelectorAll('figure');
        movieData = Array.from(movieFigures).map((figure) => {
          const title = figure.querySelector("figcaption").textContent;
          const imageSrc = figure.querySelector("img.defer-image").getAttribute("data-src");
          return { title, imageSrc };
        });

        // Debugging: Log the loaded movie data
        console.log("Movie Data Loaded:", movieData);

        // Perform initial search
        performSearch(movieData);
      })
      .catch((error) => {
        console.error('Error loading movie data:', error);
      });
  }

  // Function to perform movie search
  function performSearch(movieData) {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchTerm = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";

    if (searchTerm.trim() === "") {
      searchResults.style.display = "none";
    } else {
      const filteredMovies = movieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
      if (filteredMovies.length === 0) {
        searchResults.innerHTML = "<p>No results found.</p>";
      } else {
        displayItemList(filteredMovies, searchResults);
      }
      searchResults.style.display = "block";
    }
  }

  // Function to display filtered movie data with tooltips
  function displayItemList(items, container) {
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const trimmedTitle = item.title.trim(); // Trim leading and trailing whitespaces
      link.textContent = trimmedTitle;
      // Use the trimmed title to construct the image URL and link
      link.href = `../movies/${encodeURIComponent(trimmedTitle)}.html`;

      // Add a click event listener to redirect to redirect.html
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent the default link behavior
        redirectToRedirectPage(trimmedTitle);
      });

      li.dataset.tooltip = item.imageSrc; // Use the imageSrc property for the tooltip
      li.appendChild(link);
      ul.appendChild(li);
    });
    container.appendChild(ul);
    addTooltipListeners(); // Add tooltip listeners after updating the list
  }

  // Function to add tooltip listeners
  function addTooltipListeners() {
    const listItems = document.querySelectorAll("li[data-tooltip]");
    listItems.forEach((li) => {
      const link = li.querySelector("a");
      const tooltipUrl = li.dataset.tooltip;
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = "Loading...";
      li.addEventListener("mouseenter", () => {
        tooltip.textContent = "Loading...";
        tooltip.style.display = "block";
        const tooltipImage = document.createElement("img");
        tooltipImage.src = tooltipUrl;
        tooltipImage.onload = () => {
          tooltip.textContent = "";
          tooltip.appendChild(tooltipImage);

          // Set the maximum width and height of the image here
          tooltipImage.style.maxWidth = "20%";
          tooltipImage.style.maxHeight = "20%";
        };
      });
      li.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });
      li.appendChild(tooltip);
    });
  }

  function redirectToRedirectPage(movieTitle) {
    // Set the destination URL and redirect to redirect.html
    const destinationUrl = `redirect.html?url=../movies/${encodeURIComponent(movieTitle)}.html`;
    window.location.href = destinationUrl;
  }

  // Load movie data when the page loads
  loadMovieData();

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => performSearch(movieData));
  const searchResults = document.getElementById("searchResults");
  searchResults.style.display = "none";
});
