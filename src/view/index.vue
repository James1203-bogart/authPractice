<template>
    <div class="Authenticated-container">
        <div v-if="currentUser">
            <p><strong>{{ currentUser.full_name }}</strong></p>
            <button @click="handleLogout">LOGOUT</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AuthenticatedPage',
    computed: { 
        currentUser() { 
            return this.$store.getters['authUser/currentUser'];

        }
    },

    mathods: { 
        handleLogout() { 
            this.$store.dispatch('authUser/logout');
            this.router.push('/Login');

        }
    }
}
</script>