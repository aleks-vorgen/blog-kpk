### Create .env file from the example
```
cp .env.example .env
```

### Generate an application key
```
php artisan key:generate
```

### Install dependencies
```
composer install
```
```
npm install
```

### Run database migrations and seeders after configuring DB connection in .env to create tables and seed users with roles
```
php artisan migrate:fresh --seed
```

### Run Laravel and React dev servers
```
php artisan serve
```
```
npm run dev
```
