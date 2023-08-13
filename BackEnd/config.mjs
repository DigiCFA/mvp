export const {
    PORT = 5050,
    NODE_ENV = 'development',
    ATLAS_URI = "mongodb+srv://Admin:digicfa888@cluster0.ezd4j2a.mongodb.net/?retryWrites=true&w=majority",
    SESSION_NAME = 'sid',
    SESSION_SECRETE = 'session_secrete',
    SESSION_LIFETIME = 1000 * 60 * 60 * 2 //in milliseconds (ms)
} = process.env