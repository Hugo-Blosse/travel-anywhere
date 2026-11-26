package com.sabre.profilesui.qa;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;
import com.sabre.profilesui.qa.components.PlayWrightRunner;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.regex.Pattern;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class NonHotelTests extends PlayWrightRunner {


    @BeforeMethod
    public void clickMap() {
        mainPage.open();
        mainPage.clickOnMap();
        page.locator("input[name=\"hotel\"]").check();
        page.locator("input[name=\"air\"]").check();
        page.locator("input[name=\"rail\"]").check();
        page.locator("input[name=\"car\"]").check();
        page.locator(".location").first().waitFor();
    }

    @Test
    public void shouldOnlyCarsAppearWithOnlyCarFilterEnabled() {
        page.locator("input[name=\"hotel\"]").uncheck();
        page.locator("input[name=\"air\"]").uncheck();
        page.locator("input[name=\"rail\"]").uncheck();
        page.locator(".location").all().forEach(locator -> {
            assertThat(locator.locator(".category")).hasText("Category: CAR");
            assertThat(locator.locator(".btn")).isHidden();
        });
    }

    @Test
    public void shouldNoResultsAppearWithAllFiltersDisabled() {
        page.locator("input[name=\"hotel\"]").uncheck();
        page.locator("input[name=\"air\"]").uncheck();
        page.locator("input[name=\"rail\"]").uncheck();
        page.locator("input[name=\"car\"]").uncheck();
        assertThat(page.locator(".location")).hasCount(0);
    }

    @Test
    public void shouldNoCarsAppearInResultsWithCarFilterDisabled() {
        page.locator("input[name=\"car\"]").uncheck();
        Pattern pattern = Pattern.compile("Category: HOTEL|Category: AIR|Category: RAIL");
        page.locator(".location").all().forEach(locator -> {
                assertThat(locator.locator(".category")).hasText(pattern);
        });
    }
}
