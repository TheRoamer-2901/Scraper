const browserObject = require('./browser')
const {    
    getDetailPageList,
    scrapeDetailPage
} = require('./scraper')

const ROOT_PAGE_URL = "https://tiki.vn/search?q=s%C3%A1ch";


async function runScraper(){
    let browserInstance = browserObject.startBrowser()    
    pageList = await getDetailPageList(browserInstance, ROOT_PAGE_URL)
    for(let pageNum of [0,1,2,3,4,5,6,7,8,9,10]) {
        scrapeDetailPage(browserInstance, pageList[[pageNum]])
    }

}
    
runScraper()