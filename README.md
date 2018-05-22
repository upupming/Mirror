# upupming Mirror v0.01

Hosted at https://mirror.upupming.site

## Edit this site

Follow the [README](./new-age.README.md) of new age theme.

## Nginx configuration

### compile Nginx from source with necessary modules

See http://nginx.org/en/docs/configure.html

> ./configure --user=www --group=www --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_gzip_static_module --with-ipv6 --with-http_sub_module --with-http_ssl_module --add-module=/root/ngx_http_substitutions_filter_module --with-http_realip_module

### Configuration Nginx

My configuration file `/usr/local/nginx/conf/nginx.conf`:

```nginx

#user  nobody;
worker_processes  auto;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
#		if ($http_user_agent ~* "qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Feedfetcher-Google|Yahoo! Slurp|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot|ia_archiver|Tomato Bot"){
#			return 403;
#		}


proxy_set_header X-Forwarded-Proto $scheme;
# proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Real-IP 8.8.8.8;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Accept-Encoding ''; 
proxy_set_header User-Agent $http_user_agent;

proxy_redirect https://zh.m.wikipedia.org/ https://mwiki.upupming.site/;
proxy_redirect https://zh.wikipedia.org/ https://wiki.upupming.site/;

# 参与替换文件的 mimeType
subs_filter_types text/css text/xml text/javascript application/javascript application/json text/php;
# 将网页内的 A字符串 转为 B字符串
subs_filter zh.wikipedia.org wiki.upupming.site;
subs_filter zh.m.wikipedia.org mwiki.upupming.site;
subs_filter upload.wikimedia.org upwiki.upupming.site;
# 谷歌替换
sub_filter ipv4.google.com ipv4.google.upupming.site;
sub_filter www.google.com google.upupming.site;
sub_filter google.com google.upupming.site;
sub_filter google.cn google.upupming.site;
sub_filter scholar.google.com scholar.google.upupming.site;
sub_filter maps.google.com maps.google.upupming.site;
sub_filter photos.google.com photos.google.upupming.site;
sub_filter maps.google.com maps.google.upupming.site;
sub_filter translate.google.com translate.google.upupming.site;
sub_filter docs.google.com docs.google.upupming.site;
sub_filter <head> '<head><link rel="stylesheet" type="text/css" href="https://mirror.upupming.site/css/new-age.min.css"><link href="https://mirror.upupming.site/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"><link href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css?version=1.5.1" rel="stylesheet">';
sub_filter </body> '<footer style="background-color:white">
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
sub_filter_once off;

# cookie 替换
proxy_cookie_domain zh.wikipedia.org wiki.upupming.site;
proxy_cookie_domain zh.m.wikipedia.org m.wiki.upupming.site;
proxy_cookie_domain upload.wikimedia.org upwiki.upupming.site;
proxy_cookie_domain www.google.com google.upupming.site;
proxy_cookie_domain ipv4.google.com ipv4.google.upupming.site;

# nginx 不缓存，客户端与被代理网站保持同步
proxy_buffering off;

##### 维基百科
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

##### 维基百科手机版
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

        sub_filter <head> '<head>';
        sub_filter </body> '</body>';
        sub_filter '桌面版</a></li>' '桌面版</a></li>
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
##### 维基百科图片
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


##### Google 搜索
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
        proxy_pass https://www.google.com;
    }
}
##### Google ipv4
server {
	server_name ipv4.google.upupming.site;
	listen 80;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl;
    server_name ipv4.google.upupming.site;

    ssl on;
    ssl_certificate      /etc/letsencrypt/live/ipv4.google.upupming.site/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/ipv4.google.upupming.site/privkey.pem;

    location / {
        proxy_pass https://ipv4.google.com;
    }
}
##### Google 账户
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

##### Google 学术
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

##### Google 地图
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

##### Google 相册
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

##### Google 翻译
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

### Start Nginx server

> nginx -s reopen


