import * as React from 'react'
import { Link } from 'react-router-dom';
import * as ReactRedux from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services';
import Error from './Error';

const TopChartCard = ({ song, i, handlePause, handlePlay, isPlaying, activeSong }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">
      {++i}.
    </h3>
    <div className="flex-1 flex flex-row justify-between items-center ">
      <img src={song.images.coverart} alt={song.title} className='w-20 h-20 rounded-lg' />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className='text-white text-xl font-bold'>{song.title}</p>
        </Link>
        <Link to={`/songs/${song.artists[0].adamid}`}>
          <p className='text-gray-300 mt-1 text-base'>{song.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      song={song}
      handlePause={handlePause}
      handlePlay={() => handlePlay(song, i)}
      isPlaying={isPlaying}
      activeSong={activeSong}
    />
  </div>
)

const TopPlay = () => {
  const dispatch = ReactRedux.useDispatch()
  const { isPlaying, activeSong } = ReactRedux.useSelector((state) => state.player)
  const { data, error, isFetching } = useGetTopChartsQuery()
  const divRef = React.useRef(null)
  const topPlays = data?.slice(0, 5)
  // if (isFetching) return <Loader title={`Loading songs ...`} />
  if (error) return <Error />

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))

  }

  React.useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  })
  return (
    <div
      ref={divRef}
      className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'
    >
      <div className="w-full flex flex-col">
        {/* Top Charts */}
        <div className="flex flex-row justify-between items-center">
          <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
          <Link to={`/top-charts`}>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1 ">
          {topPlays && topPlays.map((song, idx) => (
            <TopChartCard
              song={song}
              key={idx}
              i={idx}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          ))}
        </div>
      </div>
      {/* Top Artists */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
          <Link to={`/top-artists`}>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView={`auto`}
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'
        >
          {topPlays && topPlays.map((song, idx) => (
            <SwiperSlide
              key={idx}
              style={{ width: '25%', height: 'auto' }}
              className='shadow-lg rounded-full animate-slideright'
            >
              <Link to={`/artists/${song.artists[0].adamid}`}>
                <img src={song.images.background} alt={`name`} className='rounded-full w-full object-cover' />
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
};

export default TopPlay;
