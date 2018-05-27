# 发现无法 sub_filter subs_filter 正确替换，进行检查

经过不断加减命令，最后定位到需要增加这句命令：
```
proxy_set_header Cookie "PREF=ID=047808f19f6de346:U=0f62f33dd8549d11:FF=2:LD=en-US:NW=1:TM=1325338577:LM=1332142444:GM=1:SG=2:S=rE0SyJh2W1IQ-Maw";
```

还有 subs_filter 不能重复
