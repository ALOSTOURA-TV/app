const items = document.querySelectorAll('figure');
const itemsToShow = 16; // Number of items to reveal on each scroll
let lastShownIndex = 0;

function revealItems() {
  for (let i = lastShownIndex; i < lastShownIndex + itemsToShow; i++) {
    if (i < items.length) {
      items[i].style.display = 'block';
    }
  }
  lastShownIndex += itemsToShow;
}

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.body.clientHeight;

  if (scrollPosition >= documentHeight - 300) {
    revealItems();
  }
});

// Initially reveal the first set of items
revealItems();
    </script>
<script>function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function loadImages() {
    const imagesToLoad = document.querySelectorAll('.defer-image');

    imagesToLoad.forEach((image) => {
        if (isInViewport(image)) {
            const imgUrl = image.getAttribute('data-src');
            if (imgUrl) {
                const img = new Image();
                img.src = imgUrl;
                img.onload = () => {
                    image.setAttribute('src', imgUrl);
                    image.classList.remove('defer-image');
                };
            }
        }
    });
}

window.addEventListener('scroll', loadImages);
window.addEventListener('resize', loadImages);

loadImages();
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
  function loadStylesheets() {
    function loadStylesheet(href) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.type = 'text/css';
      link.media = 'all';
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    // Load Font Awesome stylesheet
    loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

    // Load Google Fonts stylesheet
    loadStylesheet('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&display=swap');
  }

  if (window.addEventListener) {
    window.addEventListener('load', loadStylesheets, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', loadStylesheets);
  } else {
    window.onload = loadStylesheets;
  }
</script>
<script>
        const goToTopButton = document.getElementById('go-to-top-button');

        // Show or hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) { // Adjust the value to control when the button appears
                goToTopButton.style.display = 'block';
            } else {
                goToTopButton.style.display = 'none';
            }
        });

        goToTopButton.addEventListener('click', function() {
            // Scroll to the top of the page smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
