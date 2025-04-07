import React, { useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useProductStore from '../store/productStore';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { useThemeContext } from '../theme/ThemeContext';

export default function ProductListScreen() {
  const {
    fetchProducts,
    loading,
    error,
    setSearch,
    search,
    setSort,
    setCategory,
    loadMore,
    getFilteredSortedSearchedProducts,
  } = useProductStore();

  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);
  const filteredProducts = getFilteredSortedSearchedProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChange={setSearch} />

      <View style={styles.toggleWrapper}>
        <Text onPress={toggleTheme} style={styles.toggleText}>
          Toggle Theme
        </Text>
      </View>

      <View style={styles.pickerRow}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={useProductStore.getState().sort}
            onValueChange={(itemValue) => setSort(itemValue)}
            style={styles.picker}
            dropdownIconColor={isDark ? '#fff' : '#000'}
          >
            <Picker.Item label="Sort by" value="default" color={isDark ? '#fff' : '#000'} />
            <Picker.Item label="A-Z" value="az" color={isDark ? '#fff' : '#000'} />
            <Picker.Item label="Z-A" value="za" color={isDark ? '#fff' : '#000'} />
            <Picker.Item label="Price: Low to High" value="low-high" color={isDark ? '#fff' : '#000'} />
            <Picker.Item label="Price: High to Low" value="high-low" color={isDark ? '#fff' : '#000'} />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={useProductStore.getState().category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
            dropdownIconColor={isDark ? '#fff' : '#000'}
          >
            <Picker.Item label="All Categories" value="all" color={isDark ? '#fff' : '#000'} />
            <Picker.Item label="Men's Clothing" value="men's clothing" color={isDark ? '#fff' : '#000'} />
            <Picker.Item label="Women's Clothing" value="women's clothing" color={isDark ? '#fff' : '#000'} />
            <Picker.Item label="Jewelery" value="jewelery" color={isDark ? '#fff' : '#000'} />
            <Picker.Item label="Electronics" value="electronics" color={isDark ? '#fff' : '#000'} />
          </Picker>
        </View>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
        ) : error ? (
          <Text style={{ color: isDark ? '#fff' : '#000' }}>{error}</Text>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard product={item} />}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <ActivityIndicator /> : null}
          />
        )}
      </View>
    </View>
  );
}

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: isDark ? '#121212' : '#fefefe',
    },
    toggleWrapper: {
      alignItems: 'flex-end',
      marginVertical: 6,
    },
    toggleText: {
      color: isDark ? '#bbb' : '#007BFF',
      fontSize: 14,
      fontWeight: '600',
    },
    pickerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
      marginBottom: 5,
    },
    pickerWrapper: {
      flex: 1,
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    picker: {
      height: 52,
      width: '100%',
      color: isDark ? '#fff' : '#000',
      fontSize: 14,
      paddingLeft: 8,
    },
    listContainer: {
      flex: 1,
    },
    columnWrapper: {
      justifyContent: 'space-between',
      paddingHorizontal: 0,
    },
  });
