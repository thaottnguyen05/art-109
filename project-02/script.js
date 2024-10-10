const originalAd = document.getElementById('originalAd');
const distortedAd = document.getElementById('distortedAd');

originalAd.addEventListener('mouseenter', () => {
  originalAd.style.display = 'none';
  distortedAd.style.display = 'block';
});

distortedAd.addEventListener('mouseleave', () => {
  distortedAd.style.display = 'none';
  originalAd.style.display = 'block';
});
