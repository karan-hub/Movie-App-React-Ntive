import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError } = useFetch(getTrendingMovies)

  trendingMovies?.forEach((movie) => console.log(movie.count));

  const {
    data: movies,
    loading: moviesLoading,
    error: movieError } = useFetch(() => fetchMovies({
      query: ''
    }))



  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full h-full z-0 absolute" resizeMode="cover" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}
      >
        <Image source={icons.logo} className="w-10 h-10 mt-16 mb-5 mx-auto" />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : movieError || trendingMoviesError ? (
          <Text className="text-white">Error: {movieError?.message || trendingMoviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5 ">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder={"Search for movie"} value={""}
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg  font-bold  text-white  mb-3">Trending Movies...</Text>
                <FlatList
                  data={trendingMovies}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4"></View>}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                />
              </View>
            )}
            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => (<MovieCard {...item} />)}
              keyExtractor={(item) => item.imdbID}
              scrollEnabled={false}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10
              }}
              className="mt-2 pb-32 -ml-2"
              nestedScrollEnabled={false}
            />

          </View>
        )}
      </ScrollView>
    </View>
  );
}