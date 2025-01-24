// localhost
// export const corsOptions = {
//     origin: 'http://localhost:5173', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//     allowedHeaders: ['Content-Type']
// }

// vercel
export const corsOptions = {
    origin: 'https://copy-trello-frontend.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type']
}