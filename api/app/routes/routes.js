import postsRoutes from './posts.routes.js'
import usersRoutes from './users.routes.js'
import likesRoutes from './likes.routes.js'
import commentsRoutes from './comments.routes.js'
import notificationRoutes from './notifications.routes.js'
import authRoutes from './auth.routes.js'

export default app => {
    // posts route
    postsRoutes(app)

    // users route
    usersRoutes(app)

    // likes route
    likesRoutes(app)

    // comments route
    commentsRoutes(app)

    // Notif route
    notificationRoutes(app)

    // Notif route
    authRoutes(app)
}