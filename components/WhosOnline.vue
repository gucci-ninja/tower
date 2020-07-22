<template>
    <div id="whos-online">
        <h1>Users On: {{ users }}</h1>
        <ul id="users">
            <li v-for="user in user_names" :key="user">
                {{ user }}
            </li>
        </ul>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            users: 0,
            user_names: [],
            socket: io('localhost:8000')
        }
    },
    mounted() {
        this.socket.on('users', (data) => {
            this.users = data.users
            this.user_names = data.user_names
        });
    }
}
</script>

<style scoped>

#whos-online {
    width: 25em;
    height: 20em;
    border: 1px solid;
    top: 0px;
}

</style>