import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();

const userData = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
}

let success = false;

const dataMatkul = [
    {
        // IOT 2
        kode: "ENCE605025_02.03.04.01-2024",
        kelas: 1,
    },
    {
        // PROBSTOK 2
        kode: "ENCE605020_02.03.04.01-2024",
        kelas: 1,
    },
    {
        // Kemjar 2
        kode: "ENCE605023_02.03.04.01-2024",
        kelas: 1
    },
    {
        // AKM 2
        kode: "ENCE605021_02.03.04.01-2024",
        kelas: 1
    },
    {
        // SINSIS 2
        kode: "ENCE605026_02.03.04.01-2024",
        kelas: 1
    },
    {
        // JARTEL 2
        kode: "ENCE605022_02.03.04.01-2024",
        kelas: 1
    },
    {
        // RPL 2
        kode: "ENCE605024_02.03.04.01-2024",
        kelas: 1
    }
];

const client = async () => {
    let browser;
    if (process.env.NODE_ENV === 'production') {
        browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });
    } else {
        browser = await puppeteer.launch({ headless: true });
    }

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    await page.goto('https://academic.ui.ac.id/main/Authentication/');

    while (await page.$('#u') === null) {
        await new Promise(resolve => setTimeout(resolve, 2000)).catch(err => console.log(err));
        // console.log(`${new Date().toLocaleTimeString()} | waiting for page to load...`);
        await page.reload();
    }

    await page.type('#u', userData.username);
    await page.type('input[name="p"]', userData.password);
    await page.click('input[value="Login"]');
    while (page.url() === 'https://academic.ui.ac.id/main/Authentication/') {
        await new Promise(resolve => setTimeout(resolve, 2000)).catch(err => console.log(err));
        // console.log(`${new Date().toLocaleTimeString()} | waiting for login...`);
        await page.reload();
    }

    await page.goto("https://academic.ui.ac.id/main/CoursePlan/CoursePlanEdit");

    await page.screenshot({ path: 'screenshot/image.png' });

    while (await page.$('input[type="radio"]') === null) {
        await new Promise(resolve => setTimeout(resolve, 5000)).catch(err => console.log(err));
        // console.log(`${new Date().toLocaleTimeString()} | waiting for page to load...`);
        await page.screenshot({ path: 'screenshot/image.png' });
        await page.reload();
    }

    while (await page.$("h2[id='ti_h']") === null) {
        await new Promise(resolve => setTimeout(resolve, 4000)).catch(err => console.log(err));
        // console.log(`${new Date().toLocaleTimeString()} | waiting for page to load...`);
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
    success = true;

    await page.screenshot({ path: 'screenshot/image.png' });
    await browser.close();
    console.log('done');
}

let counter = 0;
while(!success) {
    client();
    console.log(`${new Date().toLocaleTimeString()} | retrying... ${counter}`);
    
    await new Promise(resolve => setTimeout(resolve, 1000)).catch(err => console.log(err));
    counter++;
}