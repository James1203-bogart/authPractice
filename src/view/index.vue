    <template>
    <div class="Authenticated-container">
        <section class="auth-header" v-if="currentUser">
        <p><strong>Logged in as: {{ currentUser.full_name }}</strong></p>
        <button @click="handleLogout">LOGOUT</button>
        </section>
        <br>
        <section class="account-form" v-if="currentUser">
        <input v-model="inputAccount" placeholder="Username" />
        <input v-model="inputFullName" placeholder="Fullname" />
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
            <td>{{ user.full_name || user.username }}</td>
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
        const generateRandomToken = (length = 64) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters.charAt(randomIndex);
        }
        return token;
        };
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
                return this.$store.getters['authUsers/standardUsersList'];
            }
        },
        methods: {
            handleLogout() {
            this.$store.dispatch('authUser/logout');
            this.$router.push('/login');
        },
            addAccount() {
            if (!this.inputAccount || !this.inputPassword || !this.inputFullName) {
            alert('Pakilagyan ang lahat ng fields.');
            return;
            }
            const generatedToken = generateRandomToken(64);

            const newUser = {
            id: this.users.length > 0 ? parseInt(this.users[this.users.length - 1].id) + 1 : 1 || [],
            full_name: this.inputFullName,
            username: this.inputAccount,
            password: this.inputPassword,
            account_type: 'user',
            token: generatedToken
            };

            this.$store.dispatch('authUser/addAccount', newUser);

            this.clearForm();
        },
            saveAccount() {
            if(!this.editingUserId)return;
            const updateList = this.users.map((user) => {
                if(user.id === this.editingUserId){
                    return{
                        ...user,
                        full_name: this.inputFullName,
                        username: this.inputUsername,
                        password: this.inputPassword || user.password
                    }
                }
                return user;
            })
            this.$store.dispatch('authUser/updateUsers', updateList);
            this.clearForm();
        },
            editUser(user) {
            this.editingUserId = user.id;
            this.inputFullName = user.full_name;
            this.inputAccount = user.username;
            this.inputPassword = user.password;
        },
            deleteUser(user) {
            const filteredList = this.users.filter((item) => item.id !== user.id);
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