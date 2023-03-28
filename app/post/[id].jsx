import { useSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";

const PostDetails = () => {
  const params = useSearchParams();

  return <Text> This is post</Text>;
};

export default PostDetails;
