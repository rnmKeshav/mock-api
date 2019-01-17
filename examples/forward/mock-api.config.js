function getExtraHeader() {
  return {
    "X-API-TOKEN": "XXXXXXXX"
  };
}

let headers = {
  accept: "application/json",
  "content-type": "application/json",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "en,pt-BR;q=0.9,pt;q=0.8,id;q=0.7,en-US;q=0.6,la;q=0.5",
  cookie:
    "__uzma=251272e9-728f-4ca6-9ef3-af7441373a82; __uzmb=1536753867; dynamic_card_merging_client_id=2ECCCCD7-C221-0513-889C-F01E83D21F40; pelUUID=86ca39a5-f6a7-4cfc-9a71-d50bfdbd39c4; client_id=1540879442; _gu=cf4c37ac-fd75-4208-862d-29a979c67e05; _gw=2.u%5B%2C%2C%2C%2C%5Dv%5B~fcf05%2C~0%2C~1%5Da(); default_featured_filter_client_id=25217DAD-2E18-AEA4-B816-6492D1889DD5; hl=en; __lc.visitor_id.1060502=S1536753919.da4ec8304d; __cfduid=d2f04c6fee649dba09362b01f0c3738631547031857; _ga=GA1.2.282590695.1547031859; sso=783caf8c-b387-4114-894b-b2dfe682262e; modal_login=true; fabric_auth_token=2a9fbfc63088ad1add2e15b9deff316969d8c97e; cto_lwid=f890b6cc-1a5d-4520-8c12-29211951a935; _gid=GA1.2.201200972.1547531981; PHPSESSID=cklhoqhevr94e9sutidgmqige3; visited_city=tawang; mp_32682294086eb4c6582c358393c6764f_mixpanel=%7B%22distinct_id%22%3A%20%221685a679e6e613-00a74698b8ea96-10346654-fa000-1685a679e6f4d1%22%2C%22%24device_id%22%3A%20%221685a679e6e613-00a74698b8ea96-10346654-fa000-1685a679e6f4d1%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.practo.com%2Fpartners%2Fprofile%3Fis_open%3Dtrue%22%2C%22%24initial_referring_domain%22%3A%20%22www.practo.com%22%7D; WZRK_G=2db3c7e3aacf467d9441194ba73e9fa8; pr_ng_ch=1; pelUUID=1685a8c128158f-09f66aa361cd0c-10346654-fa000-1685a8c128258a; practo_mixpanel_distinct_id=1685a8c1293ec-0b8d01bc8f27ab-10346654-fa000-1685a8c12944d5; mp_85d643d7bc71611832663cd683666848_mixpanel=%7B%22distinct_id%22%3A%20%2215cab08046e45c-0112d470058c3e-621b1f3f-38400-15cab08046f401%22%2C%22%24device_id%22%3A%20%22168324f42527bd-056cd0e3026342-10346654-fa000-168324f4253811%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Faccounts-latest.practo.com%2Fverify_totp%3Fnext%3D%252Fcheckid_request%26intent%3Depicenter%26remember%3DTrue%26view_type%3Dnormal%22%2C%22%24initial_referring_domain%22%3A%20%22accounts-latest.practo.com%22%2C%22%24user_id%22%3A%20%2215cab08046e45c-0112d470058c3e-621b1f3f-38400-15cab08046f401%22%7D; __practo_sweep__ses.ab61=*; mp_0af2582aea04ca9f34ccb8d74ab0dc58_mixpanel=%7B%22distinct_id%22%3A%20173815%2C%22%24device_id%22%3A%20%221685a8c1293ec-0b8d01bc8f27ab-10346654-fa000-1685a8c12944d5%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww-latest.practo.com%2Ftawang%2Fdoctor%2Fjagadish-4-dentist-1%2Ffeedback%22%2C%22%24initial_referring_domain%22%3A%20%22www-latest.practo.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22%24user_id%22%3A%20173815%7D; lux_uid=154771885471876212; _fbp=fb.1.1547718854890.1936761539; __practo_sweep__id.ab61=5a4abd2beadb44dc.1547032282.16.1547718856.1547714199.19455354-288f-4a46-bda8-c0a4aa026c1f; __uzmc=252581088229245; uzdbm_a=ba052a26-2bc6-1825-5b4e-6c96cb53b4fd; __uzmd=1547719297; _gat=1; WZRK_S_8W6-695-WK5Z=%7B%22p%22%3A3%2C%22s%22%3A1547718843%2C%22t%22%3A1547719300%7D",
  referer: "https://www-latest.practo.com/tawang/doctor/jagadish-4-dentist-1/feedback",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
  "authority": "www-latest.practo.com"
};

module.exports = {
  port: 6001,
  routes_path: "./routes.js",
  forward: {
    mode: "custom", //all, custom, none
    hostname: "https://www-latest.practo.com",
    headers: Object.assign({}, headers, getExtraHeader())
  }
};
