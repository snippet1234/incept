@servers(['incept' => ['tempssh@34.93.146.12']])

@task('deploy', ['on' => 'incept'])
    ls -la
    cd /var/www/incept.snippet.software/incept
    git pull https://leaphawk:MakeItLarge!7@github.com/leaphawk/incept
    php artisan migrate
@endtask