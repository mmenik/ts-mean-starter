export const environment = {
    production: true,
    port: 3000,
    orm: {
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'mean-nest-starter',
        entities: ['dist/**/**.entity{.ts,.js}'],
        synchronize: false,
    },
    language: 'en',
    theme: 'dark',
};
