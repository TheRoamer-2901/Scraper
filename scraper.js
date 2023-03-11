//const { extractData } = require('./helper/extractor')

async function getDetailPageList(browser, url) {
    let browserInstance = await browser;
    try {
        let page = await browserInstance.newPage();
        await page.goto(url)
        await page.waitForSelector("div.inner")
        let pageDetailList  = 
            await page.$$eval('a.product-item', products => {
                return products.map(prod => prod.href)
            })
        console.log("page list: ", pageDetailList.length);
        await page.close()
        return pageDetailList;
    } catch(err) {
        console.log(err);
    }
        
}

async function scrapeDetailPage(browser, url) {
    let browserInstance = await browser;
    try{
        let detailPage = await browserInstance.newPage();
        await detailPage.goto(url)   
        await detailPage.waitForSelector('main')
        let dataObject = {};
        dataObject['title'] = await detailPage.$eval("h1.title", title => title.textContent)
        dataObject['author'] = await detailPage.$eval(".brand-and-author", author => author.textContent)
        dataObject['price'] = await detailPage.$eval(".product-price__list-price", price => price.textContent)
        dataObject['discount'] = await detailPage.$eval(".product-price__discount-rate", discount => discount.textContent)
        dataObject['image'] = await detailPage.$eval("picture img", img => img.src)
        dataObject['seller'] = await detailPage.$eval(".seller-name span", seller => seller.textContent)
        /**/
       console.log(dataObject);
        await detailPage.close()
    } catch(err){
        console.log(err);
    }
}

module.exports = {
    getDetailPageList: getDetailPageList,
    scrapeDetailPage: scrapeDetailPage,
};

