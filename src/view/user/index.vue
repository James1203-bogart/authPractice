<template>
    <p>{{ currentUser.full_name }}</p>
    <button @click="handleLogout">LOGOUT</button>
</template>

<script>
        export default {
        name: 'AuthenticatedPage',
        data() {
            return {
            inputAccount: '',
            inputPassword: '',
            inputFullName: '',
            id: [{ id: 1, name: 'name' }],
            token:'',
            };
        },
        computed: {
            currentUser() {
            return this.$store.getters['authUser/currentUser'];
            },
            users(){ 
                return this.$store.getters['authUser/users'];;
            }
        },
        methods: {
            handleLogout() {
            this.$store.dispatch('authUser/logout');
            this.$router.push('/login');
        },
            editUser(user) {
            this.editingUserId = user.id;
            this.inputFullName = user.full_name;
            this.inputAccount = user.username;
            this.inputPassword = user.password;
        },
            deleteUser(user) {
            const filteredList = this.users.filter((item) => item.id !== user.id); 2
            this.$store.dispatch('authUser/updateUsers', filteredList);
        },
            clearForm() {
            this.inputFullName = '';
            this.inputAccount = '';
            this.inputPassword = '';
            this.editingUserId = null;
        }
    }
};
    </script>