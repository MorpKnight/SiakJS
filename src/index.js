import puppeteer from 'puppeteer';

const userData = {
    username: "pass username here",
    password: "pass password here",
}

const dataMatkul = [
    {
        kode: "ENEE604023_01.03.04.01-2020",
        kelas: 0,
    },
    {
        kode: "ENGE600004_01.01.04.01-2020",
        kelas: 3,
    }
];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
    });

    await page.goto('https://academic.ui.ac.id/main/Authentication/');

    while (await page.$('#u') === null) {
        await page.waitForTimeout(1000);
        console.log('waiting for page to load...');
        await page.screenshot({ path: 'screenshot/image.png' });
        await page.reload();
    }

    await page.type('#u', userData.username);
    await page.type('input[name="p"]', userData.password);
    await page.click('input[value="Login"]');
    await page.waitForNavigation();

    await page.goto("https://academic.ui.ac.id/main/CoursePlan/CoursePlanEdit");

    while (await page.$("h2[id='ti_h']") === null) {
        await page.waitForTimeout(1000);
        console.log('waiting for page to load...');
        await page.screenshot({ path: 'screenshot/image.png' });
        await page.reload();
    }

    await page.evaluate((dataMatkul) => {
        dataMatkul.map((item) => {
            document.getElementsByName(`c[${item.kode}]`)[item.kelas].click();
        });
    }, dataMatkul);

    await page.click('input[value="Simpan IRS"]');
    
    await page.screenshot({ path: 'screenshot/image.png' });
    await browser.close();
    console.log('done');
})();
