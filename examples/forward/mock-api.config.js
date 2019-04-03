let path = require("path");

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
    "__uzma=bfe0cdbf-f735-4168-923f-6047b9bd7e0d; __uzmb=1548834992; pelUUID=c8923d1d-61d5-4544-bc9c-dea9b6477d37; _gu=76a5953c-de35-4132-b9e0-4fe522851edc; __cfduid=d211bfed8c34b767d620cdb77288068eb1548850201; _oauth2_proxy=ZW1haWw6a2VzaGF2Lmt1bWFyQHByYWN0by5jb20gdXNlcjp8ZFdNOWhuZmJuVDl4c3FsUHZLOXNlRUhrVTJsTlVvZXVReDZoMXBZVGtPQnVCWGQyN1pNQS95WTVxY2JzbFZKdnBIUHpkZCsveDhvNFdGQTZ0ZHZYUlJIak0yOG4xZlpqWDRnSnpyWC9rbTFFUnkrWjM5MXRCWjJhVU9QdzcrQ1o5TzA3aGw3aThNSkJEMU5NK1VXK0ZhRkZOd3REQVFBeDByZlJDby9NeVBlMUdnNmFyKzlLMTJDbGZSczNGdmNKVlE9PXwxNTQ4ODU1NzI1fC9NcE05QnRnWU44blF2bFVudXJsU25aNlZOcUR2SjY2RkM2RVllYlozVFJOQlZ3NDFNbG90NFBGT1pKOVhINXUwY0Y5dnhVSzZoYWZRQXNuUFE9PQ==|1548852125|6C8nKF_DEil_BeWuiHCdUDLzeP8=; _ga=GA1.2.654696754.1548852128; sso=783caf8c-b387-4114-894b-b2dfe682262e; modal_login=true; cto_lwid=83a8bfa6-fbfc-47b0-b51a-699c721c34de; client_id=1548852292; availability_pla_client_id=29840564-726C-9A22-6127-26D215B61A51; mp_85d643d7bc71611832663cd683666848_mixpanel=%7B%22distinct_id%22%3A%20%22168a3dd7724583-009fccd3b3e068-10346654-fa000-168a3dd772537b%22%2C%22%24device_id%22%3A%20%22168a3dd7724583-009fccd3b3e068-10346654-fa000-168a3dd772537b%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; __lc.visitor_id.1060502=S1536753919.da4ec8304d; mp_cbdf6b23be7235b4389988aaa8ed0ada_mixpanel=%7B%22distinct_id%22%3A%20%22168a87e42c528b-0a3d77466a6ed5-10346654-fa000-168a87e42c652a%22%2C%22%24device_id%22%3A%20%22168a87e42c528b-0a3d77466a6ed5-10346654-fa000-168a87e42c652a%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww-latest.practo.com%2Fpartners%2Fprofile%3Fis_open%3Dtrue%22%2C%22%24initial_referring_domain%22%3A%20%22www-latest.practo.com%22%7D; __insp_wid=850696590; __insp_slim=1549015073874; __insp_nv=true; __insp_targlpu=aHR0cHM6Ly93d3ctbGF0ZXN0LnByYWN0by5jb20vcGFydG5lcnMvZG9jdG9yLzU1NDY0My9lZGl0; __insp_targlpt=UHJhY3RvIFByb2ZpbGUgZm9yIERyLiBLZXNoYXYgS3VtYXI%3D; mp_32682294086eb4c6582c358393c6764f_mixpanel=%7B%22distinct_id%22%3A%20%22173815%22%2C%22%24device_id%22%3A%20%22168a87e2b585ea-0149339b2c93ab-10346654-fa000-168a87e2b5964e%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww-latest.practo.com%2Fpartners%2Fprofile%3Fis_open%3Dtrue%22%2C%22%24initial_referring_domain%22%3A%20%22www-latest.practo.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22%24user_id%22%3A%20%22173815%22%7D; __insp_norec_sess=true; mp_0af2582aea04ca9f34ccb8d74ab0dc58_mixpanel=%7B%22distinct_id%22%3A%20%22168a90ae0ce1e0-0d587f340084b7-32426173-38400-168a90ae0cf2f%22%2C%22%24device_id%22%3A%20%22168a90ae0ce1e0-0d587f340084b7-32426173-38400-168a90ae0cf2f%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.practo.com%2Ftawang%2Fclinic%2Flal1-eye1-clinic1%2Ffeedback%22%2C%22%24initial_referring_domain%22%3A%20%22www.practo.com%22%7D; _gid=GA1.2.655889762.1549208004; _fbp=fb.1.1549208018418.200400303; pr_ng_ch=1; visited_city=bangalore; _gw=2.u%5B%2C%2C%2C%2C%5Dv%5B~fdg89%2C~3%2C~1%5Da(16566-117110921~80du); lux_uid=154934739769273019; WZRK_G=eefa28629e1c44f6ad34a7a4227f0baf; PHPSESSID=cglgrldb1c9bh2luf2saprppv0; hl=en; landing_page=DoctorProfilePage; ecEnabled=yes; __practo_sweep__ses.ab61=*; __practo_sweep__id.ab61=7f17920b10bde175.1548852293.18.1549347958.1549310666.a2b405ec-9a33-4446-9ff3-badbc23c08ff; _gat=1; __uzmc=79156106079853; uzdbm_a=f106c3dd-2bc6-37d2-4940-51df5f447dd8; __uzmd=1549348211; WZRK_S_8W6-695-WK5Z=%7B%22p%22%3A6%2C%22s%22%3A1549347399%2C%22t%22%3A1549348213%7D",
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
