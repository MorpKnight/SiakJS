import puppeteer from 'puppeteer';

const userData = {
    username: "giovan.christoffel",
    password: "HAHAHA",
}

const dataMatkul = [
    {
        kode: "ENCE604015_02.03.04.01-2020",
        kelas: 1,
    },
    {
        kode: "ENCE604011_02.03.04.01-2020",
        kelas: 1,
    },
    {
        kode: "ENCE604015_02.03.04.01-2020",
        kelas: 0
    },
    {
        kode: "ENNE603008_02.03.04.01-2020",
        kelas: 0
    },
    {
        kode: "ENCE604016_02.03.04.01-2020",
        kelas: 0
    },
    {
        kode: "ENCE604014_02.03.04.01-2020",
        kelas: 0
    },
    {
        kode: "ENCE604012_02.03.04.01-2020",
        kelas: 1
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
        console.log(`${new Date().toLocaleTimeString()} | waiting for page to load...`);
        await page.screenshot({ path: 'screenshot/image.png' });
        await page.reload();
    }

    await page.type('#u', userData.username);
    await page.type('input[name="p"]', userData.password);
    await page.click('input[value="Login"]');
    await page.waitForNavigation();

    await page.goto("https://academic.ui.ac.id/main/CoursePlan/CoursePlanEdit");

    await page.screenshot({ path: 'screenshot/image.png' });

    while(await page.$('input[type="radio"]') === null) {
        await page.waitForTimeout(1000);
        console.log(`${new Date().toLocaleTimeString()} | waiting for page to load...`);
        await page.screenshot({ path: 'screenshot/image.png' });
        await page.reload();
    }

    while (await page.$("h2[id='ti_h']") === null) {
        await page.waitForTimeout(1000);
        console.log(`${new Date().toLocaleTimeString()} | waiting for page to load...`);
        await page.screenshot({ path: 'screenshot/image.png' });
        await page.reload();
    }

    await page.evaluate((dataMatkul) => {
        dataMatkul.map((item) => {
            try {
                document.getElementsByName(`c[${item.kode}]`)[item.kelas].click();
            } catch (err) {
                console.log(err);
            }
        });
    }, dataMatkul);

    await page.click('input[value="Simpan IRS"]');

    await page.screenshot({ path: 'screenshot/image.png' });
    await browser.close();
    console.log('done');
})();
