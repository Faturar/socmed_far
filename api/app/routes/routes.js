import postsRoutes from './posts.routes.js'
import usersRoutes from './users.routes.js'
import likesRoutes from './likes.routes.js'
import commentsRoutes from './comments.routes.js'
import notificationRoutes from './notifications.routes.js'
import authRoutes from './auth.routes.js'

export default (app) => {
    const routes = [
        postsRoutes,
        usersRoutes,
        likesRoutes,
        commentsRoutes,
        notificationRoutes,
        authRoutes
    ];

    for (const route of routes) {
        route(app);
    }
}