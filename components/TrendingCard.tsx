import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";
import { TrendingCardProps } from "@/interfaces/interfaces";

const TrendingCard = ({
  movie: { movie_id, title, poster },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={{ pathname: "/movies/[id]", params: { id: String(movie_id) } }} asChild>
      <TouchableOpacity className="w-32 relative pl-2">
        <Image
          source={{ uri: poster }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-12 -left-3 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;