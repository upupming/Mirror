# upupming Mirror v0.0.2

> Note: if you have a server and want to implement something like [subs_filter](https://www.nginx.com/resources/wiki/modules/substitutions/) (eg. replace all `google.com` to `google.upupming.site` in web pages.), please consider using [v0.0.1](https://github.com/upupming/Mirror/tree/master). v0.0.1 can also proxy all subdomains of Google, it will be useful if you are a heavy Google user.

Using [now.sh](https://zeit.co/) to proxy mirror websites for Google and Chinese Wikipedia, keeping _to organize the world's information and make it universally accessible and useful_ in mind.

- Google
  - [Google Search][1]
    - AMP is too difficult to support. If you see an AMP page, please request desktop site.
  - [Google Scholar][2]
  - [Google Maps][3]
  - [Google Translate][4]
  - [Google Docs][5]
  - [Google Drive](https://drive.google.upupming.site/)
  - [Google Codejam][8]
  <!-- - All other subdomains of google.com -->
- Chinese Wikipedia
  - [Chinese Wikipedia Desktop][7]
  - [Chinese Wikipedia Mobile][6]

[1]: https://google.upupming.site/
[2]: https://scholar.google.upupming.site/
[3]: https://maps.google.upupming.site
[4]: https://translate.google.upupming.site/
[5]: https://docs.google.upupming.site
[6]: https://mwiki.upupming.site/w/index.php?title=Wikipedia:%E9%A6%96%E9%A1%B5&mobileaction=toggle_view_mobile
[7]: https://wiki.upupming.site/w/index.php?title=Wikipedia:%E9%A6%96%E9%A1%B5&mobileaction=toggle_view_desktop
[8]: https://code.google.upupming.site/codejam/

## How to use

1. Clone this repo and edit [config.js](config.js) for your proxying configuration.

    ```js
    {
      "mirrors": [
        {
          // project name for now.sh
          "key": "google",
          "proxied": "https://www.google.com/",
          "proxying": "google.upupming.site"
        }
      ]
    }
    ```

2. Install [now cli](https://zeit.co/download#now-cli) and login.
3. Properly configure your custom domain according to [Aliasing a Deployment](https://zeit.co/docs/v2/domains-and-aliases/aliasing-a-deployment/).
4. Run `npm i` and then `npm run deploy`.

See the following log for example:

<details>
<summary>Sample log of <code>upupming Mirror</code></summary>

```txt
Making mirror google
Making mirror wiki
Making mirror mwiki
Folder wiki created
Folder wiki configured
Deploying wiki to now
now.sh: 
> Deploying D:\github\mirror\wiki under upupming
> Using project wiki
> Ready! Aliases assigned [2s]
- https://wiki.upupming.site
- https://wiki.upupming.now.sh

now.sh: 
https://wiki-k5m0g45nr.now.sh
Folder google created
Folder google configured
Deploying google to now
now.sh: 
> Deploying D:\github\mirror\google under upupming
> Using project google
> Ready! Aliases assigned [2s]
- https://google.upupming.site
- https://google.upupming.now.sh

now.sh: 
https://google-hnostj6ze.now.sh
Folder mwiki created
Folder mwiki configured
Deploying mwiki to now
now.sh: 
> Deploying D:\github\mirror\mwiki under upupming
> Using project mwiki
> Ready! Aliases assigned [2s]
- https://mwiki.upupming.site
- https://mwiki.upupming.now.sh

now.sh: 
https://mwiki-agtv54c4l.now.sh
D:\github\mirror\wiki cleaned up
D:\github\mirror\google cleaned up
D:\github\mirror\mwiki cleaned up
```

</details>
