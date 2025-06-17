import { test, expect } from '@playwright/test';

//JB PR

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Test Case 1: Update pet type', async ({page}) => {
  
  await page.getByTitle('pettypes').click()  
  await expect(page.getByRole('heading',{name:'Pet Types'})).toBeVisible() 
  await (page.getByRole('button',{name:'Edit'}).first()).click()
  await expect(page.getByRole('heading', {name: 'Edit Pet Type'})).toBeVisible()
  const petName = await page.locator('#name')
  await expect(petName).toHaveValue('cat')  
  await petName.click() 
  await petName.clear()
  await page.locator('#name').fill('rabbit')
  await page.getByRole('button',{name:"Update"}).click() 
  await expect(page.getByRole('cell',{name:'rabbit'})).toBeVisible()
  await (page.getByRole('button',{name:'Edit'}).first()).click()
  await petName.click()
  await petName.clear()
  await petName.fill('cat')
  await page.getByRole('button',{name:"Update"}).click()
  await expect(page.getByRole('cell',{name:'cat'})).toBeVisible()
});

test('Test Case 2: Cancel pet type update', async ({page}) => {
  await page.getByTitle('pettypes').click()
  await expect(page.getByRole('heading',{name:'Pet Types'})).toBeVisible()
  const secondeditButton = page.getByRole('button',{name:'Edit'}).nth(1)
  await secondeditButton.click()
  const petName = await page.locator('#name') 
  await petName.click()
  await petName.clear()
  await petName.fill('moose')  
  await expect (petName).toHaveValue('moose')
  await page.getByRole('button',{name:"Cancel"}).click()
  await expect(page.getByRole('cell',{name:'dog'})).toBeVisible()
});

  test('Test Case 3: Pet type name is required validation', async ({page}) => {
    await page.getByTitle('pettypes').click()
    await expect(page.getByRole('heading',{name:'Pet Types'})).toBeVisible()
    const thirdeditButton = page.getByRole('button',{name:'Edit'}).nth(2)
    await thirdeditButton.click()
    const petName = await page.locator('#name') 
    await petName.click()
    await petName.clear()
    await petName.click()
    await expect(page.getByText('Name is required')).toBeVisible()
    await page.getByRole('button',{name:"Update"}).click()
    await expect(page.getByRole('heading', {name: 'Edit Pet Type'})).toBeVisible()
    await page.getByRole('button',{name:"Cancel"}).click()
    await expect(page.getByRole('heading',{name:'Pet Types'})).toBeVisible()
  });