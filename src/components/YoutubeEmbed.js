import React from "react";
import PropTypes from "prop-types";
import "../styles/YoutubeEmbed.css";

const YoutubeEmbed = ({ embedId, autoplay, mute }) => {
  // Construct the YouTube embed URL with dynamic autoplay, mute, and loop
  const autoplayParam = autoplay ? "1" : "0";
  const muteParam = mute ? "1" : "0"; // Keep mute as 1 (muted by default)
  const loopParam = "1"; // Enable looping
  const playlistParam = embedId; // Use the video ID as the playlist parameter

  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}?autoplay=${autoplayParam}&mute=${muteParam}&loop=${loopParam}&playlist=${playlistParam}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  autoplay: PropTypes.bool // The autoplay prop is a boolean
};

YoutubeEmbed.defaultProps = {
  autoplay: true // Default value for autoplay is true
};

export default YoutubeEmbed;
