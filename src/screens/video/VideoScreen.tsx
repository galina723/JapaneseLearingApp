import { View, Text } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const VideoScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: 'https://www.youtube.com/watch?v=yo8NLBw-TS8&list=PLuJp1COrW-FijdRopM-TsfQyLVugBFRFh',
        }}
      />
    </View>
  );
};

export default VideoScreen;
