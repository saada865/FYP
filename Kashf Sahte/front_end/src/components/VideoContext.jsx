import React, { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [videoInfo, setVideoInfo] = useState({
    fileName: "",
    fileSize: 0,
    fileFormat: "",
    duration: 0,
    result: "",
    confidence: 0,
  });

  return (
    <VideoContext.Provider value={{ videoInfo, setVideoInfo }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  return useContext(VideoContext);
}
