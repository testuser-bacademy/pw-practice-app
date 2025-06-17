import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator('[title="pettypes"]').click();
  await page.waitForTimeout(3000); // wait for API response
});

test.describe('Interacting with Input Fields', async () =>{
  test('Update pet type', async ({ page }) => {
   
    await expect(page.locator('h2')).toHaveText('Pet Types');
    
    const petType = page.locator('[id="0"]')
    const editPetType = page.locator('input[id="name"]');
    const editBtn = page.locator('button:has-text("Edit")');
    const updateBtn = page.locator('button:has-text("Update")');

    await editBtn.first().click();

    await expect(page.locator('h2')).toHaveText("Edit Pet Type");

    await editPetType.click();
    await editPetType.clear();
    await editPetType.fill('rabbit');
    await updateBtn.click();
    
    await expect(petType).toHaveValue('rabbit');
   
    await editBtn.first().click();
    
    await editPetType.click();
    await editPetType.clear();
    await editPetType.fill('cat');
    await updateBtn.click();
    
    await expect(petType).toHaveValue('cat');
  });

  test('Cancel pet type update', async ({ page }) => {

    await expect(page.locator('h2')).toHaveText('Pet Types');

    const petTypeDog = page.locator('[id="1"]')
    const editPetTypeDog = page.locator('input[id="name"]');
    const editBtnDog = page.locator('button:has-text("Edit")').nth(1);
    const cancelBtnDog = page.locator('button:has-text("Cancel")');

    await editBtnDog.first().click();

    await editPetTypeDog.click();
    await editPetTypeDog.clear();
    await editPetTypeDog.fill('moose');

    await expect(editPetTypeDog).toHaveValue('moose');

    await cancelBtnDog.click();

    await expect(petTypeDog).toHaveValue('dog');

  });

  test('Pet type name is required validation', async({ page }) => {

    await expect(page.locator('h2')).toHaveText('Pet Types');

    const editBtnLizard = page.locator('button:has-text("Edit")').nth(2);
    const editPetTypeLizard = page.locator('input[id="name"]');
    const updateBtnLizard = page.locator('button:has-text("Update")');
    const cancelBtnLizard = page.locator('button:has-text("Cancel")');

    await editBtnLizard.click();

    await editPetTypeLizard.click();
    await editPetTypeLizard.clear();

    await expect(page.locator('[class="help-block"]')).toHaveText('Name is required');

    await updateBtnLizard.click();

    await expect(page.locator('h2')).toHaveText("Edit Pet Type");

    await cancelBtnLizard.click();

    await expect(page.locator('h2')).toHaveText('Pet Types');

  });
});