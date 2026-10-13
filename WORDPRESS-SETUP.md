# Konfigurasi WordPress untuk REST API

## Langkah-langkah Setup WordPress

### 1. Aktifkan REST API

REST API sudah aktif secara default di WordPress 4.7+. Pastikan WordPress Anda versi terbaru.

### 2. Install Plugin (Opsional)

Untuk fitur tambahan, install plugin:
- **WP REST API Controller** - Untuk mengatur CORS dan endpoint
- **Better REST API Featured Images** - Untuk featured image yang lebih baik
- **Yoast SEO** - Untuk metadata SEO di API

### 3. Konfigurasi CORS

Tambahkan di `wp-config.php` atau buat plugin custom:

```php
<?php
// wp-content/mu-plugins/cors-config.php

add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        return $value;
    });
}, 15);
```

### 4. Test Endpoint

Cek apakah API berjalan dengan baik:

```bash
# Test posts endpoint
curl https://word.pradipta.dev/wp-json/wp/v2/posts

# Test single post
curl https://word.pradipta.dev/wp-json/wp/v2/posts?slug=post-slug

# Test categories
curl https://word.pradipta.dev/wp-json/wp/v2/categories

# Test search
curl https://word.pradipta.dev/wp-json/wp/v2/posts?search=keyword
```

### 5. Optimasi Performance

#### Cache dengan Plugin
- Install **WP Super Cache** atau **W3 Total Cache**
- Enable REST API caching

#### CDN untuk Images
- Gunakan CDN untuk deliver images lebih cepat
- Jetpack CDN (gratis) atau Cloudflare

#### Limit Request
Tambahkan di functions.php:

```php
// Limit posts per page
add_filter('rest_post_query', function($args, $request) {
    $max = 100;
    if (isset($args['posts_per_page']) && $args['posts_per_page'] > $max) {
        $args['posts_per_page'] = $max;
    }
    return $args;
}, 10, 2);
```

### 6. Custom Endpoint (Optional)

Buat custom endpoint untuk data tambahan:

```php
// wp-content/themes/your-theme/functions.php

add_action('rest_api_init', function() {
    register_rest_route('word/v1', '/featured-posts', array(
        'methods' => 'GET',
        'callback' => 'get_featured_posts',
        'permission_callback' => '__return_true'
    ));
});

function get_featured_posts() {
    $args = array(
        'posts_per_page' => 5,
        'meta_key' => 'featured',
        'meta_value' => '1',
    );
    
    $posts = get_posts($args);
    
    $data = array();
    foreach($posts as $post) {
        $data[] = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'slug' => $post->post_name,
            'excerpt' => $post->post_excerpt,
            'date' => $post->post_date,
            'featured_image' => get_the_post_thumbnail_url($post->ID, 'large'),
        );
    }
    
    return rest_ensure_response($data);
}
```

### 7. Security

#### Hide WordPress Version
```php
// functions.php
remove_action('wp_head', 'wp_generator');

add_filter('rest_endpoints', function($endpoints) {
    if (isset($endpoints['/wp/v2/users'])) {
        unset($endpoints['/wp/v2/users']);
    }
    if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
        unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
    }
    return $endpoints;
});
```

#### Rate Limiting
Install plugin **WP REST API Rate Limit**

### 8. Testing

Test API dengan tools:
- Postman
- Insomnia
- curl
- Browser DevTools

### 9. Monitoring

Monitor API performance:
- Query Monitor plugin
- New Relic
- Server logs

### 10. Troubleshooting

#### API tidak bisa diakses
- Check permalink settings (harus bukan Plain)
- Regenerate .htaccess
- Check server configuration

#### CORS Error
- Pastikan CORS header sudah ditambahkan
- Check browser console untuk error detail
- Test dengan curl untuk isolasi masalah

#### Featured Image tidak muncul
- Install plugin Better REST API Featured Images
- Atau tambahkan di functions.php:

```php
add_action('rest_api_init', function() {
    register_rest_field('post', 'featured_image_url', array(
        'get_callback' => function($post) {
            return get_the_post_thumbnail_url($post['id'], 'large');
        },
        'schema' => null,
    ));
});
```

## Endpoint yang Digunakan Frontend

1. **GET /wp-json/wp/v2/posts** - List posts dengan pagination
2. **GET /wp-json/wp/v2/posts?slug={slug}** - Single post by slug
3. **GET /wp-json/wp/v2/posts?search={query}** - Search posts
4. **GET /wp-json/wp/v2/categories** - List categories
5. **GET /wp-json/wp/v2/tags** - List tags

## Response Format

Response sudah otomatis include `_embed` untuk:
- Featured media (images)
- Author info
- Categories & tags

Contoh request:
```bash
curl "https://word.pradipta.dev/wp-json/wp/v2/posts?_embed&per_page=6&page=1"
```
