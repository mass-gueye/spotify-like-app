import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Loader, DetailsHeader, Error, RelatedSongs } from '../components'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetSongsDetailsQuery } from '../redux/services'

const SongDetails = () => {
    const dispatch = useDispatch()
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { songid } = useParams()
    const { data: songData, error, isFetching: isFetchingSongDetails } = useGetSongsDetailsQuery(songid)
    if (isFetchingSongDetails) return <Loader />
    // if (error) return <Error />
    return (
        <div className='flex flex-col'>
            <DetailsHeader songData={songData} artistId={``} />
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
        </div>
    )
}

export default SongDetails