package com.sabre.profilesui.qa.components.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.sabre.profilesui.qa.components.LocationList;

public class MainPage {
    private final Page page;
    LocationList locationList;

    public MainPage(Page page) {
        this.page = page;
        locationList = new LocationList(page);
    }

    public MainPage open() {
        page.navigate("http://localhost:3000/");
        return this;
    }

    public MainPage clickOnMap() {
        page.locator("div").filter(new Locator.FilterOptions().setHasText("+− Leaflet | © OpenStreetMap")).nth(3).click();
        return this;
    }

    public LocationList getLocationList() { return locationList; }
}
