import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface YTPlayer {
  destroy(): void;
  playVideo(): void;
  pauseVideo(): void;
  getPlayerState(): number;
}

interface YTPlayerOptions {
  height?: string | number;
  width?: string | number;
  videoId: string;
  playerVars?: {
    playsinline?: number;
    modestbranding?: number;
    rel?: number;
    origin?: string;
  };
  events?: {
    onReady?: (event: any) => void;
    onStateChange?: (event: any) => void;
    onError?: (event: any) => void;
  };
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

let youtubeApiPromise: Promise<void> | null = null;

const loadYouTubeAPI = (): Promise<void> => {
  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  // Check if API is already loaded
  if (window.YT && window.YT.Player) {
    youtubeApiPromise = Promise.resolve();
    return youtubeApiPromise;
  }

  // Check if script is already in DOM
  const existingScript = document.querySelector(
    'script[src="https://www.youtube.com/iframe_api"]',
  );
  if (existingScript) {
    youtubeApiPromise = new Promise<void>((resolve) => {
      const checkReady = () => {
        if (window.YT && window.YT.Player) {
          resolve();
        } else {
          setTimeout(checkReady, 50);
        }
      };
      checkReady();
    });
    return youtubeApiPromise;
  }

  // Load the API script
  youtubeApiPromise = new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    // Set up global callback only once
    if (!window.onYouTubeIframeAPIReady) {
      (window as any).onYouTubeIframeAPIReady = () => {
        resolve();
      };
    } else {
      // API is being loaded by another instance, wait for it
      const checkReady = () => {
        if (window.YT && window.YT.Player) {
          resolve();
        } else {
          setTimeout(checkReady, 50);
        }
      };
      checkReady();
    }

    document.body.appendChild(script);
  });

  return youtubeApiPromise;
};

export default function YouTube({ id }: { id: string }) {
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerIdRef = useRef<string>(
    `youtube-player-${id}-${Math.random().toString(36).substring(2, 11)}`,
  );
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;

    const initializePlayer = async () => {
      try {
        // Wait for YouTube API to be ready
        await loadYouTubeAPI();

        // Check if component is still mounted
        if (
          !isMountedRef.current ||
          !containerRef.current ||
          playerRef.current
        ) {
          return;
        }

        // Create a div for the player with unique ID
        const playerDiv = document.createElement("div");
        playerDiv.id = playerIdRef.current;

        // Clear any existing content
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(playerDiv);

        playerRef.current = new window.YT!.Player(playerDiv.id, {
          height: "100%",
          width: "100%",
          videoId: id,
          playerVars: {
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            origin: window.location.origin, // Help prevent error 153
          },
          events: {
            onError: (event: any) => {
              console.error("YouTube player error:", event.data);
              // Handle specific error codes
              if (
                event.data === 153 ||
                event.data === 150 ||
                event.data === 101 ||
                event.data === 100
              ) {
                console.log(
                  "Video playback restricted (error " + event.data + ")",
                );
              }
            },
          },
        });
      } catch (error) {
        console.error("Failed to create YouTube player:", error);
      }
    };

    initializePlayer();

    return () => {
      isMountedRef.current = false;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.warn("Error destroying YouTube player:", error);
        }
        playerRef.current = null;
      }

      // Clean up the container
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [id]);

  return (
    <div className={styles.videoWrapper}>
      <div ref={containerRef} className={styles.responsiveIframe} />
    </div>
  );
}
