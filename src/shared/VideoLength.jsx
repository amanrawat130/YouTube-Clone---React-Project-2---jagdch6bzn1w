import React from 'react';
import moment from 'moment';

const VideoLength = ({ time }) => {
  // Convert time to seconds
  const timeInSeconds = Number(time);

  // Check if timeInSeconds is a valid number
  if (isNaN(timeInSeconds)) {
    return null; // Return nothing if time is not a valid number
  }

  // Format duration
  const duration = moment.duration(timeInSeconds, 'seconds');
  const formattedDuration = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;

  return (
    <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
      {formattedDuration}
    </span>
  );
};

export default VideoLength;

