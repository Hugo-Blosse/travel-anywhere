package com.sabre.profilesui.qa.components;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;
import com.sabre.profilesui.qa.components.pages.MainPage;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;

public abstract class PlayWrightRunner {
    static protected String atkToken = System.getProperty("atkToken");
    protected Playwright playwright;
    protected Browser browser;
    protected Page page;
    protected MainPage mainPage;


    @BeforeClass(alwaysRun = true)
    @Parameters({"browserName"})
    public void initializePlayWright(String browserName) {
        playwright = Playwright.create();

        BrowserType browserType = switch(browserName) {
            case "chromium" -> playwright.chromium();
            case "webkit" -> playwright.webkit();
            case "firefox" -> playwright.firefox();
            default -> throw new RuntimeException("Invalid browser name");
        };

        browser = browserType.launch(new BrowserType.LaunchOptions()
                .setHeadless(false));
        page = browser.newContext().newPage();
        mainPage = new MainPage(page);
    }

    @BeforeClass
    public void login() {
        mainPage.open();
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Login")).click();
        page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("ATK Token")).click();
        page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("ATK Token")).fill(atkToken);
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Login")).click();
    }

    @AfterClass(alwaysRun = true)
    public void tearDown() {
        page.close();
        browser.close();
        playwright.close();
    }
}
