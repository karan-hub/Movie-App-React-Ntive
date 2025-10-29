import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MoviesDetails = () => {
  const DEFAULT_POSTER =
    "https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg";
  const { id } = useLocalSearchParams();
  
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="relative w-full h-[480px]">
          <Image
            source={{
              uri:
                movie?.Poster && movie?.Poster !== "N/A"
                  ? movie.Poster
                  : DEFAULT_POSTER,
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            className="absolute bottom-0 left-0 right-0 h-64"
          />
        </View>

        <View className="px-6 -mt-28">
          <View className="bg-secondary/70 rounded-3xl p-6 shadow-2xl shadow-black/50 border border-white/10">
            <Text className="text-4xl font-extrabold text-white mb-2 leading-tight">
              {movie?.Title}
            </Text>
            <Text className="text-gray-300 text-base mb-5 italic leading-relaxed">
              {movie?.Plot}
            </Text>

            <View className="flex-row flex-wrap gap-2 mb-5">
              {movie?.Genre && (
                <View className="bg-accent/20 px-3 py-1.5 rounded-full border border-accent/40">
                  <Text className="text-accent text-xs font-semibold uppercase tracking-wide">
                    {movie.Genre}
                  </Text>
                </View>
              )}
              {movie?.Runtime && (
                <View className="bg-white/10 px-3 py-1.5 rounded-full">
                  <Text className="text-light-100 text-xs font-semibold">
                    {movie.Runtime}
                  </Text>
                </View>
              )}
              {movie?.Year && (
                <View className="bg-white/10 px-3 py-1.5 rounded-full">
                  <Text className="text-light-100 text-xs font-semibold">
                    {movie.Year}
                  </Text>
                </View>
              )}
            </View>

            <View className="mb-3">
              <Text className="text-light-400 font-semibold uppercase text-xs">
                Director
              </Text>
              <Text className="text-light-100 text-sm">{movie?.Director}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-light-400 font-semibold uppercase text-xs">
                Cast
              </Text>
              <Text className="text-light-100 text-sm">{movie?.Actors}</Text>
            </View>

            {movie?.Awards && (
              <View className="mb-3">
                <Text className="text-light-400 font-semibold uppercase text-xs">
                  Awards
                </Text>
                <Text className="text-light-100 text-sm">{movie.Awards}</Text>
              </View>
            )}

            <View className="mt-5 space-y-2">
              <View className="flex-row items-center">
                <Image
                  source={icons.star}
                  className="w-5 h-5 mr-2"
                  tintColor="#FFD700"
                />
                <Text className="text-yellow-400 font-bold text-lg">
                  {movie?.imdbRating}
                </Text>
                <Text className="text-gray-400 ml-1 text-sm">/ 10 IMDb</Text>
              </View>

              {movie?.imdbRating && movie?.imdbRating?.length > 0 && (
                <View className="flex-row flex-wrap mt-2 gap-x-4 gap-y-1">
                  {movie.Ratings.map((rating, index) => (
                    <View
                      key={index}
                      className="flex-row items-center bg-white/10 px-3 py-1 rounded-full"
                    >
                      <Text className="text-light-100 text-xs mr-1">
                        {rating.Source}:
                      </Text>
                      <Text className="text-accent font-semibold text-xs">
                        {rating.Value}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={router.back}
        activeOpacity={0.9}
        className="absolute bottom-6 left-6 right-6 bg-accent rounded-full py-3.5 flex flex-row items-center justify-center shadow-lg shadow-black/50"
      >
        <Image
          source={icons.arrow}
          className="w-5 h-5 mr-2 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MoviesDetails;
