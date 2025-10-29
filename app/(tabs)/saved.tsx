import savedData from "@/assets/data/saved.json"; // your saved movie JSON
import { Movie } from "@/interfaces/interfaces";
import { Link } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const Saved = () => {
  const savedMovies: Movie[] = (savedData || []).map((movie: any) => ({
    Poster: movie.poster,
    Title: movie.title,
    imdbID: movie.imdbId,
    Year: movie.year,
    Type: movie.genre,
  }));

  const renderMovie = ({ item }: { item: Movie }) => (
    <Link href={`/movies/${item.imdbID}`} asChild>
    <TouchableOpacity 
    className="bg-neutral-900 rounded-2xl overflow-hidden mb-5 shadow-lg"
     >
      <Image
        source={{ uri: item.Poster }}
        className="w-full h-60"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-white text-lg font-semibold">{item.Title}</Text>
        <Text className="text-gray-400 text-sm mt-1">{item.Year} </Text>
        <View className="flex-row items-center mt-2">
            <Text style={{ fontSize: 16, color: '#f87171' }}>❤️</Text>
            <Text className="text-gray-300 text-xs ml-1">{item.Type || "N/A"}</Text>
          </View>
      </View>
    </TouchableOpacity>
    </Link>
  );

  return (  
    <View className="flex-1 bg-black px-5 pt-14">
      <Text className="text-white text-3xl font-extrabold mb-6">Saved Movies 🎬</Text>

      {savedMovies.length > 0 ? (
        <FlatList
          data={savedMovies}
          keyExtractor={(item) => item.imdbID?.toString() ?? item.imdbID?.toString()}
          renderItem={renderMovie}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">No movies saved yet 😔</Text>
        </View>
      )}
    </View>
  );
};

export default Saved;
