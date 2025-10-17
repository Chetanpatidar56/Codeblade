import { useState, useRef, useEffect } from "react";
import { Pause, Play } from "lucide-react";

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // Format seconds to M:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Handle video end
    useEffect(() => {
        const video = videoRef.current;

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        if (video) {
            video.addEventListener('ended', handleEnded);
            return () => video.removeEventListener('ended', handleEnded);
        }
    }, []);

    // Update current time during playback
    useEffect(() => {
        const video = videoRef.current;

        const handleTimeUpdate = () => {
            if (video) {
                setCurrentTime(video.currentTime);
            }
        };

        if (video) {
            video.addEventListener('timeupdate', handleTimeUpdate);
            return () => video.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, []);

    return (
        <div className="w-full p-6">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">🎥 Video Editorial</h2>
                <p className="text-slate-400 text-sm">Watch the detailed explanation of this problem</p>
            </div>

            <div 
                className="relative w-full aspect-video bg-black rounded-xl overflow-hidden cursor-pointer shadow-2xl border border-slate-700"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Video Element */}
                <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    poster={thumbnailUrl}
                    preload="metadata"
                    onClick={togglePlayPause}
                    playsInline
                >
                    <source src={secureUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Video Controls Overlay */}
                <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                        isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* Center Play/Pause Button */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <button
                            onClick={togglePlayPause}
                            className="bg-white/10 backdrop-blur-lg rounded-full p-6 hover:bg-white/20 transition-all duration-300 hover:scale-110 border-2 border-white/30 shadow-2xl"
                        >
                            {isPlaying ? (
                                <Pause className="w-12 h-12 text-white" fill="white" />
                            ) : (
                                <Play className="w-12 h-12 text-white ml-1" fill="white" />
                            )}
                        </button>
                    </div>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        {/* Progress Bar */}
                        <div 
                            className="w-full bg-white/20 rounded-full h-1.5 mb-3 cursor-pointer hover:h-2 transition-all duration-200 backdrop-blur-sm"
                            onClick={(e) => {
                                if (videoRef.current) {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const percent = (e.clientX - rect.left) / rect.width;
                                    videoRef.current.currentTime = percent * videoRef.current.duration;
                                }
                            }}
                        >
                            <div 
                                className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full transition-all duration-100 relative"
                                style={{ 
                                    width: videoRef.current && videoRef.current.duration ? 
                                        `${(currentTime / videoRef.current.duration) * 100}%` : '0%' 
                                }}
                            >
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                            </div>
                        </div>
                        
                        {/* Time Display */}
                        <div className="flex justify-between items-center">
                            <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                                {formatTime(currentTime)}
                            </span>
                            <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                                {videoRef.current && videoRef.current.duration ? 
                                    formatTime(videoRef.current.duration) : formatTime(duration)}
                            </span>
                        </div>
                    </div>

                    {/* Duration Badge (Top Right) */}
                    {!isPlaying && (
                        <div className="absolute top-6 right-6 bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-md border border-white/20">
                            Duration: {formatTime(duration)}
                        </div>
                    )}
                </div>

                {/* Large Play Button When Paused */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <div className="text-center">
                            <button
                                onClick={togglePlayPause}
                                className="bg-white hover:bg-green-500 rounded-full p-8 transition-all duration-300 hover:scale-110 shadow-2xl group"
                            >
                                <Play className="w-16 h-16 text-gray-900 group-hover:text-white ml-2 transition-colors duration-300" />
                            </button>
                            <p className="text-white text-lg font-semibold mt-6 drop-shadow-lg">Click to play</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Video Description */}
            <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-slate-300 text-sm">
                    💡 <strong className="text-green-400">Pro Tip:</strong> Watch this video to understand the optimal approach and implementation details.
                </p>
            </div>
        </div>
    );
};

export default Editorial;
