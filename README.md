# upupming Mirror v0.01

Self-hosted mirror(Hosted at https://mirror.upupming.site) websites for Google and Chinese Wikipedia, keeping *to organize the world's information and make it universally accessible and useful* in mind. 

+ Google
    - [Google Search][1]
    - [Google Scholar][2]
    - [Google Maps][3]
    - [Google Translate][4]
    - [Google Docs][5]
    - [Google Codejam][8]
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
    --with-http_realip_module
```

### Configuration Nginx

My configuration file `/usr/local/nginx/conf/nginx.conf`:


<details>
<summary>nginx.conf(click to expand/collapse)</summary>
<p>

```nginx
worker_processes  auto;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # don't accept gzip
    proxy_set_header Accept-Encoding ""; 
    proxy_set_header User-Agent $http_user_agent;

    proxy_redirect https://zh.m.wikipedia.org/ https://mwiki.upupming.site/;
    proxy_redirect https://zh.wikipedia.org/ https://wiki.upupming.site/;

    # substitute all mimeTypes
    subs_filter_types *;

    # wikipedia replacement
    subs_filter zh.wikipedia.org wiki.upupming.site;
    subs_filter zh.m.wikipedia.org mwiki.upupming.site;
    subs_filter upload.wikimedia.org upwiki.upupming.site;

    # google replacements
    subs_filter www.google.com google.upupming.site;
    subs_filter google.com google.upupming.site;
    subs_filter google.cn google.upupming.site;
    subs_filter ipv4.google.com ipv4.google.upupming.site;
    subs_filter scholar.google.com scholar.google.upupming.site;
    subs_filter maps.google.com maps.google.upupming.site;
    subs_filter photos.google.com photos.google.upupming.site;
    subs_filter translate.google.com translate.google.upupming.site;
    subs_filter docs.google.com docs.google.upupming.site;

    # add my styles
    subs_filter <head> '<head><link rel="stylesheet" type="text/css" href="https://mirror.upupming.site/css/new-age.min.css"><link href="https://mirror.upupming.site/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"><link href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css?version=1.5.1" rel="stylesheet">';

    # add a footer
    subs_filter </body> '<footer style="background-color:white">
          <div class="container font-kai" id="about" style="background-color:white">
            <p style="color:black"><a href="https://mirror.upupming.site/">所有镜像站点</a>在<a href="https://wiki.upupming.site/zh-cn/Wikipedia%3ACC_BY-SA_3.0协议文本">知识共享 署名-相同方式共享 3.0协议</a>之条款下提供</p>
            <ul class="list-inline">
              <li class="list-inline-item">
                <a href="https://upupming.site" style="color:#4ba8e9">Blog</a>
              </li>
              <li class="list-inline-item">
                <a href="https://github.com/upupming/" style="color:#4ba8e9">GitHub</a>
              </li>
              <li class="list-inline-item">
                <a href="mailto:upupming@gmail.com" style="color:#4ba8e9"">E-mail</a>
              </li>
            </ul>
            <div class="busuanzi" style="color:black"><script async="" src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script><span id="busuanzi_container_site_uv" style="display: inline;"><i class="fa fa-user"></i><span id="busuanzi_value_site_uv"></span><span></span></span><span class="footer-separator">|</span><span id="busuanzi_container_site_pv" style="display: inline;"><i class="fa fa-eye"></i><span id="busuanzi_value_site_pv"></span><span></span></span></div>
          </div>
        </footer></body>';

    # cookie replacement
    # Keep away from "Cookie coming from google.upupming.site attempted to set domain to google.com" error
    proxy_cookie_domain zh.wikipedia.org wiki.upupming.site;
    proxy_cookie_domain zh.m.wikipedia.org m.wiki.upupming.site;
    proxy_cookie_domain upload.wikimedia.org upwiki.upupming.site;
    proxy_cookie_domain www.google.com google.upupming.site;
    proxy_cookie_domain google.com google.upupming.site;
    proxy_cookie_domain ipv6.google.com google.upupming.site;
    proxy_cookie_domain ipv4.google.com ipv4.google.upupming.site;
    proxy_cookie_domain maps.google.com maps.google.upupming.site;
    proxy_cookie_domain code.google.com code.google.upupming.site;
    proxy_cookie_domain translate.google.com translate.google.upupming.site;
    proxy_cookie_domain docs.google.com docs.google.upupming.site;
    proxy_cookie_domain photos.google.com photos.google.upupming.site;
    proxy_cookie_domain scholar.google.com scholar.google.upupming.site;
    proxy_cookie_domain accounts.google.com accounts.google.upupming.site;

    # nginx doesn't cache anything, client sync with server proxied
    proxy_buffering off;

    ##### Wikipedia desktop
    server {
	    server_name wiki.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
	    server_name wiki.upupming.site;
	    listen 443 ssl;

        ssl on;
        ssl_certificate      /etc/letsencrypt/live/wiki.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/wiki.upupming.site/privkey.pem;

	    location / {
		    proxy_pass https://zh.wikipedia.org;
	    }
    }

    ##### Wikipedia mobile
    server {
	    server_name mwiki.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
	    server_name mwiki.upupming.site;
	    listen 443 ssl;

        ssl on;
        ssl_certificate      /etc/letsencrypt/live/mwiki.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/mwiki.upupming.site/privkey.pem;

	    location / {
		    proxy_pass https://zh.m.wikipedia.org;
            subs_filter <head> '<head>';
            subs_filter </body> '</body>';
            subs_filter '桌面版</a></li>' '桌面版</a></li>
              <li>
                <a href="https://mirror.upupming.site">Mirror</a>
              </li>
              <li>
                <a href="https://upupming.site">Blog</a>
              </li>
              <li>
                <a href="https://github.com/upupming/">GitHub</a>
              </li>
              <li>
                <a href="mailto:upupming@gmail.com">E-mail</a>
              </li>';
	    }

    }
    ##### Wikipedia upload
    server {
	    server_name upwiki.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
	    server_name upwiki.upupming.site;
	    listen 443 ssl;

        ssl on;
        ssl_certificate      /etc/letsencrypt/live/upwiki.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/upwiki.upupming.site/privkey.pem;
        
        location / {
            proxy_pass https://upload.wikimedia.org;
	    }
    }


    ##### Google search(using ipv6)
    server {
	    server_name google.upupming.site;
        listen 80;	
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443;
        server_name google.upupming.site;

        ssl on;
        ssl_certificate      /etc/letsencrypt/live/google.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/google.upupming.site/privkey.pem;

        location / {
            proxy_pass https://ipv6.google.com;
        }        

        location /maps {
            proxy_pass https://www.google.com/maps;
        }

        # If subs_filters doesn't work or you don't want to use subs_filters(just a demonstration, no need here)
        # So using redirect urls
        location https://zh.m.wikipedia.org/{
            rewrite ^/(.*) https://mwiki.upupming.site/$1 permanent;
        }
        location https://zh.wikipedia.org/{
            rewrite ^/(.*) https://wiki.upupming.site/$1 permanent;
        }
        location https://google.com/{
            rewrite ^/(.*) https://google.upupming.site/$1 permanent;
        }
        location https://www.google.com/{
            rewrite ^/(.*) https://google.upupming.site/$1 permanent;
        }
        location https://scholar.google.com/{
            rewrite ^/(.*) https://scholar.google.upupming.site/$1 permanent;
        }
        location https://maps.google.com/{
            rewrite ^/(.*) https://scholar.google.upupming.site/$1 permanent;
        }
        location https://translate.google.com/{
            rewrite ^/(.*) https://translate.google.upupming.site/$1 permanent;
        }
        location https://photos.google.com/{
            rewrite ^/(.*) https://photos.google.upupming.site/$1 permanent;
        }
        location https://docs.google.com/{
            rewrite ^/(.*) https://docs.google.upupming.site/$1 permanent;
        }
        location https://code.google.com/{
            rewrite ^/(.*) https://code.google.upupming.site/$1 permanent;
        }
    }
    ##### Google ipv4
    server {
	    server_name ipv4.google.upupming.site;
        listen 80;	
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443;
        server_name ipv4.google.upupming.site;

        ssl on;
        ssl_certificate      /etc/letsencrypt/live/ipv4.google.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/ipv4.google.upupming.site/privkey.pem;

        location / {
            proxy_pass https://ipv4.google.com;
        }

        location /maps {
            proxy_pass https://www.google.com/maps;
        }        
    }

    ##### Google scholar
    server {
	    server_name scholar.google.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443 ssl;
        server_name scholar.google.upupming.site;

        ssl on;
        ssl_certificate      /etc/letsencrypt/live/scholar.google.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/scholar.google.upupming.site/privkey.pem;

        location / {
            proxy_pass https://scholar.google.com;
        }
    }

    ##### Google accounts
    server {
	    server_name accounts.google.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443 ssl;
        server_name accounts.google.upupming.site;

        ssl on;
        ssl_certificate      /etc/letsencrypt/live/accounts.google.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/accounts.google.upupming.site/privkey.pem;

        location / {
            proxy_pass https://accounts.google.com;
        }
    }


    ##### Google maps
    server {
	    server_name maps.google.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443 ssl;
        server_name maps.google.upupming.site;

        ssl on;
        ssl_certificate      /etc/letsencrypt/live/maps.google.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/maps.google.upupming.site/privkey.pem;

        location / {
            return 301 https://google.upupming.site/maps;
        }
    }

    ##### Google Translate
    server {
	    server_name translate.google.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443 ssl;
        server_name translate.google.upupming.site;

        ssl on;
        ssl_certificate /etc/letsencrypt/live/translate.google.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/translate.google.upupming.site/privkey.pem;

        location / {
            proxy_pass https://translate.google.com;
        }
    }

    ##### Google Photos
    server {
	    server_name photos.google.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443 ssl;
        server_name photos.google.upupming.site;

        ssl on;
        ssl_certificate /etc/letsencrypt/live/photos.google.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/photos.google.upupming.site/privkey.pem;

        location / {
            proxy_pass https://photos.google.com;
        }
    }

    ##### Google Docs
    server {
	    server_name docs.google.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443 ssl;
        server_name docs.google.upupming.site;

        ssl on;
        ssl_certificate /etc/letsencrypt/live/docs.google.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/docs.google.upupming.site/privkey.pem;

        location / {
            proxy_pass https://docs.google.com;
        }
    }

    ##### Google Code
    server {
	    server_name code.google.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443 ssl;
        server_name code.google.upupming.site;

        ssl on;
        ssl_certificate /etc/letsencrypt/live/code.google.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/code.google.upupming.site/privkey.pem;

        location / {
            proxy_pass https://code.google.com;
        }
        location /codejam/ {
            proxy_pass https://code.google.com/codejam/;
        }
    }

    ##### upupming Mirror
    server {
	    server_name mirror.upupming.site;
	    listen 80;
        return 301 https://$server_name$request_uri;
    }
    server {
        listen 443 ssl;
        server_name mirror.upupming.site;

        ssl on;
        ssl_certificate /etc/letsencrypt/live/mirror.upupming.site/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/mirror.upupming.site/privkey.pem;

        location / {
            root /home/wwwroot/Mirror;
            index index.html index.htm;
        }
    }
}
```
</p>
</details>

### Start Nginx server

```
nginx
```

