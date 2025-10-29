import userData from "@/assets/data/userData.json";
import MovieCard from "@/components/MovieCard";
import { fetchProfile } from "@/services/api";
import useFetch from "@/services/useFetch";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Profile = () => {
  const user = userData;
  const { data: profile, loading } = useFetch(fetchProfile)

  if (loading || !profile)
    return (
      <SafeAreaView className="bg-primary flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );

  return (
    <ScrollView
      className="flex-1 bg-[#050505]"
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Header Section */}
      <View className="items-center mt-12">
        <Image
          source={{ uri: profile.avatar_url }}
          className="w-32 h-32 rounded-full border-4 border-indigo-500"
        />
        <Text className="text-white text-2xl font-bold mt-4">{profile.name}</Text>
        <Text className="text-gray-400 text-sm">{user.username}</Text>
        <Text className="text-gray-300 text-center mt-2 px-8">{profile.bio}</Text>

        <TouchableOpacity className="bg-indigo-600 px-6 py-2 rounded-full mt-4">
          <Text className="text-white font-semibold">Edit Profile</Text>
        </TouchableOpacity>

      </View>

      {/* Stats */}
      <View className="flex-row justify-around mt-10 mx-5 bg-[#181818] rounded-2xl py-5 border border-gray-800">
        <View className="items-center">
          <Text className="text-white text-xl font-bold">{userData.stats.moviesWatched}</Text>
          <Text className="text-gray-400 text-sm">Movies Watched</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-xl font-bold">{userData.stats.favorites}</Text>
          <Text className="text-gray-400 text-sm">Favorites</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-xl font-bold">{userData.stats.reviews}</Text>
          <Text className="text-gray-400 text-sm">Reviews</Text>
        </View>
      </View>

      {/* Watchlist Section */}
      <View className="mt-10 px-6 ">
        <Text className="text-white text-lg font-semibold mb-3">
          🎞️ Your Watchlist
        </Text>

        <View className="bg-[#181818]  rounded-xl p-4 border border-gray-800">
          {userData.watchlist.length === 0 ? (
            <Text className="text-gray-400 text-sm text-center py-4">
              You haven't added any movies yet.
            </Text>
          ) : (
            <View className="flex-row flex-wrap   ">
              {userData.watchlist.map((item, index) => (
                <MovieCard Poster={item.poster} Title={item.title} {...item} key={index} />
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
