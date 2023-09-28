import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';


 function CategoriaServicios() {
    const [categoria, setCategoria] = useState('');
    const [categoriasActivas, setCategoriasActivas] = useState([]);
    const [categoriasInactivas, setCategoriasInactivas] = useState([]);
    
    const handleAgregarCategoria = () => {
        if (categoria.trim() !== '') {
            const nuevaCategoria = {
            id: Date.now().toString(),
            nombre: categoria,
            activa: true,
        };
        setCategoriasActivas([...categoriasActivas, nuevaCategoria]);
        setCategoria('');
        }
    };

    const handleCambiarEstado = (id) => {
        const categoriasActualizadas = categoriasActivas.map((cat) =>
            cat.id === id ? { ...cat, activa: !cat.activa } : cat
        );
        setCategoriasActivas(categoriasActualizadas);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.textContainer}>Crear Categoría de Servicio:</Text>
            <TextInput  style={styles.input}
            placeholder="Nombre de la categoría"
            value={categoria}
            onChangeText={(text) => setCategoria(text)}
            />
            <Button 
            title="Agregar Categoría"
            onPress={handleAgregarCategoria}
            />
            <Text style={styles.textContainer} >Categorías Activas:</Text>
            <FlatList
            data={categoriasActivas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' ,color:"#ccc"}}>
                <Text  style={styles.textContainer} >{item.nombre}</Text>
                <Button
                title={item.activa ? 'Desactivar' : 'Activar'}
                onPress={() => handleCambiarEstado(item.id)}
                />
                </View>
            )}
            />
            <Text>Categorías Inactivas:</Text>
            <FlatList
            data={categoriasInactivas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item.nombre}</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
          width: 400 ,
          height: 300,
    },
    textContainer: {
        padding: 10,

      },
      searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      },
      input: {
        width:250,
        height:10,
        marginVertical: 15,
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        borderWidth: 3,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        color: "#ffffff"
      },
  });

  export default CategoriaServicios