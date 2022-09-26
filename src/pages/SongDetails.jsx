import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Loader, DetailsHeader, Error, RelatedSongs } from '../components'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetSongRelatedQuery, useGetSongsDetailsQuery } from '../redux/services'

const SongDetails = () => {
    const dispatch = useDispatch()
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { songid } = useParams()
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongsDetailsQuery(songid)
    const { data: relatedSong, isFetching: isFetchingSongRelated, error } = useGetSongRelatedQuery(songid)

    const handlePauseClick = () => {
        dispatch(playPause(false))
    }
    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }))
        dispatch(playPause(true))

    }

    if (isFetchingSongDetails || isFetchingSongRelated) return <Loader title={`Searching song details`} />
    if (error) return <Error />
    return (
        <div className='flex flex-col'>
            <DetailsHeader songData={songData} artistId={``} artistData={``} />
            <div className="mb-10">
                <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>
                <div className="mt-5 ">
                    {
                        songData && songData.sections[1].type === 'LYRICS' ?
                            songData.sections[1].text.map((line, idx) => (
                                <p className='text-gray-400 text-base my-1' key={idx}>{line}</p>
                            )) :
                            <p className='text-gray-400 text-base my-1'>{"Sorry no lyrics found"}</p>
                    }
                </div>
            </div>
            <RelatedSongs
                data={relatedSong}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    )
}

export default SongDetails