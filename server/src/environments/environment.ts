export const environment = {
    production: false,
    port: 3000,
    orm: {
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'mean-nest-starter',
        entities: ['server/src/**/**.entity{.ts,.js}'],
        synchronize: true,
    },
    language: 'it',
    theme: 'dark',
};
