import SongBar from "./SongBar";


const RelatedSongs = ({ data, handlePause, handlePlay, isPlaying, activeSong, artistId }) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Song:</h1>
      <div className="mt-6 w-full flex flex-col">
        {
          data?.map((song, idx) => (
            <SongBar
              key={idx}
              activeSong={activeSong}
              song={song}
              i={idx}
              handlePauseClick={handlePause}
              handlePlayClick={handlePlay}
              isPlaying={isPlaying}
              artistId={artistId}
            />
          ))
        }
      </div>
    </div>
  )
};

export default RelatedSongs;
