export function openPage(pageName, elmnt) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('weatherChart');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName('wd3layer');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = 'block';

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = 'rgba(0, 0, 0, 0.034)';
}
