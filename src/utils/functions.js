
function generateRandomDuration(category) {
    let minSeconds, maxSeconds;
  
    switch (category) {
      case "video song":
      case "trailer":
        minSeconds = 120; // 2 minutes
        maxSeconds = 300; // 5 minutes
        break;
      case "tv show":
      case "short film":
        minSeconds = 1800; // 30 minutes
        maxSeconds = 2700; // 45 minutes
        break;
      case "movie":
      case "documentary":
        minSeconds = 3600; // 1 hour
        maxSeconds = 10800; // 3 hours
        break;
      default:
        minSeconds = 60; // 1 minute (fallback for unknown category)
        maxSeconds = 1800; // 30 minutes (fallback for unknown category)
    }
    return Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;
  }



function generateRandomNumberForProfile() {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 60) + 1;
    return randomNumber;
}


function generateRandomViews(likes) {
  const maxViews = 7000000; // 7M
  var likeCount = (parseFloat(likes.replace(/,/g, '')))*10;

  if (likes.endsWith('K')) {
      likeCount *= 1000; // Convert thousands to absolute number
  } else if (likes.endsWith('M')) {
      likeCount *= 1000000; // Convert millions to absolute number
  }

  let minViews;

  if (likeCount >= 1000000) {
      minViews = likeCount + Math.floor(Math.random() * (maxViews - likeCount + 1));
  } else {
      minViews = Math.max(likeCount + Math.floor(Math.random() * (maxViews - likeCount + 1)), 10000); // Ensure views are at least 10k
  }
 
  if (minViews >= 1000000) {
      const millions = (minViews / 1000000).toFixed(0);
      return `${millions}M`;
  } else {
      const thousands = Math.floor(minViews / 1000);
      return `${thousands}k`;
  }
}




function generateRandomLikes() {
  const minLikes = 10000; // 10k
  const maxLikes = 4000000; // 4M


  const randomLikes = Math.floor(Math.random() * (maxLikes - minLikes + 1)) + minLikes; // random number between minandmax (inclusive)
  if (randomLikes < 1000000) {
      const thousands = Math.floor(randomLikes / 1000);
      return `${thousands}k`;
  } else {
      const millions = (randomLikes / 1000000).toFixed(1);
      return `${millions}M`;
  }
}



function generateRandomSubscribersForProfile() {
  const minSubscribers = 15000; // 15k
  const maxSubscribers = 4000000; // 4M

  // Generate a random number between min and max (inclusive)
  const randomSubscribers = Math.floor(Math.random() * (maxSubscribers - minSubscribers + 1)) + minSubscribers;

  // Format the number based on the range
  if (randomSubscribers < 1000000) {
      const thousands = Math.floor(randomSubscribers / 1000);
      return `${thousands}k subscribers`;
  } else {
      const millions = (randomSubscribers / 1000000).toFixed(1);
      return `${millions}M subscribers`;
  }
}



function extractDateFromISOString(dateString) {
  // Parse the ISO date string into a Date object
  const date = new Date(dateString);

  // Get the year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  // Create the formatted date string in the "YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}



function randomTimeAgo() {
  const units = ["hour", "day", "week", "month", "year"];
  const unit = units[Math.floor(Math.random() * units.length)];
  const value = Math.floor(Math.random() * (unit === "hour" ? 23 : 10) + 1);

  if (value === 1) {
      return `1 ${unit} ago`;
  } else {
      return `${value} ${unit}s ago`;
  }
}


function genrateRandomProfilePicLink(){
  const randNum = generateRandomNumberForProfile();
  return `https://i.pravatar.cc/?${randNum}`
}


  
export { 
        generateRandomDuration,
        generateRandomNumberForProfile,
        genrateRandomProfilePicLink,
        generateRandomViews, 
        generateRandomLikes,
        generateRandomSubscribersForProfile,
        extractDateFromISOString,
        randomTimeAgo,
};

