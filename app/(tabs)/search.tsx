import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

// develope Search functionaly
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const {
    data: movies,
    loading: moviesLoading,
    refetch: loadMovie,
    reset,
    error: movieError } = useFetch(() => fetchMovies({
      query: searchQuery
    }), false)

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim())
        await loadMovie()
      else
        reset()
    }, 500)

    return () => clearTimeout(timeOutId)
  }, [searchQuery])

  useEffect(() => {
    if (searchQuery.trim() && movies && movies.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className='flex-1  bg-primary'>
      <Image source={images.bg} className='flex-1  absolute w-full h-full z-0' resizeMode='cover' />
      <FlatList
        data={movies || []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.imdbID}
        className='px-5 '
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10
        }}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListHeaderComponent={
          <>
            <View className="w-full  flex-row justify-center mt-20">
              <Image source={icons.logo} className='w-10 h-10  mb-2 mx-auto' />

            </View>
            <View className='py-5'>
              <SearchBar
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" />)}
            {movieError && (
              <Text className='text-red-500 px-5 my-3'>{movieError.message}</Text>
            )}

            {!moviesLoading
              && !movieError
              && searchQuery.trim()
              && movies?.length > 0
              && (
                <View className='flex-row w-full'>
                  <Text className="text-xl text-white font-bold">
                    Search Results For{' '}
                  </Text>
                  <Text className="text-accent text-xl  font-bold">{searchQuery}</Text>
                </View>
              )}
          </>
        }
        ListEmptyComponent={
          !movieError && !moviesLoading ? (
            <View className='mt-10 px-5'>
              <Text className='text-center  text-gray-500'>
                {searchQuery.trim() ? 'No Movies Found' : 'Search For a Movie'}
              </Text>
            </View>
          ) : null
        }
      />

    </View>
  )
}

export default Search