function revealPost(postElement) {
    const scrambledText = postElement.querySelector('.scrambled-text');
    const originalText = getOriginalText(scrambledText.innerText);
    
    scrambledText.innerText = originalText;
    postElement.querySelector('.post-image').src = getOriginalImage(postElement.querySelector('.post-image').src);
}

function getOriginalText(scrambled) {
    const textMap = {
        "Thsi is a smaple psto.": "This is a sample post.",
        "Evrthig is faek.": "Everything is fake.",
        "Lfe is gnare.": "Life is grand.",
        // Add more mappings as needed
    };
    return textMap[scrambled] || scrambled;
}

function getOriginalImage(currentSrc) {
    return currentSrc.replace("distorted-", ""); // Assume original images don't have the "distorted-" prefix
}
