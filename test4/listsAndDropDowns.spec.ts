import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Owners").click();
  await page.getByText("Search").click();
  await expect(page.locator("h2")).toHaveText("Owners");
});

test.describe("Lists and Drop Downs", async () => {
  test("Validate selected pet types from the list", async ({ page }) => {
    await page.getByText("George Franklin").click();

    await expect(page.locator(".ownerFullName")).toHaveText("George Franklin");

    await page.getByRole("button", { name: "Edit Pet" }).nth(0).click();

    await expect(page.locator("h2")).toHaveText("Pet");

    await expect(page.locator("#owner_name")).toHaveValue("George Franklin");

    await expect(page.locator("#type1")).toHaveValue("cat");

    const dropDownMenu = page.locator("#type");
    await dropDownMenu.click();

    const types = {
      cat: "cat",
      dog: "dog",
      lizard: "lizard",
      snake: "snake",
      animal: "animal",
      hamster: "hamster",
    };

    for (const type in types) {
      await dropDownMenu.selectOption(type);
      await expect(page.locator("#type1")).toHaveValue(types[type]);
    }
  });

  test("Validate the pet type update", async ({ page }) => {
    await page.getByText("Eduardo Rodriquez").click();

    await page.getByRole("button", { name: "Edit Pet" }).nth(1).click();

    await expect(page.locator("#name")).toHaveValue("Rosy");

    await expect(page.locator("#type1")).toHaveValue("dog");

    const dropDownMenu = page.locator("#type");
    await dropDownMenu.click();
    await dropDownMenu.selectOption("lizard");

    await expect(page.locator("#type1")).toHaveValue("lizard");
    await expect(page.locator("#type")).toHaveValue("lizard");

    await page.getByRole("button", { name: "Update Pet" }).click();

    await expect(
      page.locator(
        "app-pet-list:nth-of-type(2) > .table.table-striped dl > dd:nth-of-type(3)"
      )
    ).toHaveText("lizard");

    await page.getByRole("button", { name: "Edit Pet" }).nth(1).click();

    await expect(page.locator("#type1")).toHaveValue("lizard");

    await dropDownMenu.click();
    await dropDownMenu.selectOption("dog");

    await expect(page.locator("#type1")).toHaveValue("dog");
    await expect(page.locator("#type")).toHaveValue("dog");

    await page.getByRole("button", { name: "Update Pet" }).click();

    await expect(
      page.locator(
        "app-pet-list:nth-of-type(2) > .table.table-striped dl > dd:nth-of-type(3)"
      )
    ).toHaveText("dog");
  });
});