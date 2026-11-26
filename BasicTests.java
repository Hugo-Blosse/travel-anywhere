package com.sabre.profilesui.qa;

import com.sabre.profilesui.qa.components.PlayWrightRunner;
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class BasicTests extends PlayWrightRunner {
    static String atkToken = System.getProperty("atkToken");


    @BeforeMethod
    public void openReservationForm() {
        mainPage.open();
        page.locator("div").filter(new Locator.FilterOptions().setHasText("+− Leaflet | © OpenStreetMap")).nth(3).click();
        page.locator(".btn").first().click();
    }

//    @Test
    public void test1() {
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

    @Test
    public void shouldShowValidationFeedbackOnFutureBirthDateInBirthDateField() {
        page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Birth Date")).fill("2027-01-01");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Submit")).click();
        assertThat(page.locator(".birthDateGroup").locator(".invalid-feedback")).hasText("Birth date cannot be in the future");
    }

    @Test
    public void shouldShowValidationFeedbackOnNegativeGuestNumberInNumberOfGuestsField() {
        page.getByRole(AriaRole.SPINBUTTON, new Page.GetByRoleOptions().setName("Number Of Guests")).fill("-5");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Submit")).click();
        assertThat(page.locator(".numberOfGuestsGroup").locator(".invalid-feedback")).hasText("At least one guest is required");
    }
}