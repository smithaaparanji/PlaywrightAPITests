import { test, expect } from '@playwright/test';
import { singleResource, listUsers, singleUser, singleUserNotFound, listResources, singleResourceNotFound } from '../fixtures/userAndResource.json';

test.describe('User and Resource Tests', () => {

    test('List Users', async ({ request }) => {
        const getResponse = await request.get(listUsers.requestUrl,
            {
                "headers": { ["x-api-key"]: "reqres-free-v1" }
            });
        expect(getResponse.status()).toBe(200);
        expect(await getResponse.json()).toStrictEqual(listUsers.responseData);
    });


    test('Single User', async ({ request }) => {
        const getResponse = await request.get(singleUser.requestUrl,
            {
            "headers": { ["x-api-key"]: "reqres-free-v1" }
            });
        expect(getResponse.status()).toBe(200);
        expect(await getResponse.json()).toStrictEqual(singleUser.responseData);
    });


    test('Single User Not Found', async ({ request }) => {
        const getResponse = await request.get(singleUserNotFound.requestUrl,
            {
                "headers": { ["x-api-key"]: "reqres-free-v1" }
            });
        expect(getResponse.status()).toBe(404);

    });

    test('List Resources', async ({ request }) => {
        const getResponse = await request.get(listResources.requestUrl);
        expect(getResponse.status()).toBe(200);
        expect(await getResponse.json()).toStrictEqual(listResources.responseData);
    });

    test('Single Resource', async ({ request }) => {
        const getResponse = await request.get(singleResource.requestUrl);
        expect(getResponse.status()).toBe(200);
        expect(await getResponse.json()).toStrictEqual(singleResource.responseData);
    });

    test('Single Resource Not Found', async ({ request }) => {
        const getResponse = await request.get(singleResourceNotFound.requestUrl);
        expect(getResponse.status()).toBe(401);
    });
});
