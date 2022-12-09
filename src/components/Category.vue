<script>
import axios from "axios";
export default {

    data: () => ({
        result: null,
        id: null,
        categoria: {
            name: null,
            description: null
        },
        bool: false
    }),

    methods: {
        deleteCategory(categoryId) {
            return axios.delete(`http://posts.test/api/category/${categoryId}/destroy`, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((result) => {
                this.getAll();
            })
        },

        editCategory(categoryId) {
            return axios.get(`http://posts.test/api/category/${categoryId}/edit`, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((result) => {
                this.categoria = result.data.data;
                this.bool = true;
                console.log(this.categoria);
            })
        },

        postCategory(data) {
            axios.post('http://posts.test/api/category/store', data, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((result) => {
                this.categoria = result.data.data;
                console.log(this.categoria);
                this.bool = false;
                this.getAll();
            })
        },

        putCategory(categoryId, data) {
            return axios.put(`http://posts.test/api/category/${categoryId}/update`, data, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((result) => {
                this.categoria = result.data.data;
                this.bool = false;
                console.log(this.categoria);
                this.getAll();
            })
        },

        getAll() {
            axios.get("http://posts.test/api/category/all").then((result) => {
                this.result = result.data.data;
            })
        }
    },

    created() {
        axios.get("http://posts.test/api/category/all").then((result) => {
            this.result = result.data.data;
        })
    }
};
</script>

<template >
    <div>
        <br>
        <div class="container" align="right">
            <form method="POST"></form>
            <div class="form-group" v-if="bool">
                <label for="nameCategoriaId">ID de la categoria: </label>
                <label for="nameCategoriaId">{{ categoria.id }} </label>
            </div>
            <br>
            <div class="form-group">
                <label for="nameCategoriaId">Nombre: </label>
                <input type="text" id="nameCategoriaId" v-model="categoria.name">
            </div>
            <br>
            <div class="form-group">
                <label for="descriptionCategoriaId">Descripción: </label>
                <input type="text" id="descriptionCategoriaId" v-model="categoria.description">
            </div>
            <br>
            <div class="form-group">
                <button class="btn btn-primary" type="submit" @click="postCategory(categoria)"
                    v-if="(bool == false)">Guardar</button>
                <button class="btn btn-secondary" type="submit" @click="putCategory(categoria.id, categoria)"
                    v-if="bool">Actualizar</button>
            </div>
        </div>
        <br>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in result" :key="category.id">
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>{{ category.description }}</td>
                    <td>
                        <button class="btn btn-secondary" @click="editCategory(category.id)">Editar</button>
                        <button class="btn btn-danger" @click="deleteCategory(category.id)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
</style>
