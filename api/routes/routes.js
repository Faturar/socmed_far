import postsRoutes from './posts.routes.js'
import usersRoutes from './users.routes.js'

export default app => {
    // posts route
    postsRoutes(app)

    // users route
    usersRoutes(app)
}