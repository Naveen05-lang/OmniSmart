import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.rating}>⭐ {product.rating?.rate ?? 'N/A'}</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  rating: {
    marginTop: 2,
    fontSize: 13,
    color: '#f1c40f',
  },
});
