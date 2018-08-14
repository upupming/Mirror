# upupming Mirror v0.01

Self-hosted mirror(Hosted at https://mirror.upupming.site) websites for Google and Chinese Wikipedia, keeping *to organize the world's information and make it universally accessible and useful* in mind. 

+ Google
    - [Google Search][1]
      - AMP is too difficult to supported. If you see an AMP page, please request desktop site.
    - [Google Scholar][2]
    - [Google Maps][3]
    - [Google Translate][4]
    - [Google Docs][5]
    - [Google Codejam][8]
    - All other subdomains of google.com
+ Chinese Wikipedia
    - [Chinese Wikipedia Desktop][7]
    - [Chinese Wikipedia Mobile][6]

[1]:https://google.upupming.site/
[2]:https://scholar.google.upupming.site/
[3]:https://maps.google.upupming.site
[4]:https://translate.google.upupming.site/
[5]:https://docs.google.upupming.site
[6]:https://mwiki.upupming.site/w/index.php?title=Wikipedia:%E9%A6%96%E9%A1%B5&mobileaction=toggle_view_mobile
[7]:https://wiki.upupming.site/w/index.php?title=Wikipedia:%E9%A6%96%E9%A1%B5&mobileaction=toggle_view_desktop
[8]:https://code.google.upupming.site/codejam/


## Edit this site

Fork this repository, and then follow the [README](./new-age-README.md) of new age theme.

## SSL certificate 

Using certbot to get Let's encrypt SSL certificate.

See https://github.com/certbot/certbot

All in one certificate: 

```
./certbot-auto certonly --agree-tos --manual \
-d *.upupming.site \
-d *.google.upupming.site \
-d *.blog.upupming.site \
-d *.git.upupming.site \
-d  *.gstatic.upupming.site
```

Individual certificates:
```
./certbot-auto certonly --agree-tos -t --standalone -d <domain-name>
```

## Nginx configuration

### compile Nginx from source with necessary modules

**Download the source and configure**

https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/#sources_download
https://nginx.org/en/docs/configure.html 

**ngx_http_substitutions_filter_module**

`subs_filter` is used for substitute string A to string B, and regular expressions are supported compared to `sub_filter`.

See https://github.com/yaoweibin/ngx_http_substitutions_filter_module

**My configuration parameters**:
```
./configure \
    --user=www \
    --group=www \
    --prefix=/usr/local/nginx \
    --with-http_stub_status_module \
    --with-http_ssl_module \
    --with-http_gzip_static_module \
    --with-http_sub_module \
    --with-http_ssl_module \
    --add-module=/root/ngx_http_substitutions_filter_module \
    --with-pcre=../pcre-8.42
```

### Nginx Configuration

My configuration file [/usr/local/nginx/conf/nginx.conf](./nginx.conf).


### Start Nginx server

```
nginx
```

