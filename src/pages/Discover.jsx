import { Error, Loader, SongCard } from '../components'
import { genres } from '../assets/constants'
import React from 'react';
import { useGetTopChartsQuery } from '../redux/services';
import { useDispatch, useSelector } from 'react-redux'

const Discover = () => {
    const { data, isFetching, error, isLoading, isSuccess } = useGetTopChartsQuery()
    const dispatch = useDispatch()
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const [genreTitle, setGenreTitle] = React.useState("Pop")
    const handleChange = (e) => setGenreTitle(e.target.value)
    if (isFetching) return <Loader title={`Loading songs ...`} />
    if (error) return <Error  />

    return (
        <div className="flex flex-col ">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
                <select
                    name=""
                    id=""
                    onChange={handleChange}
                    value={genreTitle}
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none
                    sm:mt-0 mt-5"
                >
                    {genres.map((genre, idx) => <option key={idx}>{genre.title}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, idx) => (
                    <SongCard
                        key={idx}
                        song={song}
                        i={idx}
                        activeSong={activeSong}
                        isPlaying={isPlaying}
                    />
                ))}
            </div>
        </div>
    )
};

export default Discover;
