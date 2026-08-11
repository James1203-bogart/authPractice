const routesData = []

    const modules = import.meta.glob('./**/*.vue', { eager: true })

    const root =  { 
        path: '/',
        name: 'Root',
        redirect: '/loginPage'
    }
