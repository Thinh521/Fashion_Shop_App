import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class ErrorBoundary extends React.Component {
  state = {hasError: false};

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Something went wrong.</Text>
          <TouchableOpacity onPress={() => this.setState({hasError: false})}>
            <Text style={{color: 'blue', marginTop: 10}}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
