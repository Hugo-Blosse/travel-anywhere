package com.sabre.profilesui.qa;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;
import org.testng.Assert;
import org.testng.annotations.Test;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class BasicTests {
    static String atkToken = System.getProperty("atkToken");
    @Test
    public void test1() {
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
                    .setHeadless(false));
            BrowserContext context = browser.newContext();
            Page page = context.newPage();
            page.navigate("http://localhost:3000/");
            page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Login")).click();
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("ATK Token")).click();
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("ATK Token")).fill(atkToken);
            page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Login")).click();
            page.locator("div").filter(new Locator.FilterOptions().setHasText("+− Leaflet | © OpenStreetMap")).nth(3).click();
            page.locator(".btn").first().click();
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("First name")).click();
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("First name")).fill("First Name");
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Last name")).click();
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Last name")).fill("LastName");
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Birth Date")).fill("2008-01-01");
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Email")).click();
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Email")).fill("ala@ma.kota");
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Start Date")).fill("2028-01-01");
            page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("End Date")).fill("2028-05-05");
            page.getByRole(AriaRole.SPINBUTTON, new Page.GetByRoleOptions().setName("Number Of Guests")).click();
            page.getByRole(AriaRole.SPINBUTTON, new Page.GetByRoleOptions().setName("Number Of Guests")).fill("5");
            String hotelName = page.locator(".hotelName").textContent();
            page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Submit")).click();
            assertThat(page.locator(".hotelName")).hasText(hotelName);
        }
    }
}