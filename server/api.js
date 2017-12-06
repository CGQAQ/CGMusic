/**
 * AUTHOR： CG
 * 使用请注明原作者及出处
 */
const request = require('request');
const netease = require('./netease');
const jsdom = require('jsdom');
const jquery = require('jquery');
const _ = require('lodash');


const enSec = obj => netease.params(JSON.stringify(obj));
const csr_token = '3579764fa6a57333a8f5429df08b7c70';          //不会变，亲测设置为null也能正常获取数据

/**
 * 根据输入的关键词  获得搜索建议
 * @param kw  关键词
 * @param limit 建议条数
 * @returns {Promise}
 */
function suggest(kw, limit="8") {
    const obj = {
        csrf_token: csr_token,
        limit: limit,
        s: kw
    };

    const params = enSec(obj);
    return new Promise((resolve, reject) => {
        request.post('https://music.163.com/weapi/search/suggest/web?csrf_token=', (err, res, body) => {
            if(err) return reject(err);
            resolve(body);
        }).form(params);
    });
}

/**
 * 根据输入的关键词   获取搜索结果
 * @param kw   关键词
 * @param limit  返回的结果条数
 * @param offset  相对于limit的页数
 * @returns {Promise}
 */
function search(kw, limit="30", offset="0") {
    const obj = {
        csrf_token: csr_token,
        total:"true",
        offset:offset,
        limit:limit,
        type:"1",
        s: kw
    };

    const params = enSec(obj);
    return new Promise((resolve, reject) => {
        request.post('https://music.163.com/weapi/cloudsearch/get/web?csrf_token=', (err, res, body) => {
            if(err) return reject(err);
            resolve(body);
        }).form(params);
    });
}

/**
 * 根据id获取歌曲详细信息
 * @param id  可选的  id字符串
 * @param idList  必填   [{id:""}]  JSON String
 * @returns {Promise}
 */
function details(idList, id = null) {
    const obj = {
        csrf_token: csr_token,
        c: idList,
        id: id
    };

    const params = enSec(obj);
    return new Promise((resolve, reject) => {
        request.post('https://music.163.com/weapi/v3/song/detail?csrf_token=', (err, res, body) => {
            if(err) return reject(err);
            resolve(body);
        }).form(params);
    });
}

/**
 * 根据id获取歌曲url
 * @param ids 要获取url的id
 * @param br  比特率  默认128000(128kBit)
 * @returns {Promise}
 */
function url(ids, br=128000) {
    const obj = {
        csrf_token: csr_token,
        ids: ids,
        br: br
    };

    const params = enSec(obj);
    return new Promise((resolve, reject) => {
        request.post('https://music.163.com/weapi/song/enhance/player/url?csrf_token=', (err, res, body) => {
            if(err) return reject(err);
            resolve(body);
        }).form(params);
    });
}

const typeMap = {
    'trending': '19723756',  //云音乐飙升榜
    'new': '3779629',        //云音乐新歌榜
    'original': '2884035',   //网易原创歌曲榜
    'hot': '3778678',        //云音乐热歌榜
    'global':{                 //全球媒体榜
        'electronic': '1978921795', //云音乐电音榜
        'hiphop': '991319590',      //云音乐嘻哈榜
        'newpower': '10520166',     //云音乐新电力榜
        'acg': '71385702',          //云音乐ACG音乐榜
        'classical': '71384707',    //云音乐古典音乐榜
        'uk': '180106',             //UK排行榜周榜
        'billboard': '60198',       //美国Billboard周榜
        'beatport': '3812895',      //Beatport全球电子舞曲榜
        'nrj': '27135204',          //法国 NRJ Vos Hits 周榜
        'ktv': '21845217',          //KTV唛榜
        'itunes': '11641012',       //iTunes榜
        'oricon': '60131',          //日本Oricon周榜
        'hitfm': '120001',          //Hit FM Top榜
        'hito': '112463',           //台湾Hito排行榜
        'cntopht': '112504',        //中国TOP排行榜（港台榜）
        'cntopm': '64016',          //中国TOP排行榜（内地榜）
        'rthk': '10169002',         //香港电台中文歌曲龙虎榜
        'cnhiphop': '1899724'       //中国嘻哈榜
    }
};

/**
 * 根据type获取歌曲排行榜
 * @param type typeMap key
 * @returns {Promise}
 */

function rankList(type) {
    if(type !== undefined){
        if(_.has(typeMap, type)){
            type = typeMap[type];
        }
        else if(_.has(typeMap.global, type)){
            type = typeMap.global[type];
        }else {
            return;
        }
    }


    return new Promise((resolve, reject) => {
        request.get(`http://music.163.com/discover/toplist?id=${type || typeMap.trending}`, (err, res, body) => {
            if (err) return reject(err);
            const $ = jquery(new jsdom.JSDOM(body).window);
            resolve($('div#song-list-pre-cache textarea')[0].innerHTML)
        }).setHeader('User-Agent', 'xxxx');
    });
}

module.exports = {
    suggest: suggest,
    search: search,
    details: details,
    url: url,
    typeMap: typeMap,
    rankList: rankList
};