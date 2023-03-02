import postsRoutes from './posts.routes.js'
import usersRoutes from './users.routes.js'
import likesRoutes from './likes.routes.js'
import commentsRoutes from './comments.routes.js'

export default app => {
    // posts route
    postsRoutes(app)

    // users route
    usersRoutes(app)

    // likes route
    likesRoutes(app)

    // comments route
    commentsRoutes(app)
}