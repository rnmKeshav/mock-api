let path = require("path");

function getExtraHeader() {
  return {
    "X-API-TOKEN": "XXXXXXXX"
  };
}

let headers = {
  accept: "application/json",
  "content-type": "application/json",
  "accept-encoding": "gzip, deflate",
  "accept-language": "en,pt-BR;q=0.9,pt;q=0.8,id;q=0.7,en-US;q=0.6,la;q=0.5",
  cookie:
    "pelUUID=170dd064-ecd1-445e-816e-404b0217fb4a; client_id=1558523569; __uzma=e8c4e20b-e2f2-4695-bee4-8e5fc5ef7133; __uzmb=1561537084; appDownloadBanner=hide; _ga=GA1.3.36886130.1558456584; _gu=8da2ea58-f04d-4c40-b4f7-c1c6c72969b4; dx_csrf=m7KbEJWlDkwxY2OoIOFdP2MJFV8CwH88gDTEKSSJYvFyBIn9mpAKqKjsm6G2fdTH; _gw=2.u%5Bpracto_home_page%2Creferral%2C%2C%2Cpackages_section%5Dv%5B~fje8t%2C~0%2C~1%5Da(17298-124543889~7k4k); __uzmc=294111016853650; __uzmd=1566385097; _ga=GA1.2.183376863.1571225285; _fbp=fb.1.1571225400742.451317523; _gcl_au=1.1.282821363.1571225401; mp_85d643d7bc71611832663cd683666848_mixpanel=%7B%22distinct_id%22%3A%20%2216e1c68ce2b282-0584e1a8164bff-123b6a5a-fa000-16e1c68ce2c9a9%22%2C%22%24device_id%22%3A%20%2216e1c68ce2b282-0584e1a8164bff-123b6a5a-fa000-16e1c68ce2c9a9%22%2C%22user_account_id%22%3A%20%22173815%22%2C%22user_city%22%3A%20%22Bangalore%22%2C%22user_email%22%3A%20%22keshav.kumar%40practo.com%22%2C%22user_mobile%22%3A%20%22%2B919782929930%22%2C%22user_name%22%3A%20%22Keshav%20Kumar%22%2C%22mp_name_tag%22%3A%20%22%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww-latest.practo.com%2Fpartners%2Fprofile%3Fis_open%3Dtrue%22%2C%22%24initial_referring_domain%22%3A%20%22www-latest.practo.com%22%2C%22practice_id%22%3A%201111290%2C%22practice_name%22%3A%20%22practice%20nameq%22%7D; availability_pla_client_id=BB7F012C-52B8-3E67-3225-627ED0EEACA6; mp_cbdf6b23be7235b4389988aaa8ed0ada_mixpanel=%7B%22distinct_id%22%3A%20%2216e3f63f0834be-0483ebcb47aebf-1d3c6a5a-fa000-16e3f63f084821%22%2C%22%24device_id%22%3A%20%2216e3f63f0834be-0483ebcb47aebf-1d3c6a5a-fa000-16e3f63f084821%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww-latest.practo.com%2Fpartners%2Fprofile%3Fis_open%3Dtrue%22%2C%22%24initial_referring_domain%22%3A%20%22www-latest.practo.com%22%7D; mp_32682294086eb4c6582c358393c6764f_mixpanel=%7B%22distinct_id%22%3A%20%22173815%22%2C%22%24device_id%22%3A%20%2216e1c68b9579ba-01e56a7a86ccd4-123b6a5a-fa000-16e1c68b958afb%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww-latest.practo.com%2Fpartners%2Fprofile%3Fis_open%3Dtrue%22%2C%22%24initial_referring_domain%22%3A%20%22www-latest.practo.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22%24user_id%22%3A%20%22173815%22%7D; mp_0af2582aea04ca9f34ccb8d74ab0dc58_mixpanel=%7B%22distinct_id%22%3A%20%2216e3ba4c8cc2-0e66ee6b492337-264c346b-38400-16e3ba4c8cda89%22%2C%22%24device_id%22%3A%20%2216e3ba4c8cc2-0e66ee6b492337-264c346b-38400-16e3ba4c8cda89%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fdrive-latest.practo.com%2Flogin%22%2C%22%24initial_referring_domain%22%3A%20%22drive-latest.practo.com%22%7D; __insp_wid=2112016651; __insp_slim=1573627863452; __insp_nv=true; __insp_targlpu=aHR0cHM6Ly93d3ctbGF0ZXN0LnByYWN0by5jb20vcGx1cz91dG1fc291cmNlPXRvcGF6JnV0bV9tZWRpdW09d2Vi; __insp_targlpt=UHJhY3RvIFBsdXM%3D; __insp_norec_sess=true; dx_sessionid=5tvr311xx383xvt3h74t677zdm57s9nq; p_utm_tags=%7B%22utm_source%22%3A%22consumer-home%22%2C%22utm_medium%22%3A%22mweb%22%7D; sso=783caf8c-b387-4114-894b-b2dfe682262e; modal_login=true; _gid=GA1.2.681024303.1574059390; __cfduid=dcc154766c10d119cd020d505cae753481574068549; __cfruid=2ba93865d6a637735852d52483b1c0272fe94735-1574151015; _oauth2_proxy=ZW1haWw6a2VzaGF2Lmt1bWFyQHByYWN0by5jb20gdXNlcjprZXNoYXYua3VtYXJ8WGdqRFBrcHRIV0lWY09xdytmRmxqVWdoOXZ4MS9LUm9hdkFna2dpS2Z6S2FpNThGcmd2ZHNwbHYyY0UzcXpHazZVWlpIZUh2UXBDd21RWVB6NXpiUXV1ZmZtQlFXc2VxT3lRemE0M3ZKOE5VNTlBY3NsVDNTN0NhRHMxMWpndE0xSDY3WExQaWU2TjViQ29vSCtJOU5nZkNuVE91RGc1aFlmTnFUWGVBUkg2SnZjUDNiZllKYktuR041c0J6aXJUMEZaZ1BITWZBeXNqfDE1NzQxNjEwNTR8Y0VtZCttUVlpd3EwdElaMlBxUVVEazRnRnlXYk53QVpYQkpKK3JpQXRtL3IxcmlMUVIrSEtFdzlGWlc5bExobjROZ3Z6OFkwSTkxRm1Gc3plTjFVejh0ZXJ6ZnY5Rm4rOFJuTVd0Znk1Yjh2dmJsNTNzVXZMeGg2UzVaZWhwUEI3dnh4dzVUL0plMmV4dHpEMUhJd3dTMHM5MmtHdk5BPQ==|1574157454|M7FC7fSNb5DrRYX7o-A_ca9R2BE=; PHPSESSID=1b9km6j1e78hvkpdb7vjjuodr2; WZRK_G=31729b8992e94fa7bfaa4c48c2b17ffd; hl=en; p_attr_info=%7B%22session_referrer%22%3A%22Direct%22%2C%22landing_page%22%3A%22NULL%22%7D; visited_city=bangalore; __practo_sweep__id.ab61=07560345de44722e.1571225402.39.1574161674.1574158180.4b7f221b-11bd-4827-8765-176c55006fe9; lux_uid=157418195493669868; _gat=1; _gat_dchTracker=1; WZRK_S_8W6-695-WK5Z=%7B%22p%22%3A1%7D",
  referer: "https://www-latest.practo.com/tawang/doctor/jagadish-4-dentist-1/feedback",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
  "authority": "www-latest.practo.com"
};

module.exports = {
  port: 6001,
  routes_path: path.resolve(__dirname, "./routes.js"),
  forward: {
    mode: "custom", //all, custom, none
    hostname: "https://www-latest.practo.com",
    headers: Object.assign({}, headers, getExtraHeader())
  }
};
