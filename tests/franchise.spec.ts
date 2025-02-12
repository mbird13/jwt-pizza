import { test, expect } from 'playwright-test-coverage';

test('franchise page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
});

test('franchisee login', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'f@jwt.com', password: 'franchisee' };
        const loginRes = { user: { id: 3, name: 'pizza franchisee', email: 'f@jwt.com', roles: [{
            "role": "diner"
        },
        {
            "objectId": 1,
            "role": "franchisee"
        }] }, token: 'abcdef' };
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

    await page.route('*/**/api/franchise/3', async (route) => {
      const franchiseRes = [
        {
          "id": 1,
          "name": "pizzaPocket",
          "admins": [
            {
              "id": 3,
              "name": "pizza franchisee",
              "email": "f@jwt.com"
            }
          ],
          "stores": [
            {
              "id": 1,
              "name": "SLC",
              "totalRevenue": 2.8518
            }
          ]
        }
      ];
      expect(route.request().headers()['authorization']).toBe('Bearer abcdef');
      await route.fulfill({ json: franchiseRes });
      });

    await page.goto('http://localhost:5173');
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('link', { name: 'login', exact: true }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'franchise-dashboard' }).isVisible();
    await expect(page.getByRole('main')).toContainText('Create store');    
  });

  test('create store', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'f@jwt.com', password: 'franchisee' };
        const loginRes = { user: { id: 3, name: 'pizza franchisee', email: 'f@jwt.com', roles: [{
            "role": "diner"
        },
        {
            "objectId": 1,
            "role": "franchisee"
        }] }, token: 'abcdef' };
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

    await page.route('*/**/api/franchise/3', async (route) => {
      const franchiseRes = [
        {
            "id": 1,
            "name": "pizzaPocket",
            "admins": [
                {
                    "id": 3,
                    "name": "pizza franchisee",
                    "email": "f@jwt.com"
                }
            ],
            "stores": [
                {
                    "id": 1,
                    "name": "SLC",
                    "totalRevenue": 0.8544
                },
                {
                    "id": 6,
                    "name": "testing",
                    "totalRevenue": 0.016
                }
            ]
        }
    ];
      expect(route.request().headers()['authorization']).toBe('Bearer abcdef');
      await route.fulfill({ json: franchiseRes });
      });

    await page.route('*/**/api/franchise/1/store', async (route) => {
      const storeReq = { name: 'testing' };
      const storeRes = {id:16,franchiseId:1,name:"testing"};
      expect(route.request().postDataJSON()).toMatchObject(storeReq);
      await route.fulfill({ json: storeRes });
    });

    await page.goto('http://localhost:5173');
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('link', { name: 'login', exact: true }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#navbar-dark')).toContainText('Logout');
    await page.getByRole('button', { name: 'Create store' }).click();
    await page.getByRole('textbox', { name: 'store name' }).click();
    await page.getByRole('textbox', { name: 'store name' }).fill('testing');
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('link', { name: 'franchise-dashboard' }).isVisible();
    await expect(page.getByRole('cell', { name: 'testing' })).toBeVisible();
  });

  test('delete store', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'f@jwt.com', password: 'franchisee' };
        const loginRes = { user: { id: 3, name: 'pizza franchisee', email: 'f@jwt.com', roles: [{
            "role": "diner"
        },
        {
            "objectId": 1,
            "role": "franchisee"
        }] }, token: 'abcdef' };
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

    await page.route('*/**/api/franchise/3', async (route) => {
      const franchiseRes = [
        {
            "id": 1,
            "name": "pizzaPocket",
            "admins": [
                {
                    "id": 3,
                    "name": "pizza franchisee",
                    "email": "f@jwt.com"
                }
            ],
            "stores": [
                {
                    "id": 1,
                    "name": "SLC",
                    "totalRevenue": 0.8544
                },
                {
                    "id": 6,
                    "name": "testing",
                    "totalRevenue": 0.016
                }
            ]
        }
    ];
      expect(route.request().headers()['authorization']).toBe('Bearer abcdef');
      await route.fulfill({ json: franchiseRes });
      });

    await page.route('*/**/api/franchise/1/store/6', async (route) => {
      const res = { message: 'store deleted' };
      await expect(route.request().method()).toBe('DELETE');
      await route.fulfill({ json: res });
    });

    await page.goto('http://localhost:5173');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('row', { name: 'testing 0.016 ₿ Close' }).getByRole('button').click();
    await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('link', { name: 'franchise-dashboard' }).isVisible();
    await page.getByRole('heading', {name: 'pizzaPocket'}).isVisible();
    await expect(page.getByRole('heading')).toContainText('pizzaPocket');

});