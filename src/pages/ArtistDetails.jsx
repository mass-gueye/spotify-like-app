import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Loader, DetailsHeader, Error, RelatedSongs } from '../components'
import { useGetArtistDetailsQuery } from '../redux/services'

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { id: artistid } = useParams()
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistid)




  if (isFetchingArtistDetails) return <Loader title={`Loading artist details`} />
  if (error) return <Error />
  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId={artistid} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistid}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  )
}

export default ArtistDetails