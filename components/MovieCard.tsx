import { Movie } from '@/interfaces/interfaces';
import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCard = ({ imdbID, Year, Type, Title, Poster, rating }: Movie) => {
    console.log(imdbID, Year, Type, Title, Poster);

    return (
        <Link href={`/movies/${imdbID}`} asChild>
            <TouchableOpacity
                className="w-[45%] mx-2 my-3 rounded-3xl overflow-hidden shadow-xl bg-gray-800"
                activeOpacity={0.8}
            >
                <View className="relative">
                    <Image
                        source={{
                            uri: Poster
                                ? Poster
                                : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                        }}
                        className="w-full h-64 rounded-3xl"
                        resizeMode="cover"
                    />

                    {/* Modern overlay */}
                    <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm rounded-b-2xl shadow-md space-y-1">
                        <Text className="text-white font-bold text-base truncate">{Title}</Text>
                        {Year && Type && (<Text className="text-gray-300 text-xs tracking-wide">{Year} • {Type}</Text>)}
                    </View>


                    {/* Floating badge for Type */}
                    {Type ? <View className="absolute top-3 left-3 bg-red-600 px-2 py-1 rounded-full">
                        <Text className="text-white text-xs font-bold uppercase">{Type}</Text>
                    </View>
                        : <View className="absolute top-3 left-3 bg-orange-500 px-3 py-1 rounded-full shadow-md shadow-teal-700">
                            <Text className="text-white text-xs font-bold uppercase">{rating} ⭐</Text>
                        </View>

                    }
                </View>
            </TouchableOpacity>
        </Link>
    );
}

export default MovieCard;
