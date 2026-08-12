    <template>
        <div class="Authenticated-container">
            <section class="auth-header" v-if="currentUser">
                <p><strong>Logged in as: {{ currentUser.full_name }}</strong></p>
                <button @click="handleLogout">LOGOUT</button>
            </section>

            <section class="account-form" v-if="currentUser">
                <input v-model="inputAccount" placeholder="Username" />
                <input type="password" v-model="inputPassword" placeholder="Password" />
                <button @click="addAccount">Add account</button>
                <button @click="saveAccount">Save</button>
            </section>

        </div>

    <div class="user-container">
        <table>
            <thead>
                <tr>
                    <th>User List</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>
                        <button @click="editUser(user)">EDIT</button>
                        <button @click="deleteUser(user)">DELETE</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </template>

    <script>
    export default {
    name: 'AuthenticatedPage',
    data() {
        return {
        inputAccount: '',
        inputPassword: '',
        users: [{ id: 1, name: 'name' }],
        };
    },
    computed: {
        currentUser() {
        return this.$store.getters['authUser/currentUser'];
        },
    },
    methods: {
        handleLogout() {
        this.$store.dispatch('authUser/logout');
        this.$router.push('/login');
        },
        addAccount() {
        if (!this.inputAccount || !this.inputPassword) {
            return;
        }

        this.users.push({
            id: Date.now(),
            name: this.inputAccount,
        });
        this.inputAccount = '';
        this.inputPassword = '';
        },
        saveAccount() {
        console.log('Save account', this.inputAccount, this.inputPassword);
        },
        editUser(user) {
        this.inputAccount = user.name;
        this.inputPassword = '';
        },
        deleteUser(user) {
        this.users = this.users.filter((item) => item.id !== user.id);
        },
    },
    };
    </script>