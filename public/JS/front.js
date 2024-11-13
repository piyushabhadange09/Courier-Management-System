document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth + 20 * 2 + 1 * 2; // Adjust for padding and border
    const itemsToShow = 3; // Number of items to show at a time
    const scrollInterval = 4000; // Time interval in milliseconds (1 second)
  
    let currentIndex = 0;
    const totalItems = items.length;
  
    function scrollFeatures() {
      currentIndex++;
      if (currentIndex > totalItems - itemsToShow) {
        currentIndex = 0;
      }
      container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  
    setInterval(scrollFeatures, scrollInterval);
  });