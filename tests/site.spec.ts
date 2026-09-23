import { test, expect } from "@playwright/test";
for (const width of [375, 768, 1440, 1920]) {
  test("layout and navigation at " + width + "px", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page).toHaveTitle("Arcana");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("ARCANA.");
    await expect(page.locator(".concept-label")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    if (width < 768) {
      await page.getByRole("button", { name: "메뉴 열기" }).click();
      await expect(page.getByRole("navigation")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "메뉴 열기" }),
      ).toBeFocused();
      await page.getByRole("button", { name: "메뉴 열기" }).click();
    }
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Projects" })
      .click();
    await expect(
      page.locator("nav a").filter({ hasText: "Projects" }),
    ).toHaveAttribute("aria-current", "location");
    if (width < 768) await expect(page.getByRole("navigation")).toBeHidden();
    for (const id of ["about", "interests", "projects", "rhythm", "connect"]) {
      await page.locator("#" + id).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
    }
    await expect(page.locator(".social-unavailable")).toHaveCount(3);
    await expect(page.locator('a[href="#"], a[href=""]')).toHaveCount(0);
    await page.locator("#home").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: "artifacts/full-" + width + ".png",
      fullPage: true,
    });
    await page.getByRole("link", { name: "BACK TO TOP" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
    await page.screenshot({ path: "artifacts/hero-" + width + ".png" });
    expect(errors).toEqual([]);
  });
}
test("keyboard entry and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "본문 바로가기" })).toBeFocused();
  expect(
    await page
      .locator(".ring-outer")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("animated hero and hover remain within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".hero-content")).toHaveCSS("opacity", "1");
  await page.mouse.move(1380, 600);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.locator(".rhythm-row").first().scrollIntoViewIfNeeded();
  await page.locator(".rhythm-row").first().hover();
  await expect(page.locator(".rhythm-row").first()).toHaveCSS(
    "color",
    "rgb(213, 246, 138)",
  );
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(".hero-content")).toHaveCSS("opacity", "1");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
