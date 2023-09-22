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
        <View>
            <Text>Crear Categoría de Servicio:</Text>
            <TextInput  
            placeholder="Nombre de la categoría"
            value={categoria}
            onChangeText={(text) => setCategoria(text)}
            />
            <Button
            title="Agregar Categoría"
            onPress={handleAgregarCategoria}
            />
            <Text>Categorías Activas:</Text>
            <FlatList
            data={categoriasActivas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{item.nombre}</Text>
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

  export default CategoriaServicios