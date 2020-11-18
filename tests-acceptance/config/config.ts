import { browser, Config } from 'protractor';

export let config: Config = {

    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    SELENIUM_PROMISE_MANAGER: false,



    capabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
            prefs: {
                'browser.download.folderList' : 2,
                'browser.download.dir' : "../test/downloads",
                'services.sync.prefs.sync.browser.download.useDownloadDir' : true,
                'browser.download.useDownloadDir' : true,
                'browser.download.manager.closeWhenDone':true,
                'browser.download.manager.showWhenStarting': false, 
                'browser.helperApps.alwaysAsk.force':false,
                'browser.download.manager.showAlertOnComplete':false,
                'browser.download.manager.useWindow':false,
                'browser.helperApps.neverAsk.saveToDisk': 'application/pdf,application/csv,text/plain,application/vnd.csv,text/csv',
                'pdfjs.disabled': true
            },
        }
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../../features/*.feature'
    ],

    onPrepare: () => {
        browser.manage().window().maximize();
        browser.driver.get(browser.baseUrl);

    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        strict: true,
        format: ['pretty'],
        require: ['../../stepdefinitions/*.ts'],
    }
};