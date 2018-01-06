const Router = require('express').Router;
const api = require('./api');
const _ = require('lodash');


const router = new Router();

router.get('/api', (req, res) => {
    res.setHeader("content-type", "text/html;charset=UTF-8");
    res.end(`
<h1>Author: CG 转载使用请注明原作者和出处！</h1>
<h2>/api/suggest：根据输入的关键词  获得搜索建议</h2>
<h2>/api/search： 根据输入的关键词   获取搜索结果</h2>
<h2>/api/details： 根据id获取歌曲详细信息</h2>
<h2>/api/url： 根据id获取歌曲url</h2>
<h2>/api/rank： 根据type获取歌曲排行榜</h2>
<h2 style="background: greenyellow">更详细的API说明，请以GET请求的方式请求想要知道使用方法的API（或用浏览器直接打开）e.g.: <a href="/api/suggest" target="_blank">/api/suggest</a></h2>`)
});

router.get('/api/suggest', (req, res) => {
   res.set("content-type", "text/html;charset=UTF-8");
   res.end(`
   /**<br/>
 * 根据输入的关键词  获得搜索建议<br/>
 * @param kw  关键词<br/>
 * @param limit 建议条数<br/>
 * @type POST<br/>
 */
   `);
});
router.post('/api/suggest', async (req, res) => {
    if(!req.body.kw) return res.end("参数不正确！");
    res.set("content-type", 'text/plain;charset=UTF-8');
    const keyword = req.body.kw;
    const limit = req.body.limit;
    const ret = await api.suggest(keyword, limit?limit:'8').catch(err => console.log(err));
    res.end(ret);
});

router.get('/api/search', (req, res) => {
    res.set("content-type", "text/html;charset=UTF-8");
    res.end(`
   /**<br/>
 * 根据输入的关键词   获取搜索结果<br/>
 * @param kw  关键词<br/>
 * @param limit 结果条数<br/>
 * @param offset  相对于limit的页数<br/>
 * @type POST<br/>
 */
   `);
});
router.post('/api/search', async (req, res) => {
    if(!req.body.kw) return res.end("参数不正确！");
    const keyword = req.body.kw;
    const limit  = req.body.limit;
    const offset = req.body.offset;
    res.set("content-type", 'text/plain;charset=UTF-8');
    const ret = await api.search(keyword, limit?limit:'30', offset?offset:'0').catch(err => console.log(err));
    res.end(ret);

});

router.get('/api/details', (req, res) => {
    res.set("content-type", "text/html;charset=UTF-8");
    res.end(`
   /**<br/>
 * 根据id获取歌曲详细信息<br/>
 * @param idList  [{id:""}]  JSON String<br/>
 * @type POST<br/>
 */
   `);
});
router.post('/api/details', async (req, res) => {
    if(!req.body.idList) return res.end("参数不正确！");
    const idList = req.body.idList;
    res.set("content-type", 'text/plain;charset=UTF-8');
    const ret = await api.details(idList).catch(err => console.log(err));
    res.end(ret);

});


router.get('/api/url', (req, res) => {
    res.set("content-type", "text/html;charset=UTF-8");
    res.end(`
   /**<br/>
 * 根据id获取歌曲url<br/>
 * @param ids 要获取url的id<br/>
 * @param br  比特率  默认128000(128kBit)<br/>
 * @type POST<br/>
 */
   `);
});
router.post('/api/url', async (req, res) => {
    if(!req.body.ids) return res.end("参数不正确！");
    const ids = req.body.ids;
    const br = req.body.br;
    res.set("content-type", 'text/plain;charset=UTF-8');
    const ret = await api.url(ids,br?br:128000).catch(err => console.log(err));
    res.end(ret);
});


router.get('/api/rank', (req, res) => {
    res.set("content-type", "text/html;charset=UTF-8");
    // language=HTML
    res.end(`
   /**<br/>
 * 根据type获取歌曲排行榜<br/>
 * @param type 类型 typeMap的键<br/>
 <pre>
 * const typeMap = {<br/>
 *   'trending': '19723756',  //云音乐飙升榜<br/>
 *   'new': '3779629',        //云音乐新歌榜<br/>
 *   'original': '2884035',   //网易原创歌曲榜<br/>
 *   'hot': '3778678',        //云音乐热歌榜<br/>
 *   'global':{                 //全球媒体榜<br/>
 *       'electronic': '1978921795', //云音乐电音榜<br/>
 *       'hiphop': '991319590',      //云音乐嘻哈榜<br/>
 *       'newpower': '10520166',     //云音乐新电力榜<br/>
 *       'acg': '71385702',          //云音乐ACG音乐榜<br/>
 *       'classical': '71384707',    //云音乐古典音乐榜<br/>
 *       'uk': '180106',             //UK排行榜周榜<br/>
 *       'billboard': '60198',       //美国Billboard周榜<br/>
 *       'beatport': '3812895',      //Beatport全球电子舞曲榜<br/>
 *       'nrj': '27135204',          //法国 NRJ Vos Hits 周榜<br/>
 *       'ktv': '21845217',          //KTV唛榜<br/>
 *       'itunes': '11641012',       //iTunes榜<br/>
 *       'oricon': '60131',          //日本Oricon周榜<br/>
 *       'hitfm': '120001',          //Hit FM Top榜<br/>
 *       'hito': '112463',           //台湾Hito排行榜<br/>
 *       'cntopht': '112504',        //中国TOP排行榜（港台榜）<br/>
 *       'cntopm': '64016',          //中国TOP排行榜（内地榜）<br/>
 *       'rthk': '10169002',         //香港电台中文歌曲龙虎榜<br/>
 *       'cnhiphop': '1899724'       //中国嘻哈榜<br/>
 *   }<br/>
 *};<br/>
 </pre>
 * @type POST<br/>
 */
   `);
});
router.post('/api/rank', async (req, res) => {
    res.set("content-type", 'text/plain;charset=UTF-8');
    const type = req.body.type;

    const result = _.has(api.typeMap, type) || _.has(api.typeMap.global, type) || type === undefined;
    if(!result) return res.end('参数不正确！');
    const ret = await api.rank(type).catch(err => console.log(err));
    res.end(ret);
});

router.get('/api/rankList', async (req, res) => {
    res.set("content-type", 'application/json;charset=UTF-8');
    const rank = JSON.stringify(api.rankList());
    res.end(rank);
});



module.exports = router;