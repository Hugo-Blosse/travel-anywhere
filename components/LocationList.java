package com.sabre.profilesui.qa.components;

import com.microsoft.playwright.Page;

public class LocationList {
    private final Page page;
//    location

    public LocationList(Page page) {
        this.page = page;
//        this = page.locator(".searchResultList");
    }
}
