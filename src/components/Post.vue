<script>
import axios from "axios";
export default {

    data: () => ({
        result: null,
        id: null,
        poster: {
            name: null,
            category_id: 1,
            description: null,
            state: 'post'
        },
        bool: false
    }),

    methods: {
        deletePost(postId) {
            return axios.delete(`http://posts.test/api/post/${postId}/destroy`, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((result) => {
                this.getAll();
            })
        },

        editPost(postId) {
            return axios.get(`http://posts.test/api/post/${postId}/edit`, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((result) => {
                this.poster = result.data.data;
                this.bool = true;
                console.log(this.poster);
            })
        },

        postPost(data) {
            axios.post('http://posts.test/api/post/store', data, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((result) => {
                this.poster = result.data.data;
                console.log(this.poster);
                this.bool = false;
                this.getAll();
            })
        },

        putPost(postId, data) {
            return axios.put(`http://posts.test/api/post/${postId}/update`, data, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((result) => {
                this.poster = result.data.data;
                this.bool = false;
                console.log(this.poster);
                this.getAll();
            })
        },

        getAll() {
            axios.get("http://posts.test/api/post/all").then((result) => {
                this.result = result.data.data;
            })
        }
    },

    created() {
        axios.get("http://posts.test/api/post/all").then((result) => {
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
                <label for="nameCategoriaId">ID de la poster: </label>
                <label for="nameCategoriaId">{{ poster.id }} </label>
            </div>
            <br>
            <div class="form-group">
                <label for="nameCategoriaId">Nombre: </label>
                <input type="text" id="nameCategoriaId" v-model="poster.name">
            </div>
            <br>
            <div class="form-group">
                <label for="categoryId">category_id</label>
                <input type="text" id="categoryId" v-model="poster.category_id">
            </div>
            <br>
            <div class="form-group">
                <label for="descriptionCategoriaId">Descripción: </label>
                <input type="text" id="descriptionCategoriaId" v-model="poster.description">
            </div>
            <br>
            <div class="form-group">
                <label for="stateId">State</label>
                <input type="text" id="stateId" v-model="poster.state">
            </div>
            <br>
            <div class="form-group">
                <button class="btn btn-primary" type="submit" @click="postPost(poster)"
                    v-if="(bool == false)">Guardar</button>
                <button class="btn btn-secondary" type="submit" @click="putPost(poster.id, poster)"
                    v-if="bool">Actualizar</button>
            </div>
        </div>
        <br>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category_id</th>
                    <th scope="col">Description</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in result" :key="post.id">
                    <td>{{ post.id }}</td>
                    <td>{{ post.name }}</td>
                    <td>{{ post.category_id }}</td>
                    <td>{{ post.description }}</td>
                    <td>
                        <button class="btn btn-secondary" @click="editPost(post.id)">Editar</button>
                        <button class="btn btn-danger" @click="deletePost(post.id)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
</style>
